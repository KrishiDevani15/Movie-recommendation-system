import React from "react";

const MovieCard = ({ movie, isDimmed, isHovered }) => {
  return (
    <div
      className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 border-4 border-transparent hover:border-indigo-500 ${
        isDimmed ? "opacity-40" : "opacity-100"
      }`}
    >
      <img
        src={movie.poster_url}
        alt={movie.title}
        className="w-full h-[570px] object-cover"
        loading="lazy"
      />
      <div className="p-4 text-white">
        {/* Movie title with underline effect */}
        <h3 className={`movie-title ${isHovered ? "hovered" : ""}`}>
          {movie.title}
        </h3>
        <p>
          Avg Vote
          <span className="text-yellow-400 mt-8"> ⭐ {movie.vote_average}</span>
        </p>
        <p>
          Votes Count
          <span className="text-yellow-400 mt-2"> ❤️ {movie.vote_count}</span>
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
