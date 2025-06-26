import React from 'react';
import CardPokemon from './CardPokemon';
import './ListPokemon.modules.css'

export default function ListPokemon({ pokemons }) {
    return (
        <div className='list-pokemon'>
            {pokemons.map((item, index) => (
                <CardPokemon 
                    key={index}
                    pokemonName = {item.name}
                    url = {item.url}
                    type = {item.type}
                />
            ))}
        </div>
    )
}