import React, { Fragment } from 'react';
import Cadastro from './Cadastro';
import Login from './Login';
import { Route, Routes } from 'react-router-dom';

export default function AppLogin() {
    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<Cadastro />}></Route>
                <Route path='/login' element={<Login />}></Route>
            </Routes>
        </Fragment>
    );
}