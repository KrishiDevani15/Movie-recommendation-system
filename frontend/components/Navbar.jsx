import React from "react";
import { Link } from "react-router-dom";
import "../src/index.css";

const Navbar = ({ searchValue, onSearchChange }) => {
  return (
    <nav className="flex justify-between items-center bg-black text-white px-6 py-4 border-b border-gray-800">
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

        <input
          type="text"
          placeholder="Search movies..."
          className="px-3 py-1 rounded text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={searchValue}
          onChange={onSearchChange}
        />
      </div>
    </nav>
  );
};

export default Navbar;
