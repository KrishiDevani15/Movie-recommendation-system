const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 border-4 border-transparent hover:border-indigo-500">
      <img
        src={movie.poster_url}
        alt={movie.title}
        className="w-full h-[570px] object-cover"
        loading="lazy"
      />
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold">{movie.title}</h3>
        <p className="text-yellow-400 mt-2">⭐ {movie.vote_average}</p>
      </div>
    </div>
  );
};
export default MovieCard;
