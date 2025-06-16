import { Fragment } from 'react';
import FirstComponent from './components/FirstComponent';
import Greeting from './components/Greeting';
import CalculateBirthYear from './components/CalculateBirthYear';

export default function App () {
    return(
        <Fragment>
            <FirstComponent/>
            <Greeting name='Maurício Neto'/>
            <CalculateBirthYear age={1990}/>
        </Fragment>
    );
}