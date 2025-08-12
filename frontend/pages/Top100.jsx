import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";
import CustomPagination from "../components/CustomPagination.jsx";

const Top100 = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("high-to-low");
  const [currentPage, setCurrentPage] = useState(1);

  const moviesPerPage = 20; // Show 20 movies per page

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const res = await axios.get(
          "http://127.0.0.1:8000/movies/top-100-movies"
        );
        setMovies(res.data);
      } catch {
        setError("Failed to load top movies.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTopMovies();
  }, []);

  // Sort movies by rating
  const sortedMovies = [...movies].sort((a, b) =>
    sortOrder === "high-to-low"
      ? b.vote_average - a.vote_average
      : a.vote_average - b.vote_average
  );

  const totalPages = Math.ceil(sortedMovies.length / moviesPerPage);

  // Calculate current movies for the current page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = sortedMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Top 100 Movies</h1>

      <div className="mb-6">
        <label className="text-white mr-2">Sort by rating:</label>
        <select
          className="p-2 rounded bg-gray-700 text-white"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1); // Reset to first page on sort change
          }}
        >
          <option value="high-to-low">High to Low</option>
          <option value="low-to-high">Low to High</option>
        </select>
      </div>

      <MovieList movies={currentMovies} isLoading={isLoading} />

      <CustomPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Top100;
