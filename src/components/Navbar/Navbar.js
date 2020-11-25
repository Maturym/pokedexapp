import React from 'react';
import './Navbar.css';
import mainLogo from '../../img/pikachu.svg';
import pokedexLogo from '../..//img/pokeball.svg';

export default function Navbar() {
  return (
      <header>
        <ul className="header__nav">
          <li className="nav__link">
            <a href="index.html">
              <img src={mainLogo} alt="main-logo" className="nav__link--img"/>
              <h3 className="nav__link--text">Главная</h3>
            </a>
          </li>
          <li className="nav__link">
            <a href="#">
              <img src={pokedexLogo} alt="search-logo" className="nav__link--img"/>
              <h3 className="nav__link--text">Покедекс</h3>
            </a>
          </li>
        </ul>
    </header>
  )
}
