import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useMyList } from '../../context/MyListContext';  // Import the context

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { toWatch, watched, addToWatch, addWatched } = useMyList();  // Access the context

  const [apiData, setApiData] = useState({
    genre: '',
    description: '',
    title: '',
    type: '',
    videoId: '-r687V8yqKY', 
  });

  const options = { method: 'GET' };

  useEffect(() => {
    fetch(`https://api.rapidmock.com/api/vikuman/v1/movies?id=${id}`, options)
      .then((response) => response.json())
      .then((response) => setApiData(response))
      .catch((err) => console.log(err));
  }, [id]);

  const handleAddToWatch = () => {
    addToWatch(apiData);
    alert(`${apiData.title} added to "To Watch"!`);
  };

  const handleAddWatched = () => {
    addWatched(apiData);
    alert(`${apiData.title} added to "Watched"!`);
  };

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        onClick={(event) => {
          event.stopPropagation();
          navigate('/'); // Go to the home page directly
        }}
      />
      {/* Dynamically set the YouTube video ID */}
      <iframe
        width="90%"
        height="90%"
        src={'https://www.youtube.com/embed/-r687V8yqKY'}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.title}</p>
        <p>{apiData.type}</p>
        <p>{apiData.description}</p>
        <p>{apiData.genre}</p>

        {/* Buttons to add to respective lists */}
        <button onClick={handleAddToWatch}>Add to To Watch</button>
        <button onClick={handleAddWatched}>Mark as Watched</button>
      </div>
    </div>
  );
};

export default Player;
