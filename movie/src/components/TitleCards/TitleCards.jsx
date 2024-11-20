import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';



const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
   method: 'GET'};
   
const handleWheel = (event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft += event.deltaY;
}

useEffect(()=>{

  fetch( 'https://api.rapidmock.com/api/vikuman/v1/movies/all', options)
   .then(response => response.json())
   .then(response => setApiData(response))
   .catch(err => console.log(err));

  cardsRef.current.addEventListener('wheel', handleWheel)
},[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular Movies"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={card.poster_url} alt="" />
            <p>{card.title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
