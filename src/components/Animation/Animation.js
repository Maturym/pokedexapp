import React from 'react';
import animation from '../../img/pokemon-animation.gif';
import './Animation.css';

const Animation = props => {
  return (
      <div className="animation-wrapper">
        <img className="animation" src={animation} /> 
      </div>
  )
}


export default Animation
