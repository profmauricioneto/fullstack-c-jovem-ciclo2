import React from "react";
import useAuthStore from "../stores/useAuthStore";
import { Link } from "react-router-dom";

export default function Dashboard () {
    
    const { user } = useAuthStore();
    
    return(
        <>
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h1 className="text-3xl font-bold text-gray-700 mb-4">Bem vindo Sr(a). {user?.name}</h1>
                    <p className="text-gray-700 mb-6">Este é o seu painel de produtos</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Link 
                            className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-center p-4 transition-colors"
                            // to={}
                        >
                            <h3 className="text-xl font-bold mb-2">Ver Produtos</h3>
                            <p>Visualizar os produtos cadastrados</p>
                        </Link>

                        <Link 
                            className="bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-center p-4 transition-colors"
                            // to={}
                        >
                            <h3 className="text-xl font-bold mb-2">Cadastro Produto</h3>
                            <p>Cadastre um novo produto</p>
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-3xl font-bold text-gray-700 mb-4">Informações do Usuário</h2>
                    <div className="space-y-2">
                        <p><strong>ID:</strong> {user?.id}</p>
                        <p><strong>Nome:</strong> {user?.name}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Estado Atual:</strong> {user?.status ? (<span className="font-bold text-green-700">Ativo</span>) : (<span className="font-bold text-red-700">Inativo</span>)}</p>
                        <p><strong>Criado em:</strong> {user?.createdAt && new Date(user?.createdAt).toLocaleDateString('pt-BR')}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

