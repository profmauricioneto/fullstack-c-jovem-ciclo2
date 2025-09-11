import React, { useEffect } from "react";
import useProductStore from "../stores/useProductStore";
import { Link } from "react-router-dom";

export default function Products() {
    const { error, products, fetchProduct, deleteProduct } = useProductStore();
    
    useEffect(() => {
        fetchProduct();
    }, []);

    const handleExcluir = async (id) => {
        if (!window.confirm('Tem certeza que quer excluir o produto?')) {
            return;
        }

        const result = await deleteProduct(id);
        
        if (!result.success) {
            window.alert(result.error);
        }
    }

    return(
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-center text-gray-600 pt-4">Meus Produtos</h1>
                <Link className="bg-green-500 hover:bg-green-600 rounded-md text-white font-bold px-4 py-2 transition-colors">
                    Novo Produto
                </Link>
            </div>
                {error && <div className="bg-red-300 border border-red-500 text-red-700 px-4 py-3 rounded transition-colors">{error}</div>}

                {products.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <p className="text-gray-600 m-6">Nenhum produto cadastrado!</p>
                        <Link className="bg-blue-500 hover:bg-blue-400 text-white rounded-lg p-4 text-center transition-colors">Cadastre seu primeiro produto</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <div className="bg-white rounded-lg shadow-lg p-6 text-gray-600 space-y-2"
                            key={product.id}>
                                <h3><strong>Nome:</strong> {product.nome}</h3>
                                <p><strong>Descrição:</strong> {product.descricao}</p>
                                <p><strong>Preço:</strong> {product.preco.toFixed(2)}</p>

                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleExcluir(product.id)}
                                        className="bg-red-500 hover:bg-red-700 rounded-md text-white font-bold px-2 py-1 transition-colors"
                                    >Excluir</button>
                                </div>

                                <div className="text-sm mt-4">
                                    <p><strong>Criado em:</strong> {new Date(product.createdAt).toLocaleDateString('pt-BR')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    )
}