import React, { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import MovieCardSkeleton from "../components/MovieCardSkeleton";

const Home = () => {
  const [topMovies, setTopMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/movies/top-5-per-genre"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTopMovies(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTopMovies();
  }, []);

  const handleCategoryClick = (genre) => {
    setSelectedCategory(genre);
  };

  const getFilteredMovies = (movies) => {
    if (selectedCategory === "All") {
      return movies;
    }
    return movies.filter((movie) => movie.genres.includes(selectedCategory));
  };

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 w-full">
      {/* --- Static Header --- */}
      <header className="text-center mt-10">
        <h1 className="text-4xl font-bold text-blue-600">
          Welcome to Movie Explorer
        </h1>
        <p className="mt-2 text-gray-400">
          Use the navigation bar to explore top movies or search.
        </p>
      </header>

      {/* --- Category Dropdown --- */}
      <div className="flex justify-end my-6">
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryClick(e.target.value)}
          className="bg-gray-800 text-white p-2 rounded shadow-md"
        >
          <option value="All">All Categories</option>
          {Object.keys(topMovies).map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* --- Movies Section --- */}
      {loading ? (
        // --- Skeleton Loading ---
        <div className="space-y-8">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="mb-8">
              <div className="h-8 w-48 bg-gray-500 animate-pulse mb-4"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(5)].map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border-4 border-transparent animate-pulse"
                  >
                    <div className="w-full h-[570px] bg-gray-700" />
                    <div className="p-4">
                      <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // --- Display Movies ---
        <div className="mt-6">
          {Object.keys(topMovies).map((genre) => {
            if (selectedCategory === "All" || selectedCategory === genre) {
              return (
                <div key={genre} className="mb-8">
                  {/* --- Genre Heading with Separator --- */}
                  <div className="flex items-center mb-4">
                    <h2 className="text-4xl font-extrabold text-blue-400 tracking-wide mt-8 mb-4 border-b-4 border-blue-400 inline-block pb-1">
                      {genre}
                    </h2>
                  </div>

                  <MovieList
                    movies={getFilteredMovies(topMovies[genre])}
                    isLoading={loading}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
