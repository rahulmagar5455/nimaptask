import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import TopRatedPage from './components/TopRatedPage';
import UpcomingPage from './components/UpcomingPage';
import SingleMovieDetail from './components/SingleMovieDetail';
import SearchedMoviePage from './components/SearchedMoviePage';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import PopularMovies from './components/PopularMovies';

const RoutesConfig = () => {
  return (
    <Router>
      <Navbar />
      <Routes>  {/* Routes replaces Switch in react-router-dom v6 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/popular" element={<PopularMovies />} /> 
        <Route path="/top-rated" element={<TopRatedPage />} />
        <Route path="/upcoming" element={<UpcomingPage />} />
        <Route path="/movie/:id" element={<SingleMovieDetail />} />
        <Route path="/search" element={<SearchedMoviePage />} />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 */}
      </Routes>
    </Router>
  );
};

export default RoutesConfig;
