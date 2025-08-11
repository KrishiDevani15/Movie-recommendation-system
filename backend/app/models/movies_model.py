from pydantic import BaseModel
from typing import Optional
class Movie(BaseModel):
    movie_id: int
    title: str
    vote_count: int
    vote_average: float
    popularity: float
    weighted_rating: Optional[float] = None  # Add weighted rating
    poster_url: Optional[str] = None         # Add poster URL
