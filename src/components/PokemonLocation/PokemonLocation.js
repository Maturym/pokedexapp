import React, { useState, useEffect } from 'react';
import './PokemonLocation.css';
import getData from '../../services/getData';
import { Link } from 'react-router-dom';

const PokemonLocation = ({ locationURL, filterByLocation }) => {
  
  const [locationOfPokemon, setLocation] = useState([]);

  useEffect(() => {
    getData.fetchData(locationURL, setLocation);
  }, [locationURL])  

 if (!locationOfPokemon.length) {

  return (
    <div className="card-tags card-page-location">
      <div className="card-tag card-tag-location">
          <span>Этого покемона нельзя поймать</span>
      </div>
    </div>
  )

 } else {

    return (
      <div className="tags-container">
        {locationOfPokemon.map(({ location_area }) => (
          <Link 
          to={`/location/${location_area.name}`} 
          onClick={(e) => {
            filterByLocation(e.target.textContent)
          }}
            className="card-tags card-page-location"> 
            <div className="card-tag card-tag-location" id={location_area.name.split('-area')[0]} key={location_area.name}>
              {location_area.name.split('-area')[0]}
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

export default PokemonLocation
