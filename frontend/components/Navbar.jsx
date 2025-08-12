import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ searchValue, onSearchChange }) => {
  return (
    <nav className="flex justify-between items-center bg-black text-white px-6 py-4 border-b border-gray-800">
      <div className="text-3xl font-bold">Atom</div>

      <div className="flex items-center space-x-8">
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/top100"
              className="hover:text-yellow-400 transition-colors duration-300"
            >
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
