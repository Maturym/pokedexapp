import React from 'react';
import './pokemonTypes.css';
import { Link } from 'react-router-dom';

const PokemonTypes = ({ type , filterByType }) => {


  return (

    <>
      <Link
      to={`/type/${type.name}`} 
        className={`card-tag background-color-${type.name}`}
        onClick={(e) => {
          filterByType(e.target.textContent)
        }}
      >
      {type.name}
      </Link>
    </>
  )
}

export default PokemonTypes;
