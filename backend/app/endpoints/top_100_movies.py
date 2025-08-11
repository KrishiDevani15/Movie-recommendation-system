from fastapi import APIRouter
from typing import List
import os
from dotenv import load_dotenv
import pickle
import requests  # type:ignore
from app.models.movies_model import Movie  # type:ignore

# Load environment variables from the .env file
load_dotenv()

# Initialize the APIRouter for top 100 movies
top_100 = APIRouter()

# Load the top 100 movies dataframe from the pickle file
with open('./app/ml/ml_model/top_100_movies.pkl', 'rb') as f:
    top_movies_df = pickle.load(f)

# Calculate C (mean vote across the whole dataset)
C = top_movies_df['vote_average'].mean()
print(f"Mean vote across all movies (C): {C}")

# Calculate m (minimum number of votes required - using 90th percentile)
m = top_movies_df['vote_count'].quantile(0.9)
print(f"Minimum votes required to be in the top (m - 90th percentile): {m}")

# Filter out movies with less than m votes
q_movies = top_movies_df.copy().loc[top_movies_df['vote_count'] >= m]
print(f"\nNumber of movies with at least {m} votes: {q_movies.shape[0]}")

# Function to calculate the weighted rating (WR)
def weighted_rating(x, m=m, C=C):
    v = x['vote_count']
    R = x['vote_average']
    # Calculation based on the IMDB formula
    return (v/(v+m) * R) + (m/(v+m) * C)

# Apply the weighted_rating function to the filtered dataframe
q_movies['weighted_rating'] = q_movies.apply(weighted_rating, axis=1)

# Sort movies based on weighted rating
q_movies = q_movies.sort_values('weighted_rating', ascending=False)

# Display the top 100 movies based on the weighted rating
top_100_movies_list = q_movies[["movie_id", 'title', 'vote_count', 'vote_average', 'popularity', 'weighted_rating']].head(50).to_dict(orient='records')

# Get API key from the .env file
TMDB_API_KEY = os.getenv("TMDB_API_KEY")

if not TMDB_API_KEY:
    raise ValueError("TMDB_API_KEY is not set in the .env file")

def fetch_poster(movie_id: int):
    # URL for fetching the movie details
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}"
    
    # Make the API request
    response = requests.get(url)
    if response.status_code != 200:
        return None  # Return None if the movie is not found or API fails
    
    data = response.json()
    
    # Check if 'poster_path' exists and is valid
    if 'poster_path' in data and data['poster_path']:
        return f"https://image.tmdb.org/t/p/w500{data['poster_path']}"
    return None

@top_100.get("/movies/top-100-movies", response_model=List[Movie])
def get_top_100_movies():
    # Add poster URLs to the top 100 movies list
    for movie in top_100_movies_list:
        poster_url = fetch_poster(movie['movie_id'])
        movie['poster_url'] = poster_url
    return top_100_movies_list
