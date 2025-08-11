import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

// Movie component to display each movie card
const Movie = ({ movie }) => {
  return (
    <div className="movie-card">
      {movie.poster_url ? (
        <img src={movie.poster_url} alt={movie.title} className="movie-poster" />
      ) : (
        <div className="no-poster">No poster available</div>
      )}
      <h3>{movie.title}</h3>
      <div className="movie-info">
        <p><strong>Vote Count:</strong> {movie.vote_count}</p>
        <p><strong>Vote Average:</strong> {movie.vote_average}</p>
        <p><strong>Popularity:</strong> {movie.popularity}</p>
      </div>
    </div>
  );
};

// Error Boundary to catch errors in the component tree
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught in error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Add loading class to body for custom cursor
    document.body.classList.add('loading');

    axios
      .get('http://localhost:8000/movies/top-100-movies')  // Assuming FastAPI runs on localhost
      .then((response) => {
        const fetchedMovies = response.data;
        if (Array.isArray(fetchedMovies)) {
          setMovies(fetchedMovies);
        } else {
          console.error("Movies data is not an array:", fetchedMovies);
          setMovies([]);  // Set to empty array in case of invalid data
        }
        setLoading(false); // Turn off the loading state
      })
      .catch((error) => {
        console.error('There was an error fetching the movies!', error);
        setError(error);  // Handle error state
        setLoading(false); // Turn off the loading state
      })
      .finally(() => {
        // Remove the loading class from body after fetch is complete (success or failure)
        document.body.classList.remove('loading');
      });
  }, []);

  return (
    <div>
      
      {loading && !error ? (
        <div className="loading-spinner"></div> // Show the loading spinner while loading
      ) : error ? (
        <p className="error-message">There was an issue fetching the movies. Please try again later.</p>
      ) : (
        <div className="App">
          <div className="movies-list">
            
            {movies.map((movie) => (
              <Movie key={movie.movie_id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Wrap the App component with ErrorBoundary
const AppWithErrorBoundary = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

export default AppWithErrorBoundary;
