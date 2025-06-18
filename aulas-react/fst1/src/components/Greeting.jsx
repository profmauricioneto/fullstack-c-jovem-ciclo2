import React from 'react';

const Greeting = (props) => {
    return(
        <div>
            <h2>Hello Mr(s) {props.name}</h2>
            <p>This is my first component with props</p>
        </div>
    )
}

// props = {name: 'mauricio neto'}

export default Greeting;