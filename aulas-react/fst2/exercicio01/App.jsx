import React from "react";
import ListPokemon from "./ListPokemon";

const pokemons = [
  { name: "Charizard", url: "/assets/charizard.webp", type: "Fire" },
  { name: "Pikachu", url: "/assets/pikachu.png", type: "Electric" },
  { name: "Squirtle", url: "/assets/squirtle.png", type: "Water" },
  { name: "Snorlax", url: "/assets/snorlax.webp", type: "Normal" },
];

export default function App() {
    return (
        <div>
            <h1>Aplicação de Cartas Pokemon</h1>
            <ListPokemon pokemons={pokemons} />
        </div>
    );
}
