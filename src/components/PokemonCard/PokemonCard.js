import React, { useState, useEffect } from 'react';
import './PokemonCard.css';
import PokemonTypes from '../PokemonTypes/PokemonTypes';
import getData from '../../services/getData';
import PokemonLocation from '../PokemonLocation/PokemonLocation';

const PokemonCard = ({ pokemonInfo, filterByType, filterByLocation }) => {

  const [ability, setAbility] = useState('');

  const getAbility = (url) => {

    getData.fetchData(url, data => {

      const dataEffects = data.effect_entries;
      let sliced = '';

      const englishElem = dataEffects.find((item) => {
        if (item.language.name === 'en') {return item};
      })

      if (document.documentElement.clientWidth <= 770 && document.documentElement.clientWidth > 320){
        sliced = englishElem.effect.slice(0,339);
 
       if (sliced.length < englishElem.effect.length) {
         sliced += '...';
       }
 
       setAbility(sliced);
 
     } else if (document.documentElement.clientWidth <= 320) {
         sliced = englishElem.effect.slice(0,200);
 
         if (sliced.length < englishElem.effect.length) {
         sliced += '...';
         }
         setAbility(sliced);

     } else if (document.documentElement.clientWidth > 320){
 
       sliced = englishElem.effect.slice(0,380);
 
         if (sliced.length < englishElem.effect.length) {
         sliced += '...';
         }
       setAbility(sliced)
     }  

    })

  };


  if (pokemonInfo.length != 0) {

    const { height, id ,name, stats, types, weight, abilities, location_area_encounters: location } = pokemonInfo;


    window.scrollTo(0,0);  

    const abilityURL = abilities[0].ability.url;

    const meter = document.querySelectorAll('.meter');

    meter.forEach((item, index) => {
      item.style.top = 100 - stats[index].base_stat + '%';

    });

    getAbility(abilityURL);


    return (
      <div className="main-wrapper">
        <h1 className="pokemon-name">{name.toUpperCase()}
          <span className="pokemon-id">№{id<10 ? "00"+id : id>=10 && id<100 ? "0"+id : id}</span>
        </h1>
        <div className="card-block">
          <img src={`https://pokeres.bastionbot.org/images/pokemon/${id}.png`} alt="" className="card-left-img"/>
            <div className="card-left">
            <div className="pokemon-info">
                <ul>
                  <li className="pokemon-par">Height</li>
                  <li className="pokemon-par">{height}.0 m</li>
                  <li className="pokemon-par">Weight</li>
                  <li className="pokemon-par">{weight}.0 kg</li>
                  <li className="pokemon-par">Gender</li>
                  <li className="pokemon-par">
                    <span className="pokemon-sex background-color-male">Male</span>
                    <span className="pokemon-sex background-color-female">Female</span>
                  </li>
                </ul>
                <ul>
                  <li className="pokemon-par">Category</li>
                  <li className="pokemon-par">Seed</li>
                  <li className="pokemon-par">Abilities</li>
                  <li className="pokemon-par overgrow">{abilities[0].ability.name.toUpperCase()}</li>
                </ul>
                <div className="pokemon-info-close-toggle"
                  onClick={() =>{
                    document.querySelector('.pokemon-info-close').classList.add('active');
                    document.querySelector('.pokemon-info').classList.add('active');
                  }}
                  >
                  ?</div>
              </div>
              <div className="pokemon-info pokemon-info-close">
                <div className="info-close-btn"
                onClick={() =>{
                  document.querySelector('.pokemon-info-close').classList.remove('active');
                  document.querySelector('.pokemon-info').classList.remove('active');
                }}
                >
                X</div>
                <h2 className="info-close">Ability info</h2>
                <h3 className="info-ability-title">{abilities[0].ability.name.toUpperCase()}</h3>
                <p className="info-ability-descr">
                  {ability}
                </p>
              </div>
              <div className="tags">
                <div className="tags-types">
                  <div className="tags-title">Types</div>
                  <div className="card-tags card-page">
                  {types.map(({ type }) => (
                    <PokemonTypes type={type} filterByType={filterByType}  key={type.name} />
                  ))}
                  </div>
                </div>
                <div className="tags-location">
                  <div className="tags-title">Location</div>
                                       
                    <PokemonLocation locationURL={location} filterByLocation={filterByLocation} />          

                </div>
              </div>          
              </div>
            </div>
            <div className="card-right">
            <div className="card-stats">
              <h3 className="stats-title">Stats</h3>
              <ul className="stats-links">
                <li className="stats-link">
                  <ul className="stats-column">
                    <li className="meter" data-value="3"></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                  <span className="state">HP</span>
                </li>
                <li className="stats-link">
                  <ul className="stats-column">
                    <li className="meter" data-value="3"></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                  <span className="state">Attack</span>
                </li>
                <li className="stats-link">
                  <ul className="stats-column">
                    <li className="meter" data-value="3"></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                  <span className="state">Defense</span>
                </li>
                <li className="stats-link">
                  <ul className="stats-column">
                    <li className="meter" data-value="3"></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                  <span className="state">Special<br /> Attacks</span>
                </li>
                <li className="stats-link">
                  <ul className="stats-column">
                    <li className="meter" data-value="3"></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                  <span className="state">Special<br /> Defense</span>
                </li>
                <li className="stats-link">
                  <ul className="stats-column">
                    <li className="meter" data-value="3"></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                  <span className="state">Speed</span>
                </li>
              </ul>
            </div>
          </div>
          </div>
    )

  } 
  else return null;
}

export default PokemonCard;
