import React, { useEffect } from 'react';
import { BrowserRouter, Link, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import useAuthStore from './stores/useAuthStore';
import Products from './pages/Products';

const App = () => {

    const { initialize } = useAuthStore();

    useEffect(()=> {
        initialize()
    }, [initialize])

    return (
        <>
            <BrowserRouter>
                <Navbar />

                <Routes>
                    <Route path='/cadastro' element={<Register />}/>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Navigate to={'/dashboard'} replace />} />
                    <Route path='/dashboard' element={<Dashboard />}/>
                    <Route path='/produtos' element={<Products />}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;