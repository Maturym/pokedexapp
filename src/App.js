import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList/PokemonList';
import Navbar from './components/Navbar/Navbar';
import Pagination from './components/Pagination/Pagination';
import animation from '../src/img/pokemon-animation.gif'
import axios from 'axios';
import './app.css';


function App() {

  const [pokemonData, setPokemonData] = useState([]);
  const [totalPosts, setTotalPosts] = useState(890)
  const [pokemonType, setPokemonType] = useState('');

  // const [nextURL, setNextURL] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // const [prevURL, setPrevURL] = useState('');
  const [postsPerPage, setPostsPerPage] = useState(20)
  const [loading, setLoading] = useState(true);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const firstURL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${postsPerPage}`;

  const lastURL = `https://pokeapi.co/api/v2/pokemon?offset=${totalPosts - postsPerPage}&limit=${postsPerPage}`;

  const pageNumbers = [];

      
  const maxLeft = currentPage - 3 >= 1 ? currentPage - 3 : 1;
  const maxRight = +(currentPage + 3) <= Math.ceil(totalPosts / postsPerPage) ? currentPage + 3 : Math.ceil(totalPosts / postsPerPage);


  
  for (let i = maxLeft; i <=maxRight; i++){
    pageNumbers.push(i)
  }


  async function fetchData(url) {
    let pokemonInfo = await axios.get(url).then(res =>  res.data)
    // setPrevURL(pokemonInfo.previous);
    // setNextURL(pokemonInfo.next);
    await loadingPokemons(pokemonInfo.results)
    setLoading(false);
  }

  
  const last = async () => {
    setLoading(true);
    let data = await axios.get(lastURL).then(res =>  res.data);
    console.log(data.results);
    await loadingPokemons(data.results);
    setCurrentPage(Math.ceil(totalPosts/postsPerPage))
    // setNextURL(data.next);
    // setPrevURL(data.previous);
    setLoading(false);
  };

  const first = async () => {

    setLoading(true);
    let data = await axios.get(firstURL).then(res =>  res.data);
    await loadingPokemons(data.results);
    setCurrentPage(1)
    // setNextURL(data.next);
    // setPrevURL(data.previous);
    setLoading(false);
  }

  useEffect(() => {
    fetchData(initialURL);
  },[])

  const loadingPokemons = async data => {
    let _pokemonData = await Promise.all(
      data.map(async pokemon => {
        let pokemonRecord = await axios.get(pokemon.url).then(res => res.data)
        return pokemonRecord;
      })
    )
    setPokemonData(_pokemonData);
  };

  const fetchPokemonData = async (e) => {
    const target = +e.target.textContent;

    setCurrentPage(target);

    const indexOfLastPost = target*postsPerPage <= 890? target*postsPerPage: 890;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    let data = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${indexOfFirstPost}&limit=${postsPerPage}`).then(res => res.data)

    await loadingPokemons(data.results);

    // setNextURL(data.next);
    // setPrevURL(data.previous);
    setLoading(false);
  }

  return (
    
      <>
        { loading ? <div className="animation-wrapper">
          <img className="animation" src={animation} /> 
        </div> :
        (
        <main className="container" >
          <Navbar/>
          <div className="btn">
             {currentPage !== 1? <button onClick={first}>First</button>: null}
             {pageNumbers.map(number => (
                <button key={number}
                onClick={(e) => {
                  setCurrentPage(e.target.textContent)
                  fetchPokemonData(e)}}>
                    {number}
                </button>
             ))}
            {currentPage !== Math.ceil(totalPosts / postsPerPage)? <button onClick={last}>Last</button>: null}
          </div>
          { loading ? <div className="animation-wrapper">
          <img className="animation" src={animation} /> 
        </div> :
          <PokemonList  pokemonData={pokemonData}/>
          }
        </main >
      )
      }  
      
      </>
  );
}

export default App;
