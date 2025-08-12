import { useState } from "react";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieList = ({ movies, isLoading }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {isLoading
        ? Array(8)
            .fill(0)
            .map((_, idx) => <MovieCardSkeleton key={idx} />)
        : movies.map((movie) => (
            <div
              key={movie.movie_id}
              onMouseEnter={() => setHoveredId(movie.movie_id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <MovieCard
                movie={movie}
                isDimmed={hoveredId !== null && hoveredId !== movie.movie_id}
                isHovered={hoveredId === movie.movie_id}
              />
            </div>
          ))}
    </div>
  );
};

export default MovieList;
