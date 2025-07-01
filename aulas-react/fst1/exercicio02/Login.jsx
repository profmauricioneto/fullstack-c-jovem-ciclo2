import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "senha") setSenha(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !senha) {
      setError("Preencha os campos obrigatórios!");
    } else {
      console.log('Data:', {email, senha} );
      setError("");
    }
  };

  return (
    <Fragment>
      <form 
      className="bg-white rounded-xl shadow-lg flex flex-col gap-4 p-8 mt-10 mx-auto max-w-md"
      onSubmit={handleSubmit}>
        <h2
        className="text-center m-2 font-bold text-xl font-mono"
        >Login</h2>
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
          name="senha"
          value={senha}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button type="submit"
        className="text-white bg-blue-500 text-center rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors cursor-pointer font-bold"
        >Entrar</button>

        {error && <p className="text-center text-red-600">({error})</p>}

        <button
        type="button"
        className=" bg-gray-200 text-blue-600 rounded-lg px-4 py-2 cursor-pointer hover:bg-gray-400 transition-colors"
        onClick={() => navigate('/')}
      >Não tem cadastro? faça seu aqui!</button>
      </form>
    </Fragment>
  );
}
