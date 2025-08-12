import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchAutocomplete = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/movies/autocomplete?q=${searchValue}`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAutocomplete();
  }, [searchValue]);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // Navigate to search page with query param
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (title) => {
    navigate(`/search?q=${encodeURIComponent(title)}`);
    setSearchValue(title);
    setSuggestions([]);
  };

  return (
    <nav className="flex justify-between items-center bg-black text-white px-6 py-4 border-b border-gray-800 relative">
      <Link to="/">
        <div className="flex items-center space-x-3 text-3xl font-bold animate-pulse">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5968/5968274.png"
            alt="Atom Logo"
            className="w-10 h-10"
          />
          <span
            className="text-white font-bold relative"
            style={{
              textShadow:
                "0 0 2px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.7)",
            }}
          >
            Atom
          </span>
        </div>
      </Link>

      <div className="flex items-center space-x-8">
        <ul className="flex space-x-8">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/top100" className="nav-link">
              Top 100
            </Link>
          </li>
        </ul>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            placeholder="Search movies..."
            className="px-3 py-1 rounded text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={searchValue}
            onChange={handleInputChange}
            autoComplete="off"
          />

          {/* Autocomplete dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-gray-900 border border-gray-700 rounded mt-1 max-h-60 overflow-y-auto z-50">
              {suggestions.map((movie) => (
                <li
                  key={movie.movie_id}
                  className="px-3 py-2 hover:bg-indigo-600 cursor-pointer"
                  onClick={() => handleSuggestionClick(movie.title)}
                >
                  {movie.title}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
