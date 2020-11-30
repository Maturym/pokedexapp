import React, { useState } from 'react';
import './Search.css';
import searchLogo from '../../img/gotcha.svg';
import getData from '../../services/getData'

const Search = ({handleChange, search, getEvent }) => {


  const initialURL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=890';


  return (
    <div className="input">
      <form className="search-form">
        <label>Введите имя 
          <input type="text" className="input__pokemon-name" required
          onChange = {getEvent}
          />
          
        </label>
      {/* <div className="dropdown-container">
        <ul className="dropdown dropdown__pokemon-name">
          {search.map((name) => (
            <li className="drop-down-link" key={name}>{name}</li>
          ))}
        </ul>
      </div> */}
			<button
      onClick={(e) => {
        e.preventDefault();
        handleChange();
      }} 
      className="search-btn"
      ><img src={searchLogo} className="search-img"/></button>
      </form>
    </div>
  )
}

export default Search
