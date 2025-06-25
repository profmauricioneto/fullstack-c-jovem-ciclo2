import React, { Fragment, useState } from 'react';

export default function CounterClick () {

    let [contador, setContador] = useState(0);

    return (
        <Fragment>
            <h2>Quantidade cliques realizados: {contador}</h2>
            <button className='border-2 bg-blue-500 border-black p-2 rounded-md'
                onClick={() => {
                    setContador(contador + 1)
                    console.log(contador);
                }}
                >Clique-me</button>
        </Fragment>
    )
}