import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Mensagem enviada após a renderização");

    return () => {
      console.log("Componente acabando...");
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setName(value);
    }
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage("Error! Some field are empty");
    } else {
      console.log("Data: ", { name, email, password });
      setName("");
      setEmail("");
      setPassword("");
      setErrorMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg flex flex-col gap-4"
    >
      <h2 className="text-center m-2 font-bold text-xl font-mono">
        Formulário de Cadastro
      </h2>
      <input
        type="text"
        name="username"
        value={name}
        onChange={handleChange}
        placeholder="your name"
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="your email"
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        placeholder="your password"
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}

      <button
        type="button"
        className="bg-gray-200 text-blue-600 rounded-lg px-4 py-2 font-semibold hover:bg-gray-300 transition-colors"
        onClick={() => navigate("/login")}
      >
        Já tem conta? Faça login
      </button>
    </form>
  );
}
