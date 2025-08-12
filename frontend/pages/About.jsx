import { Link } from "react-router-dom";
import CodeBlock from "../components/CodeBlock"; // adjust path if needed

const About = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white font-mono px-6 py-12">
      <div className="max-w-5xl mx-auto backdrop-blur-lg bg-white/5 rounded-xl p-8 shadow-xl ring-1 ring-white/10">
        {/* Title */}
        <h1 className="text-5xl font-bold text-yellow-400 mb-6 flex items-center space-x-2">
          <span>🎬</span> <span>Movie Recommendation System</span>
        </h1>

        {/* GitHub Badges */}
        <div className="flex flex-wrap gap-4 mb-8">
          <img
            src="https://img.shields.io/github/stars/KrishiDevani15/Movie-recommendation-system?style=social"
            alt="GitHub Stars"
            className="h-6"
          />
          <img
            src="https://img.shields.io/github/languages/top/KrishiDevani15/Movie-recommendation-system"
            alt="Top Language"
            className="h-6"
          />
          <img
            src="https://img.shields.io/github/license/KrishiDevani15/Movie-recommendation-system"
            alt="License"
            className="h-6"
          />
        </div>

        {/* Overview */}
        <section className="mb-8">
          <p className="text-gray-300 text-lg leading-relaxed">
            A full-stack movie recommendation platform leveraging Machine
            Learning, Elasticsearch, FastAPI, and React. Features real-time
            filtering, autocomplete, and top-rated movie discovery.
          </p>
        </section>

        {/* Tech Stack */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-yellow-300 mb-4">
            🧰 Tech Stack
          </h2>
          <ul className="space-y-2 text-gray-200 list-disc list-inside text-lg">
            <li>🔍 Elasticsearch for fast and powerful search</li>
            <li>⚡ FastAPI for building RESTful APIs</li>
            <li>📦 Pandas + ML for intelligent recommendations</li>
            <li>🎥 React + TailwindCSS for responsive UI</li>
            <li>🖼️ TMDB API for dynamic poster display</li>
          </ul>
        </section>

        {/* Screenshot */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-yellow-300 mb-4">
            🖼️ Screenshot
          </h2>
          <img
            src="https://i.pinimg.com/originals/50/5d/db/505ddb5e0b0e8c3e96b66e1469ef47c1.gif"
            alt="Project Screenshot"
            className="w-full rounded-lg shadow-lg"
          />
        </section>

        {/* Getting Started */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-yellow-300 mb-4">
            🚀 Getting Started
          </h2>
          <p className="text-gray-300 mb-3 text-lg">
            Clone and run the project locally using the steps below:
          </p>
          <pre className="bg-gray-600 p-4 rounded-md text-green-400 overflow-x-auto text-sm ransition-transform hover:scale-105 duration-300">
            <CodeBlock
              code={`# Clone the repository
git clone https://github.com/KrishiDevani15/Movie-recommendation-system

# Backend setup
cd backend
uv init
uv sync | uv add <package-name>

# Activate virtual environment (macOS/Linux)
source venv/bin/activate

# Activate virtual environment (Windows)
venv\\Scripts\\activate

# To run the fastapi server
uvicorn main:app --reload

# Frontend setup
cd frontend
npm install
npm run dev`}
            />
          </pre>
        </section>

        {/* Features */}
        <section className="mb-10">
          <h2 className="text-3xl font-semibold text-yellow-300 mb-4">
            🌟 Features
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-200 text-lg">
            <li>Live autocomplete for movie titles</li>
            <li>Real-time poster fetching via TMDB</li>
            <li>Top 100 movie list with smooth hover effects</li>
            <li>Fully responsive UI with clean pagination</li>
            <li>ML-based smart scoring & filtering</li>
          </ul>
        </section>

        {/* Links */}
        <section className="mb-4">
          <h2 className="text-3xl font-semibold text-yellow-300 mb-4">
            🔗 Links
          </h2>
          <ul className="list-disc list-inside text-blue-400 text-lg space-y-2">
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
                ← Back to Home
              </Link>
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-gray-500 text-sm text-center border-t border-white/10 pt-4">
          &copy; {currentYear} Movie Recommendation System. Built with ❤️ by
          Krishi Devani.
        </footer>
      </div>
    </div>
  );
};

export default About;
