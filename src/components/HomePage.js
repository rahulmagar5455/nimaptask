import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../api/movieApi';
import MovieDetails from './MovieDetails';
import '../css/home.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10; // Set to 10 to display 10 movies per page

  useEffect(() => {
    getPopularMovies().then(response => {
      setMovies(response.data.results);
    });
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  // Pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const handleNextPage = () => {
    if (indexOfLastMovie < movies.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
      ) : (
        <>
          <div className="movies-grid">
            {currentMovies.map(movie => (
              <div 
                key={movie.id} 
                className="movie-card" 
                onClick={() => handleMovieClick(movie)}
              >
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <h2>{movie.title}</h2>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <button onClick={handleNextPage} disabled={indexOfLastMovie >= movies.length}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
