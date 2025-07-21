import React, { useEffect, useRef } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuthStore } from './hooks/useAuthStore';
import Login from './components/Login';
import Register from './components/Register';
import MainPage from "./components/MainPage";

const App = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const hasShownWelcome = useRef(false);

    useEffect(() => {
        if (isAuthenticated && !hasShownWelcome.current) {
            toast.success("Login realizado com sucesso! 🎉", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            hasShownWelcome.current = true;
        }
        
        // Reset quando o usuário faz logout
        if (!isAuthenticated) {
            hasShownWelcome.current = false;
        }
    }, [isAuthenticated]);

    return (
        <Routes>
            <Route 
                path="/login" 
                element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} 
            />
            <Route 
                path="/register" 
                element={!isAuthenticated ? <Register /> : <Navigate to="/" replace />} 
            />
            <Route 
                path="/" 
                element={isAuthenticated ? <MainPage /> : <Navigate to="/login" replace />} 
            />
            <Route 
                path="*" 
                element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} 
            />
        </Routes>
    );
}

export default App;