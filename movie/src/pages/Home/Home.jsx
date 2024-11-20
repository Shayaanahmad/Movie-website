import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/more_info.png';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]); // Store all movies/shows
  const [filteredMovies, setFilteredMovies] = useState([]); // Store filtered results
  const [searchQuery, setSearchQuery] = useState(''); // Track search input

  const navigate = useNavigate(); // For navigation

  // Fetch all movies/shows from the API
  useEffect(() => {
    fetch('https://api.rapidmock.com/api/vikuman/v1/movies/all')
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data); // Initially display all items
      })
      .catch((err) => console.log(err));
  }, []);

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query.trim() === '') {
      // Reset to default list when search is cleared
      setFilteredMovies(movies);
    } else {
      // Filter movies based on search query
      const filteredResults = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filteredResults);
    }
  };

  // Handle filtering by type
  const handleFilterByType = (type) => {
    if (type === 'all') {
      setFilteredMovies(movies); // Show all movies/shows
    } else {
      const filteredResults = movies.filter((movie) => movie.type === type);
      setFilteredMovies(filteredResults);
    }
  };

  // Handle sorting alphabetically
  const handleSortAlphabetically = () => {
    const sortedMovies = [...filteredMovies].sort((a, b) =>
      a.title.localeCompare(b.title) // Sort titles alphabetically
    );
    setFilteredMovies(sortedMovies);
  };

  return (
    <div className="home">
      <Navbar
        onSearch={handleSearch}
        onFilterByType={handleFilterByType} // Pass filter handler to Navbar
      />
      <div className="hero">
        <img src={hero_banner} alt="" className="banner-img" />
        <div className="hero-caption">
          <img src={hero_title} alt="" className="caption-img" />
          <p>
            Discovering his ties to a secret ancient order, a young man living
            in modern Istanbul embarks on a quest to save the city from an
            immortal enemy.
          </p>
          <div className="hero-btns">
            <button className="btn">
              <img src={play_icon} alt="" />
              Play
            </button>
            <button className="btn dark-btn">
              <img src={info_icon} alt="" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Display the movie list */}
      <div className="movie-list">
        <div className="movie-list-header">
          <h2>{searchQuery ? 'Search Results' : 'All Movies & Shows'}</h2>
          <button className="sort-button" onClick={handleSortAlphabetically}>
            Sort Alphabetically
          </button>
        </div>
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => navigate(`/player/${movie.id}`)} // Navigate to Player with movie id
              style={{ cursor: 'pointer' }}
            >
              <img src={movie.poster_url} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.Description}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
