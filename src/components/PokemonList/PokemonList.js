import React from 'react';
import './PokemonList.css';

const PokemonList = ({ pokemonData }) => {

  
  return (
    <>
      <div className="cards">
        {pokemonData.map(({ id, name, types }) => (
          <a key={id} className = "card">
            <img src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} alt="" className="card-img"/>
            <div className="card-info">
              <h3 className="card-id">№{id<10 ? "00"+id : id>10 && id<100 ? "0"+id: id}</h3>
              <h1 className="card-title">{name}</h1>
              <div className="card-tags">
                {types.map(({ type }) => (
                  <span key={type.name} className={`card-tag background-color-${type.name}`}>{type.name}</span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    
    </>
  )
}
export default PokemonList;
