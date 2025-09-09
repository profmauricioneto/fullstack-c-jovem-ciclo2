import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [error, setError] = useState("");

  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.senha.length < 6) {
      setError("A senha deve possuir pelo menos 6 dígitos.");
      return;
    }

    const result = await login(formData.email, formData.senha);

    if (result.success) {
      // TODO: encaminhar para a parte interna da aplicação
      navigate('/dashboard');
    } else {
      setError(result.error)
    }
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
          <h2 className="text-2xl text-center font-bold mb-5">Login</h2>

          {error && <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-2 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">

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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus: outline-none focus: ring-2 focus:ring-blue-500 mt-1"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-800 hover:bg-green-700 rounded disabled:bg-gray-700 text-white font-bold rouded py-2 px-4 transition-colors"
            >
              Entrar
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Não tem conta?{' '}
              <Link to={'/cadastro'} className="text-blue-700 hover:text-blue-500">Cadastre-se</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
