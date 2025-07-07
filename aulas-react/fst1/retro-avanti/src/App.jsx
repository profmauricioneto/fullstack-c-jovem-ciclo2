import React from 'react';
import Column from './components/Column';

export default function App() {
    return (
        <>
        <div className='flex'>
            <Column titleColumn='O que foi bom?'/>
            <Column titleColumn='O que foi ruim?'/>
            <Column titleColumn='O que pode melhorar?'/>
        </div>

        </>
    );
}