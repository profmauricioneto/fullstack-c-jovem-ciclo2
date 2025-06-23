import React from "react";
import ListPokemon from "./exercicio01/ListPokemon";
import './App.modules.css';

const pokemons = [
  { name: "Mewtwo", url: "./mewtwo.png", type: "Psiquico" },
  { name: "Pikachu", url: "./pikachu.png", type: "Eletrico" },
  { name: "Charizard", url: "./charizard.webp", type: "Fogo" },
  { name: "Spheal", url: "./spheal.png", type: "Agua/Gelo" },
]

const App = () => {
  return (
    <div className="pokemon-app">
      <h1>Cartas Pokemon</h1>
      <ListPokemon pokemons={pokemons} />
    </div>
  );
};
export default App;
