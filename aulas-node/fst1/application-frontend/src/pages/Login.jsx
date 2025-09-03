import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", senha: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (formData.senha.length < 6) {
        setError('A senha deve ter no mínimo 6 dígitos');
        return;
    }

    // TODO: fazer o envio dos dados via AXIOS
    // const response = await axios.post()

  }

  const handleChange = (event) => {
    setFormData({
        ...formData,
        [event.target.name]: event.target.value
    })
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl text-gray-700 text-center font-bold mb-6 mt-6">
            Login
          </h2>

          {error && <div className="bg-red-100 text-red-800 border-red-400 rounded py-2 px-3">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-blue-500 focus:ring-2 mb-2"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white font-bold py-2 px-3 rounded hover:bg-green-600 transition-colors"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-700">Não tem conta?{' '}
            <Link 
                to="/cadastro"
                className='text-blue-500 hover:text-blue-600'
            >Registre-se</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
