import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />

                <Routes>
                    <Route path='/cadastro' element={<Register />}/>
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;