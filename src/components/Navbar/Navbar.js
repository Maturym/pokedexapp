import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import mainLogo from '../../img/pikachu.svg';
import pokedexLogo from '../../img/pokeball.svg';

export default function Navbar({updateData}) {
  return (
      <header>
        <ul className="header__nav">
          <li className="nav__link">
            <Link 
              to = "/pokedexapp/"
              onClick={() => {
                updateData()
              }}>
              <img src={mainLogo} alt="main-logo" className="nav__link--img"/>
              <h3 className="nav__link--text">Главная</h3>
            </Link>
          </li>
          <li className="nav__link">
            <Link 
              to = '/search'>
              <img src={pokedexLogo} alt="search-logo" className="nav__link--img"/>
              <h3 className="nav__link--text">Покедекс</h3>
            </Link>
          </li>
        </ul>
    </header>
  )
}
