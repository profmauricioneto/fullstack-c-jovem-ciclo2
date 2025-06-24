import React from 'react';

export function Hello(props) {
    return (<h2>Hello {props.name}</h2>)
}


export function CalculateBirthYear (props) {
    const userAge = props.age;
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - userAge;

    return(
        <>
            <h2>Your age is {userAge}</h2>
            <h3>Your birth year is  {birthYear} </h3>
        </>
    )
}