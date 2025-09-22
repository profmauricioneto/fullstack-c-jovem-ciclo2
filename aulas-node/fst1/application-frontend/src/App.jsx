import React, { useEffect } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import useAuthStore from "./stores/useAuthStore";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import ProtectedRoutes from "./components/ProtectedRoutes";

const App = () => {

  const {initialize} = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize])

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/cadastro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to={"/dashboard"} replace/>} />
          <Route 
              path="/dashboard" 
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
          <Route 
            path="/produtos" 
            element={
              <ProtectedRoutes>
                <Products/>
              </ProtectedRoutes>
              }
            />
          <Route 
            path="/produtos/criar" 
            element={
              <ProtectedRoutes>
                <CreateProduct/>
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
