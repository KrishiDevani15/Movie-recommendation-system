import os
import asyncio
import aiohttp
from fastapi import APIRouter, Query, HTTPException
from elasticsearch import Elasticsearch #type:ignore
from typing import List
from dotenv import load_dotenv

load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")
ELASTICSEARCH_API = os.getenv("ELASTICSEARCH_API")
if not TMDB_API_KEY:
    raise ValueError("TMDB_API_KEY is not set in the .env file")

es = Elasticsearch(hosts=[ELASTICSEARCH_API])
index_name = "movies"
search_router = APIRouter()


async def fetch_poster_async(session: aiohttp.ClientSession, movie_id: str) -> str:
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}"
    try:
        async with session.get(url) as resp:
            if resp.status != 200:
                return "https://via.placeholder.com/300x450"
            data = await resp.json()
            poster_path = data.get("poster_path")
            if poster_path:
                return f"https://image.tmdb.org/t/p/w500{poster_path}"
    except Exception:
        pass
    return "https://via.placeholder.com/300x450"


@search_router.get("/movies/autocomplete", response_model=List[dict])
async def autocomplete_movies(
    q: str = Query(..., min_length=2),
    size: int = Query(10, ge=1, le=20)
):
    # Elasticsearch query for autocomplete using match_phrase_prefix
    body = {
        "size": size,
        "_source": ["movie_id", "title"],  # minimal fields for autocomplete
        "query": {
            "match_phrase_prefix": {
                "title": {
                    "query": q
                }
            }
        }
    }

    try:
        result = es.search(index=index_name, body=body)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Elasticsearch query failed: {e}")

    movies = [
        {
            "movie_id": hit["_source"]["movie_id"],
            "title": hit["_source"]["title"]
        }
        for hit in result["hits"]["hits"]
    ]

    # Fetch posters asynchronously
    async with aiohttp.ClientSession() as session:
        poster_tasks = [fetch_poster_async(session, movie["movie_id"]) for movie in movies]
        posters = await asyncio.gather(*poster_tasks)

    for movie, poster_url in zip(movies, posters):
        movie["poster_url"] = poster_url

    return movies


@search_router.get("/movies/search", response_model=List[dict])
async def search_movies(
    q: str = Query(..., min_length=2),
    size: int = Query(20, ge=1, le=100)
):
    # Elasticsearch full search with multi_match on title field (boosted)
    body = {
        "size": size,
        "query": {
            "multi_match": {
                "query": q,
                "fields": ["title^3"]
            }
        }
    }

    try:
        result = es.search(index=index_name, body=body)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Elasticsearch query failed: {e}")

    movies = [
        {
            "movie_id": hit["_source"]["movie_id"],
            "title": hit["_source"]["title"],
            "vote_average": hit["_source"].get("vote_average", 0),
            "vote_count": hit["_source"].get("vote_count", 0),
            "popularity": hit["_source"].get("popularity", 0),
        }
        for hit in result["hits"]["hits"]
    ]

    # Fetch posters asynchronously
    async with aiohttp.ClientSession() as session:
        poster_tasks = [fetch_poster_async(session, movie["movie_id"]) for movie in movies]
        posters = await asyncio.gather(*poster_tasks)

    for movie, poster_url in zip(movies, posters):
        movie["poster_url"] = poster_url

    return movies
