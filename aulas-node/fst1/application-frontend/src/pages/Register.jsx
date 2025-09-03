import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ nome: "", email: "", senha: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.senha.length < 6) {
      setError("A senha deve ter no mínimo 6 dígitos");
      return;
    }

    // TODO: fazer o envio dos dados via AXIOS
    // const response = await axios.post()
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl text-gray-700 text-center font-bold mb-6 mt-6">
            Cadastro
          </h2>

          {error && (
            <div className="bg-red-100 text-red-800 border-red-400 rounded py-2 px-3">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Nome
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:ring-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:ring-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Senha
              </label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:ring-2"
                required
              />
              <p className="text-sm text-gray-700 mb-2">
                mínimo de 6 caracteres
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white font-bold py-2 px-3 rounded hover:bg-green-600 transition-colors"
            >
              Cadastrar
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-700">
              Já tem conta?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-600">
                Faça o Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
