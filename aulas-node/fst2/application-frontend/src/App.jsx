import React, { useEffect } from 'react';
import { BrowserRouter, Link, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import useAuthStore from './stores/useAuthStore';
import Products from './pages/Products';
import CreateProduct from './pages/CreateProduct';
import Loader from './components/Loader';
import ProtectedRoutes from './components/ProtectedRoutes';

const App = () => {

    const { initialize, isLoading } = useAuthStore();

    useEffect(()=> {
        initialize()
    }, [initialize])

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <BrowserRouter>
                <Navbar />

                <Routes>
                    <Route path='/cadastro' element={<Register />}/>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<Navigate to='/dashboard' replace/>} />
                    <Route 
                        path='/dashboard' 
                        element={
                        <ProtectedRoutes>
                            <Dashboard />
                        </ProtectedRoutes>
                        }/>
                    <Route 
                        path='/produtos' 
                        element={
                        <ProtectedRoutes>
                            <Products />
                        </ProtectedRoutes>}/>
                    <Route 
                        path='/produtos/criar' 
                        element={
                        <ProtectedRoutes>
                            <CreateProduct />
                        </ProtectedRoutes>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;