import { Fragment } from 'react';
// import FirstComponent from './components/FirstComponent';
// import Greeting from './components/Greeting';
// import CalculateBirthYear from './components/CalculateBirthYear';
import Cadastro from './components/Cadastro';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';

export default function App () {
    return(
        <Fragment>
            {/* <FirstComponent/>
            <Greeting name='Maurício Neto'/>
            <CalculateBirthYear age={1990}/> */}
            <Routes>
                <Route path='/' element = {< Cadastro />} />
                <Route path='/login' element = {< Login />} />
            </Routes>
        </Fragment>
    );
}