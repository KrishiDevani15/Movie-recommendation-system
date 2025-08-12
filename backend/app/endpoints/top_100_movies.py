from fastapi import APIRouter
from typing import List
import os
from dotenv import load_dotenv
import pickle
from app.models.movies_model import Movie  # type:ignore
import asyncio
import aiohttp

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
top_100_movies_list = q_movies[["movie_id", 'title', 'vote_count', 'vote_average', 'popularity', 'weighted_rating']].head(101).to_dict(orient='records')

# Get API key from the .env file
TMDB_API_KEY = os.getenv("TMDB_API_KEY")

if not TMDB_API_KEY:
    raise ValueError("TMDB_API_KEY is not set in the .env file")

async def fetch_poster_async(session: aiohttp.ClientSession, movie_id: int):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}"
    async with session.get(url) as resp:
        if resp.status != 200:
            return None
        data = await resp.json()
        poster_path = data.get("poster_path")
        if poster_path:
            return f"https://image.tmdb.org/t/p/w500{poster_path}"
        return None

@top_100.get("/movies/top-100-movies", response_model=List[Movie])
async def get_top_100_movies():
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_poster_async(session, movie["movie_id"]) for movie in top_100_movies_list]
        posters = await asyncio.gather(*tasks)
        for movie, poster_url in zip(top_100_movies_list, posters):
            movie["poster_url"] = poster_url
    return top_100_movies_list
