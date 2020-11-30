import React from 'react';
import './PokemonList.css';
import { Link } from "react-router-dom";

import PokemonTypes from '../PokemonTypes/PokemonTypes'
// import filterByType from '../../App'

const PokemonList = ({ pokemonData, filterByType, getPokemonData }) => {

  
  return (
        <div className="cards">
          {pokemonData.map(({ id, name, types }) => (
            <Link
              to={`/card/${name}`}
              id={id}
              onClick={(e) => {
                const target = e.target.closest('.card')
                getPokemonData(target.id)
              }} 
              key={id} className = "card">
              <img src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} alt="" className="card-img"/>
              <div className="card-info">
                <h3 className="card-id">№{id<10 ? "00"+id : id>=10 && id<100 ? "0"+id: id}</h3>
                <h1 className="card-title">{name}</h1>
                 <div className="card-tags">
                  {types.map(({ type }) => (
                    <PokemonTypes type={type} filterByType={filterByType}  key={type.name} />
                  ))}
                </div> 
              </div>
            </Link>
          ))}
        </div>

  )
}
export default PokemonList;
