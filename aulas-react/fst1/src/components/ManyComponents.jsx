import React, { Fragment } from 'react';

export const Hello = (props) => {<h2>HELLO {props.name}</h2>};

export const CalculateBirthYear = (props) => {
    const currentYear = new Date().getFullYear();
    const age = props.age;
    const birthYear = currentYear - age;

    return(
        <Fragment>
            <h2 className='font-bold p-2 text-xl text-center'>Your age is {age}</h2>
            <h3 className='text-xl p-2 text-center'>Your birth year {birthYear}</h3>
        </Fragment>
    )
}
