import React from 'react';
import './Pagination.css'

export default function Pagination({ postsPerPage, totalPosts }) {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++){
    pageNumbers.push(i)
  }
console.log(pageNumbers);

  return (
      <div className="btn">
        {pageNumbers.map(number => (
          <button key={number}>
              {number}

          </button>
        ))}
      </div>    
  )
}
