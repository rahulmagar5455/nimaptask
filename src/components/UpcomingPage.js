import React, { useEffect, useState } from 'react';
import { getUpcomingMovies } from '../api/movieApi';
import MovieDetails from './MovieDetails';  // Import the MovieDetails component
import '../css/home.css';  // Import your CSS for styling

const UpcomingPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);  // State to track selected movie

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getUpcomingMovies();
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);  // Set the selected movie when clicked
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);  // Close the movie details view
  };

  return (
    <div>
      {/* Conditionally render MovieDetails if a movie is selected */}
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
      ) : (
        <div className="movies-grid">
          {movies.map(movie => (
            <div 
              key={movie.id} 
              className="movie-card" 
              onClick={() => handleMovieClick(movie)}  // Handle movie click
            >
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <h2>{movie.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingPage;
