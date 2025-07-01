import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUserName(value);
    }
    if (name === "password") {
      setSenha(value);
    }
    if (name === "email") {
      setEmail(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!userName || !email || !senha) {
      setError("Algum campo obrigatório esta vazio.");
    } else {
      console.log("User Data:", { userName, email, senha });
      setUserName("");
      setSenha("");
      setEmail("");
      setError("");
      navigate('/login');
    }
  };

  return (
    <form 
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg flex flex-col gap-4 p-8 mt-10 mx-auto max-w-md"
        >
      <h2 className="text-center m-2 font-bold text-xl font-mono"
      >Cadastro do Usuário</h2>
      <input
        type="text"
        name="username"
        value={userName}
        onChange={handleChange}
        placeholder="full name"
        className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="user@email.com"
        className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        name="password"
        value={senha}
        onChange={handleChange}
        placeholder="strong password"
        className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button 
        type="submit"
        className="text-white bg-blue-500 text-center rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors cursor-pointer font-bold"
        >Cadastrar</button>
      
      {error && <p className="text-center text-red-700">{error}</p>}

      <button
        type="button"
        className=" bg-gray-200 text-blue-600 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-400 transition-colors"
        onClick={() => navigate('/login')}
      >Já tem conta? faça seu login aqui!</button>
    </form>
  );
}
