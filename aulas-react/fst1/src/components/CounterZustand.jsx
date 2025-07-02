import React, { Fragment } from 'react';
import { useCounter } from '../hooks/useCounter';

export default function CounterZustand() {

    const counter = useCounter((state) => state.counter);
    const increment = useCounter((state) => state.increment);
    const decrement = useCounter((state) => state.decrement);

    return(
        <Fragment>
            <h1>Contagem: {counter}</h1>

            <button 
                onClick={() => increment()}
                className="m-2 text-white bg-green-700 text-center rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors cursor-pointer font-bold"    
            >Increment</button>
            <button 
                onClick={() => decrement()}
                className="m-2 text-white bg-red-700 text-center rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors cursor-pointer font-bold" 
            >Decrement</button>
        </Fragment>
    );
}