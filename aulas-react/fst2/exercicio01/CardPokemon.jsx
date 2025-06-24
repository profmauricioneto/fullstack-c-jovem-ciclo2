import React from 'react'
import './CardPokemon.css'

const CardPokemon = (props) => {
    return (
        <div className='pokemon-card'>
            <img src={props.url} alt={props.pokemonName} />
            <h3>{props.pokemonName}</h3>
            <p>Type: {props.type}</p>
        </div>
    );
}

export default CardPokemon;

// props = {pokemonName: '...', url: '...', type: '...'}