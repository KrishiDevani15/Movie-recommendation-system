import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-white font-mono leading-relaxed">
      {/* Project Title */}
      <h1 className="text-4xl font-bold mb-4 text-yellow-400">
        🎬 Movie Recommendation System
      </h1>

      {/* GitHub Badges */}
      <div className="mb-6 space-x-3">
        <img
          src="https://img.shields.io/github/stars/KrishiDevani15/Movie-recommendation-system?style=social"
          alt="GitHub Stars"
          className="inline-block"
        />
        <img
          src="https://img.shields.io/github/languages/top/KrishiDevani15/Movie-recommendation-system"
          alt="Top Language"
          className="inline-block"
        />
        <img
          src="https://img.shields.io/github/license/KrishiDevani15/Movie-recommendation-system"
          alt="License"
          className="inline-block"
        />
      </div>

      {/* Overview */}
      <p className="mb-4 text-gray-300">
        This project is a full-stack movie recommendation system using Machine
        Learning, Elasticsearch, FastAPI, and React. It helps users search and
        discover top-rated movies, complete with autocomplete and real-time
        filtering.
      </p>

      {/* Tech Stack */}
      <h2 className="text-2xl font-semibold text-yellow-400 mb-2">
        🧰 Tech Stack
      </h2>
      <ul className="list-disc list-inside mb-6 text-gray-200 space-y-1">
        <li>🔍 Elasticsearch for powerful autocomplete and search</li>
        <li>⚡ FastAPI backend for fast and scalable APIs</li>
        <li>📦 Pandas + ML for Top 100 weighted rating logic</li>
        <li>🎥 React + TailwindCSS frontend</li>
        <li>🖼️ TMDB API for fetching real-time movie posters</li>
      </ul>

      {/* Screenshot */}
      <h2 className="text-2xl font-semibold text-yellow-400 mb-2">
        🖼️ Screenshot
      </h2>
      <img
        src="https://raw.githubusercontent.com/KrishiDevani15/Movie-recommendation-system/main/assets/demo.png"
        alt="Project Screenshot"
        className="rounded-lg shadow-lg mb-6"
      />

      {/* Getting Started */}
      <h2 className="text-2xl font-semibold text-yellow-400 mb-2">
        🚀 Getting Started
      </h2>
      <p className="text-gray-300 mb-2">To run the project locally:</p>
      <pre className="bg-gray-900 rounded p-4 text-green-400 text-sm overflow-x-auto mb-6">
        <code>
          {`# Clone the repository
git clone https://github.com/KrishiDevani15/Movie-recommendation-system

# Backend setup
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend setup
cd frontend
npm install
npm run dev`}
        </code>
      </pre>

      {/* Features */}
      <h2 className="text-2xl font-semibold text-yellow-400 mb-2">
        🌟 Features
      </h2>
      <ul className="list-disc list-inside mb-6 text-gray-200 space-y-1">
        <li>Live autocomplete for movie titles</li>
        <li>Real-time TMDB poster fetching</li>
        <li>Top 100 movie page with hover effects</li>
        <li>Responsive UI with pagination</li>
        <li>ML-based weighted scoring system</li>
      </ul>

      {/* Links */}
      <h2 className="text-2xl font-semibold text-yellow-400 mb-2">🔗 Links</h2>
      <ul className="list-disc list-inside text-blue-400 mb-8">
        <li>
          <a
            href="https://github.com/KrishiDevani15/Movie-recommendation-system"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub Repository
          </a>
        </li>
        <li>
          <Link to="/" className="hover:underline text-blue-300">
            Home Page →
          </Link>
        </li>
      </ul>

      {/* Footer */}
      <p className="text-sm text-gray-500">
        © {currentYear} — Built with ❤️ by Krishi Devani
      </p>
    </div>
  );
};

export default About;
