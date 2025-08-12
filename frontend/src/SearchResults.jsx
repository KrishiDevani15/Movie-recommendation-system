import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import MovieCardSkeleton from "../components/MovieCardSkeleton";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery();
  const q = query.get("q") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hoveredId, setHoveredId] = useState(null); // NEW

  useEffect(() => {
    if (!q) return;

    setLoading(true);
    fetch(`http://localhost:8000/movies/search?q=${encodeURIComponent(q)}`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [q]);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => <MovieCardSkeleton key={i} />)
        : movies.length === 0
        ? "No movies found"
        : movies.map((movie) => (
            <div
              key={movie.movie_id}
              onMouseEnter={() => setHoveredId(movie.movie_id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <MovieCard
                movie={movie}
                isHovered={hoveredId === movie.movie_id}
                isDimmed={hoveredId && hoveredId !== movie.movie_id}
              />
            </div>
          ))}
    </div>
  );
};

export default SearchResults;
