import React from 'react';
import './CardPokemon.modules.css';

const CardPokemon = (props) => {
    return (
        <div className='pokemon-card'>
            <img src={props.url} alt={props.name} className='pokemon-image' />
            <h3 className='pokemon-name'>{props.name}</h3>
            <p className='pokemon-type'>Type: {props.type}</p>
        </div>
    );
}

export default CardPokemon;