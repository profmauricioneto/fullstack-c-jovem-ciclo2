import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useProductStore from "../stores/useProductStore";

const Products = () => {
  const { error, products, fetchProducts, clearError } = useProductStore();

    useEffect(() => {
        fetchProducts();
    },[]);

    useEffect(() => {
        return() => clearError()
    }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mt-6">
        <h1 className="text-3xl font-bold text-gray-700">Meus Produtos</h1>
        <Link
            className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded transition-colors"
        >Novo Produto</Link>
      </div>
      {error && <div
        className="bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
      >{error}</div>}

      {products.length === 0 ? (
        // caso não tenha nenhum produto a ser listado.
        <div className="bg-white rounded-lg shadow-lg p-6 text-center mb-4 mt-4">
          <p className="text-gray-700 mb-4">Nenhum produto cadastro até momento.</p>
          <Link
            className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded transition-colors"
          >Cadastre seu Primeiro Produto</Link>
        </div>
      ) : (
        // possui produtos a serem listados.
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div className="bg-white rounded-lg shadow-md p-6" key={index}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>R$ {product.price.toFixed(2)}</p>
              {/* criando o botao de apagar */}
              <div>
                <button>Excluir</button>
              </div>

              <div>
                <p>Criado em: {new Date(product.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
