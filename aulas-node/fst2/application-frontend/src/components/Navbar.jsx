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
      <div className="bg-blue-500 shadow-lg">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center py-2">
            <Link to={"/"} className="text-white text-xl font-bold">
              Sistemas de Produto
            </Link>
            {isAuthenticated() ? (
              <div className="flex items-center space-x-4">
                <Link
                  className="text-white hover:text-blue-200 transition-colors"
                  to={"/dashboard"}
                >
                  Dashboard
                </Link>
                <Link
                  to={"/produtos"}
                  className="text-white hover:text-blue-200 transition-colors"
                >
                  Produtos
                </Link>
                <span className="text-white">Olá, {user.nome}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-400 hover:bg-red-500 text-white rounded px-4 py-2 transition-colors"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to={"/login"}
                  className="text-white hover:text-blue-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to={"/cadastro"}
                  className="text-white bg-green-800 rounded hover:bg-green-700 transition-colors px-4 py-2"
                >
                  Cadastro
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
