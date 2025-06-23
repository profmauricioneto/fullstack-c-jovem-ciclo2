import React from 'react';
import CardPokemon from './CardPokemon';
import './ListPokemon.modules.css';

const ListPokemon = ({ pokemons }) => {
    return (
        <div className='pokemon-list'>
            {pokemons.map((pokemon, index) => (
                <CardPokemon
                    key={index}
                    name={pokemon.name}
                    url={pokemon.url}
                    type={pokemon.type}
                /> 
            ))}
        </div>
    );
}

export default ListPokemon;