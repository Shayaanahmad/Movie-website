import React from 'react';
import './MyList.css';
import { useMyList } from '../../context/MyListContext'; // Import the context

const MyList = () => {
  const { toWatch, watched } = useMyList(); // Access the global lists

  return (
    <div className="my-list">
      <div className="tabs">
        <button className="tab active">To Watch</button>
        <button className="tab">Watched</button>
      </div>

      {/* Display To Watch List */}
      <div className="list-container">
        <div className="scrollable-list">
          {toWatch.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img src={movie.poster_url} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Watched List */}
      <div className="list-container">
        <div className="scrollable-list">
          {watched.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img src={movie.poster_url} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyList;
