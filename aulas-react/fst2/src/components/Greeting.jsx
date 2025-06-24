import React, { Fragment } from 'react';

export default function Greeting(props) {
    return (
        <Fragment>         
            <h2>Hello Mr(s) {props.name}</h2>
            <p>This is my component with properties</p>
        </Fragment>
    );
}

// props = {name: 'Maurício Neto'}