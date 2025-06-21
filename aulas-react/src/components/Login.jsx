import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage("Preencha todos os campos!");
    } else {
      setErrorMessage("");
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg flex flex-col gap-4"
    >
      <h2 className="text-center m-2 font-bold text-xl font-mono">Login</h2>
      <input
        type="text"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="Seu email"
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="Sua senha"
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-600 transition-colors"
      >
        Entrar
      </button>
      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}
      <button
        type="button"
        className="bg-gray-200 text-blue-600 rounded-lg px-4 py-2 font-semibold hover:bg-gray-300 transition-colors"
        onClick={() => navigate("/")}
      >
        Não tem conta? Cadastre-se
      </button>
    </form>
  );
}
