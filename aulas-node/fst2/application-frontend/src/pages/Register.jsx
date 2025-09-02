import React, { useState } from "react";
// import {useNavigate} from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({ nome: "", email: "", senha: "" });
  const [error, setError] = useState("");

  // const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.senha.length < 6) {
      setError("A senha deve possuir pelo menos 6 dígitos.");
      return;
    }

    // const result = await register(formData.nome, formData.email, formData.senha);

    // if (result.success) {
    //     // MUDAR PARA TELA LOGIN
    //     navigate('/');
    // } else {
    //     setError(result.error)
    // }
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
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl text-center font-bold mb-5">Cadastro</h2>

          {error && <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-2 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm font-bold mb-2">
                Nome
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-none focus: ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-none focus: ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-bold mb-2">
                Senha
              </label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-none focus: ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-sm text-gray-400 mt-1">
                Mínimo de 6 caracteres
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-700 disabled:bg-gray-700 text-white font-bold rouded py-2 px-4 transition-colors"
            >
              Cadastrar
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Já tem conta?
              {/* COLOCAR LINK PARA LOGIN */}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
