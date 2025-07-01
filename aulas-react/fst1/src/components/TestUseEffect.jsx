import React, { useEffect } from 'react';

export default function TestUseEffect() {
    useEffect(() => {
        console.log('Execução durante a renderização');
        return () => {
            console.log('Aplicação indo de arrasta pra cima!');
        }
    }, []);
    
    return (
        <>
            <h1> Testando o UseEffect </h1>
        </>
    )
}