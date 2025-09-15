import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-blue-500 shadow-lg">
        <div className="container mx-auto py-4 space-x-4">
          <div className="flex justify-between items-center py-2">
            <Link 
                to={'/'}
                className="text-white text-xl space-x-4 font-bold"
                >Sistema de Produtos</Link>
            {isAuthenticated() ? (
              <div className="flex items-center space-x-4">
                <Link to={"/dashboard"}>Dashboard</Link>

                <Link
                to={'/produtos'}
                >
                  Produtos
                </Link>

                <span className="text-white">Olá Sr(a). {user.name}</span>
                <button 
                    onClick={handleLogout}
                    className="text-white text-sm bg-red-700 px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >Sair</button>
              </div>
            ) : (
              <div>
                <Link
                  to={"/login"}
                  className="text-white text-sm hover:text-blue-200 transition-colors"
                >
                  Login
                </Link>

                <Link
                  to={"/cadastro"}
                  className="text-white text-sm bg-green-700 px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Cadastro
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
