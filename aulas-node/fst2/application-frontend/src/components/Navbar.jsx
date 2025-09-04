import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="bg-blue-500 shadow-lg">
        <div className="container mx-auto px-4 py-4 font-bold space-x-4">
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
      </div>
    </>
  );
};

export default Navbar;
