import React, { Fragment, useState } from 'react';

export default function CounterClick() {
    
    const [counter, setCounter] = useState(0);

    return(
        <Fragment>
            <h1>Aprendendo a usar o useState</h1>
            <h2>Quantidade de clicks: {counter}</h2>
            <button
                className='border rounded-lg bg-blue-400 font-bold p-3 text-white hover:bg-blue-600'
                onClick={()=>{
                    console.log(counter);
                    setCounter(counter + 1)
                }}
            >Clique aqui</button>
        </Fragment>
    )
}