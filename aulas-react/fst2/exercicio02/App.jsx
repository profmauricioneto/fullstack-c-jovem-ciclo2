import React, { Fragment } from 'react';
import Cadastro from './Cadastro';
import Login from './Login';
import { Route, Routes } from 'react-router-dom';

export default function App() {
    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<Cadastro />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </Fragment>
    );
}