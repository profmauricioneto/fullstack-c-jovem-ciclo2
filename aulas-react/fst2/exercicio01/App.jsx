import React from "react";
import ListPokemon from "./ListPokemon";
// import './App.modules.css'

const pokemons = [
  { name: "Charizard", url: "/assets/charizard.webp", type: "Fire" },
  { name: "Pikachu", url: "/assets/pikachu.png", type: "Electric" },
  { name: "Squirtle", url: "/assets/squirtle.png", type: "Water" },
  { name: "Snorlax", url: "/assets/snorlax.webp", type: "Normal" },
];

export default function App() {
    return (
        <div>
            <h1 className="text-center m-4 font-bold text-5xl">Aplicação de Cartas Pokemon</h1>
            <ListPokemon pokemons={pokemons} />
        </div>
    );
}
