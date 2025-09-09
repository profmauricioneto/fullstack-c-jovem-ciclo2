import React from "react";
import useAuthStore from "../stores/useAuthStore";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuthStore();

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-700 mb-3">
            Bem vindo Sr(a). {user.nome}
          </h1>
          <p className="text-gray-700">Este é seu painel de controle.</p>
        </div>

        <div className="text-gray-700 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            // to={}
            className="bg-blue-500 hover:bg-blue-400 text-white rounded-lg p-6 text-center transition-colors"
          >
            <h3 className="font-bold text-xl mb-2">Ver os produtos</h3>
            <p>Visualizar os produtos cadastrados</p>
          </Link>

          <Link
            // to={}
            className="bg-blue-500 hover:bg-blue-400 text-white rounded-lg p-6 text-center transition-colors"
          >
            <h3 className="font-bold text-xl mb-2">Adicionar o Produto</h3>
            <p>Cadastre um novo produto</p>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-bold text-gray-700 mb-3">
            Informações do Usuário
          </h2>
          <div className="space-y-3">
            <p>ID: {user.id}</p>
            <p>Nome: {user.nome}</p>
            <p>Email: {user.email}</p>
            <p>
              Criando em:{" "}
              {user?.createdAt &&
                new Date(user.createdAt).toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
