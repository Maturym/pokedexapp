import React, { useState, useEffect } from 'react';
import PokemonList from './components/PokemonList/PokemonList';
import Navbar from './components/Navbar/Navbar';
import Pagination from './components/Pagination/Pagination';
import getData from './services/getData';
import Animation from './components/Animation/Animation';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './app.css';
//import PokemonTypes from './components/PokemonTypes/PokemonTypes';
import PokemonCard from './components/PokemonCard/PokemonCard';
import Search from './components/Search/Search'


function App() {

  const [pokemonData, setPokemonData] = useState([]);
  const [totalPosts, setTotalPosts] = useState(890)
  const [pokemonType, setPokemonType] = useState([]);

  const [pokemonInfo,setPokemonInfo] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState([]);

  const [input, setInput] = useState('');
  
  const [postsPerPage, setPostsPerPage] = useState(20)
  const [loading, setLoading] = useState(true);
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const allTypes = 'https://pokeapi.co/api/v2/type/';
  const allLocation = 'https://pokeapi.co/api/v2/location/?offset=0&limit=780';

  const firstURL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${postsPerPage}`;

  const lastURL = `https://pokeapi.co/api/v2/pokemon?offset=${totalPosts - postsPerPage}&limit=${postsPerPage}`;


  useEffect(() => {
    updateData();   
  },[])

  const  updateData = () => {
    setCurrentPage(1);
    setTotalPosts(890);
    setLoading(true);
    getData.fetchData(initialURL, async data => {
      getData.loadingPokemons(data, setPokemonData)
    });
    setLoading(false);
  }

  const openData = (number) => {

    const indexOfLastPost = number*postsPerPage <= 890? number*postsPerPage: 890;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const slicedURLArray = pokemonType.slice(indexOfFirstPost, indexOfLastPost);

    getData.loadingPokemons(slicedURLArray, data => {
      const dataWithPokemons = [];
      data.forEach(item => {
        dataWithPokemons.push(item)
      });

      setPokemonData(dataWithPokemons);
    })

  }

  const getPokemonData = async (id) => {
    setLoading(true);
    
    getData.fetchData(`https://pokeapi.co/api/v2/pokemon/${id}`, await setPokemonInfo)
    setLoading(false);
  }

  const fetchPokemonData = async ( url) => {
    setLoading(true);
    getData.fetchData(url, data => getData.loadingPokemons(data, setPokemonData))

    setLoading(false);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const last = async () => {
    setLoading(true);
    getData.fetchData(lastURL, async data => {
      await getData.loadingPokemons(data, setPokemonData);
      setCurrentPage(Math.ceil(totalPosts/postsPerPage))
    })
    setLoading(false);
  };

  const first = async () => {

    setLoading(true);
    getData.fetchData(firstURL, async data => {
      await getData.loadingPokemons(data, setPokemonData);
      setCurrentPage(1)
    })
    
    setLoading(false);
  }

  const filterByType = (target) => {
    setCurrentPage(1);
    window.scrollTo(0,0);

    getData.fetchData(allTypes, ((results) => {
      const typeName = results.find((item) => {
        if (item.name === target ) {return item};
      })
      getData.fetchData(typeName.url, async ({ pokemon }) => {
        const pokemonURLArray = []; 
        pokemon.forEach(p => {
          pokemonURLArray.push(p.pokemon)
        })
        setTotalPosts(pokemonURLArray.length);
        setPokemonType(pokemonURLArray);
        let currentPage = 1;

        const indexOfLastPost = currentPage*postsPerPage <= 890? currentPage*postsPerPage: 890;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;

        const slicedURLArray = pokemonURLArray.slice(indexOfFirstPost, indexOfLastPost);

        //setPokemonType(slicedURLArray);

        getData.loadingPokemons(slicedURLArray, setPokemonData)        
      })
    }))
  }

  const filterByLocation = (target) => {
    setCurrentPage(1);
    setLoading(true);
    window.scrollTo(0,0);

    getData.fetchData(allLocation, (results) => {

      const locationName = results.find(({ name }) => name.includes(target) );

      if (locationName) {
        getData.fetchData(locationName.url, (data) => {
          const dataURL = data.areas[0].url;
          getData.fetchData(dataURL, ({ pokemon_encounters }) => {

            setTotalPosts(pokemon_encounters)
            const pokemonByLocationURL = [];
      
            pokemon_encounters.forEach(({ pokemon }) => {
              pokemonByLocationURL.push(pokemon);
            })
            getData.loadingPokemons(pokemonByLocationURL, setPokemonData)
          })  
        })           
      }      
    })
    
    setLoading(false);
  }

  const handleChange = () => {
    //setSearch(e.target.value);
    const filteredDataName = [];
    getData.fetchData('https://pokeapi.co/api/v2/pokemon?offset=0&limit=890', data => {
      const filteredData = data.filter(item => item.name.includes(input));
      filteredData.forEach(item => filteredDataName.push(item.name));
      setSearch(filteredDataName);
      getData.loadingPokemons(filteredData, setPokemonData)      
    })
  }

  const getEvent = (e) => {
    const target = e.target.value.toLowerCase();
    setInput(target);
    const filteredDataName = [];
    getData.fetchData('https://pokeapi.co/api/v2/pokemon?offset=0&limit=890', data => {
      const filteredData = data.filter(item => item.name.includes(input));
      filteredData.forEach(item => filteredDataName.push(item.name));
      setSearch(filteredDataName);    
    })
  }


  return (
    
      <BrowserRouter>

        <main className="container" >
          <Route
            path="/"
            render ={() =>
              <Navbar updateData={updateData} />
            }
          />
            <Switch>            
              <Route 
                exact path='/pokedexapp'
                render ={() => 
                        <div className="main-container">
                          <Pagination currentPage={currentPage} postsPerPage={postsPerPage} 
                            totalPosts={totalPosts}
                            paginate={paginate} 
                            fetchPokemonData={fetchPokemonData} 
                            first={first} last={last}
                            openData={openData} 
                            />
                          { loading ? <Animation /> : 
                            <PokemonList  pokemonData={pokemonData} filterByType={filterByType} getPokemonData={getPokemonData} />                        
                          }
                          </div>                 
                }
              />
                <Route 
                  path="/card"
                  render ={() => pokemonInfo &&
                    <PokemonCard  pokemonInfo={pokemonInfo} filterByType={filterByType} filterByLocation={filterByLocation}/>
                  }
                />
            
            <Route 
                path='/type'
                render ={() => 
                  <div className="main-container">
                      <Pagination currentPage={currentPage} postsPerPage={postsPerPage} 
                        totalPosts={totalPosts}
                        paginate={paginate} 
                        fetchPokemonData={fetchPokemonData} 
                        first={first} last={last}
                        openData={openData} />
                      { loading ? <Animation />: 
                          <PokemonList  pokemonData={pokemonData} filterByType={filterByType} getPokemonData={getPokemonData}/>
                      }
                  </div>                  
                }
            />

            <Route 
                path='/location'
                render ={() => 
                  <div className="main-container">
                      <Pagination currentPage={currentPage} postsPerPage={postsPerPage} 
                        totalPosts={totalPosts}
                        paginate={paginate} 
                        first={first} last={last}
                        fetchPokemonData={fetchPokemonData} 
                        openData={openData} />
                      { loading ? <Animation /> : 
                          <PokemonList  pokemonData={pokemonData} filterByType={filterByType} getPokemonData={getPokemonData}/>
                      }
                  </div>                  
                }
            />

            <Route 
                path='/search'
                render ={() => 
                  <div className="main-container">
                    <Search handleChange={handleChange} search={search} getEvent={getEvent}/>
                    <PokemonList  pokemonData={pokemonData} filterByType={filterByType} getPokemonData={getPokemonData} />
                  </div>                  
                }
            />

          </Switch>

        </main >
      </BrowserRouter>
  );
}

export default App;
