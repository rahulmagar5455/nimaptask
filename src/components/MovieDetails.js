import React, { useEffect, useState } from 'react';
import { getMovieCast } from '../api/movieApi'; // Adjust the path based on where the API file is
import { css } from '../css/moviedetails.css'; // Assuming you have a CSS file for styling

const MovieDetails = ({ movie, onClose }) => {
  const [cast, setCast] = useState([]);

  // Fetch the movie's cast when the component mounts
  useEffect(() => {
    if (movie) {
      const fetchCast = async () => {
        try {
          const response = await getMovieCast(movie.id); // Use your external function
          console.log(response.data.cast); // Log the cast data for debugging
          setCast(response.data.cast);
        } catch (error) {
          console.error('Error fetching cast:', error.response ? error.response.data : error.message);
        }
      };
      fetchCast();
    }
  }, [movie]);

  if (!movie) return null;

  return (
    <div className="movie-details">
      <button onClick={onClose} style={{ marginBottom: '10px' }}>Close</button>

      <div className="movie-header">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p>Rating: {movie.vote_average}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>{movie.overview}</p>
        </div>
      </div>

      <h3>Cast</h3>
      {cast.length > 0 ? (
        <div className="cast-grid">
          {cast.slice(0, 6).map(actor => (
            <div key={actor.id} className="cast-card">
              {actor.profile_path ? (
                <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} />
              ) : (
                <img src="https://via.placeholder.com/185x278?text=No+Image" alt={actor.name} />
              )}
              <p>{actor.name}</p>
              <p className="character-name">Character: {actor.character}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No cast information available.</p>
      )}
    </div>
  );
};

export default MovieDetails;
