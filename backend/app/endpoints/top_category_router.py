from fastapi import APIRouter
from typing import List, Dict
import os
from dotenv import load_dotenv
import pickle
from app.models.movies_model import Movie  # type: ignore
import asyncio
import aiohttp
from pydantic import BaseModel, Field

# Load environment variables from the .env file
load_dotenv()

# Initialize the APIRouter for genres
genres_router = APIRouter()

# Load the top 100 movies dataframe from the pickle file
with open('./app/ml/ml_model/top_genres.pkl', 'rb') as f:
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
    return (v / (v + m) * R) + (m / (v + m) * C)

# Apply the weighted_rating function to the filtered dataframe
q_movies['weighted_rating'] = q_movies.apply(weighted_rating, axis=1)

# Sort movies based on weighted rating
q_movies = q_movies.sort_values('weighted_rating', ascending=False)

# Get API key from the .env file
TMDB_API_KEY = os.getenv("TMDB_API_KEY")

if not TMDB_API_KEY:
    raise ValueError("TMDB_API_KEY is not set in the .env file")


# Pydantic model for Movie
class MovieBase(BaseModel):
    movie_id: int
    title: str
    vote_count: int
    vote_average: float
    popularity: float
    weighted_rating: float
    genres: List[str]  # Ensure genres is a list of strings
    poster_url: str | None = None

# Async function to fetch movie poster URL from TMDB API
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

# Route to fetch top 5 movies per genre
@genres_router.get("/movies/top-5-per-genre", response_model=Dict[str, List[MovieBase]])
async def get_top_5_movies_per_genre():
    # Explode the genres column to have one genre per row
    top_100_movies_exploded_genres = q_movies.explode('genres')

    # Get unique genres and filter out NaN values
    unique_genres = top_100_movies_exploded_genres['genres'].dropna().unique()

    genre_top_movies = {}

    # Iterate over each genre and get the top 5 movies based on popularity
    for genre in unique_genres:
        # Filter movies by genre
        genre_movies = top_100_movies_exploded_genres[top_100_movies_exploded_genres['genres'] == genre]

        # Get top 5 movies sorted by popularity
        top_5_genre_movies = genre_movies.sort_values(by='popularity', ascending=False).head(5)[[
            "movie_id", "title", "vote_count", "vote_average", "popularity", "weighted_rating", "genres"
        ]].to_dict(orient='records')

        # Ensure 'genres' is always a list, even if it's a single genre
        for movie in top_5_genre_movies:
            if isinstance(movie['genres'], str):
                movie['genres'] = [movie['genres']]  # Convert string to list if necessary

        # Fetch poster URLs asynchronously
        async with aiohttp.ClientSession() as session:
            tasks = [fetch_poster_async(session, movie["movie_id"]) for movie in top_5_genre_movies]
            posters = await asyncio.gather(*tasks)

            # Add poster URLs to each movie
            for movie, poster_url in zip(top_5_genre_movies, posters):
                movie["poster_url"] = poster_url

        # Add the genre's top 5 movies to the dictionary
        genre_top_movies[genre] = [MovieBase(**movie) for movie in top_5_genre_movies]

    return genre_top_movies
