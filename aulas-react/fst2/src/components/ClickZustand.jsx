import React from 'react';
import { useCounter } from '../hooks/useCounter';

export default function ClickZustand() {
    
    const count = useCounter((state)=> state.count);
    const increment = useCounter((state)=> state.increment);
    const decrement = useCounter((state)=> state.decrement);
    
    return (
        <>
            <h1 className='py-2 m-2 font-bold text-xl'>Contagem do Elemento: {count}</h1>

            <button 
                className='m-2 bg-blue-500 text-white text-center rounded-lg px-3 py-2 hover:bg-blue-700 transition-colors cursor-pointer font-semibold' 
                onClick={() => increment()}>Incremento</button>
            <button 
                className='m-2 bg-blue-500 text-white text-center rounded-lg px-3 py-2 hover:bg-blue-700 transition-colors cursor-pointer font-semibold'
                onClick={() => decrement()}
                >Decremento</button>
        </>
    )
}