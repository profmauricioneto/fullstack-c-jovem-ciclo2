import { Fragment } from 'react';

const CalculateBirthYear = (props) => {
    const age = props.age;
    const todayYear = new Date().getFullYear();
    const birthYear = todayYear - age;

    return (
        <Fragment>
            <h2>Your age is {age}</h2>
            <h2>Your birth year is {birthYear}</h2>
        </Fragment>
    );
}

export default CalculateBirthYear;