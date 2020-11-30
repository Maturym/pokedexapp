import React from 'react';
import './Pagination.css';
import getData from '../../services/getData';

export default function Pagination({ postsPerPage, totalPosts, currentPage,
   paginate, fetchPokemonData, first, last, openData }) {

  const pageNumbers = [];

    let maxRight = 0;
    let maxLeft = 0;

  if (Math.ceil(totalPosts / postsPerPage) <= 5) {
    maxRight = Math.ceil(totalPosts / postsPerPage);
    maxLeft = 1;
  } else {
    maxRight = +(currentPage + 3) <= Math.ceil(totalPosts / postsPerPage) ? currentPage + 3 : Math.ceil(totalPosts / postsPerPage);
    maxLeft = currentPage - 3 >= 1 ? currentPage - 3 : 1;
  }
   
  
  for (let i = maxLeft; i <=maxRight; i++){
    pageNumbers.push(i)
  }


  return (
    <div className="btn">
    {window.location.pathname === '/pokedexapp' ? 
      currentPage !== 1? <button onClick={first}>First</button>: null : null
    }
    {pageNumbers.map(number => (
       <button key={number} className={currentPage === number ? 'active' : null}
       onClick={() => {
        const indexOfLastPost = number*postsPerPage <= 890? number*postsPerPage: 890;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        
        paginate(number);

        if (window.location.pathname === '/pokedexapp') {
          fetchPokemonData(`https://pokeapi.co/api/v2/pokemon?offset=${indexOfFirstPost}&limit=${postsPerPage}`);
        }

        if (window.location.pathname.includes('/type')){
          openData(number);
         }
        
        }}
         >
           {number}
       </button>
    ))}
    {window.location.pathname === '/pokedexapp' ? 
      currentPage !== Math.ceil(totalPosts / postsPerPage)? 
    <button onClick={last}>Last</button>: null : null
    }
 </div> 
  )
}
