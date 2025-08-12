import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieList = ({ movies, isLoading }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {isLoading
        ? Array(8)
            .fill(0)
            .map((_, idx) => <MovieCardSkeleton key={idx} />)
        : movies.map((movie) => (
            <MovieCard key={movie.movie_id} movie={movie} />
          ))}
    </div>
  );
};

export default MovieList;
