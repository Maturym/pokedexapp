import axios from 'axios';


const getData = {
  async fetchData (url, handler) {
    let pokemonInfo = await axios.get(url).then(res =>  res.data)
  
    handler(pokemonInfo.results || pokemonInfo);
  },
  
  
    async loadingPokemons (data, handler) {
      let _pokemonData = await Promise.all(
        data.map(async pokemon => {
          let pokemonRecord = await axios.get(pokemon.url).then(res => res.data)
          return pokemonRecord;
        })
      )
      handler(_pokemonData);
    },
}

export default getData;


