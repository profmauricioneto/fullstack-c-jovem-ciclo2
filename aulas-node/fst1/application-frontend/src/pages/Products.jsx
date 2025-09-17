import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useProductStore from "../stores/useProductStore";
import Loader from "../components/Loader";
import ToastComponent from "../components/ToastComponent";

const Products = () => {
  const {
    error,
    products,
    fetchProducts,
    clearError,
    deleteProduct,
    isLoading,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    return () => clearError();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) {
      return;
    }

    try {
      const result = await deleteProduct(id);

      if (result.success) {
        <ToastComponent message="Produto excluído com sucess." />
      }
    } catch (error) {
      window.alert(error.error);
    }

    if (isLoading) {
      <Loader />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mt-6">
        <h1 className="text-3xl font-bold text-gray-700">Meus Produtos</h1>
        <Link className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded transition-colors" to={'/produtos/criar'}>
          Novo Produto
        </Link>
      </div>
      {error && (
        <div className="bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {products.length === 0 ? (
        // caso não tenha nenhum produto a ser listado.
        <div className="bg-white rounded-lg shadow-lg p-6 text-center mb-4 mt-4">
          <p className="text-gray-700 mb-4">
            Nenhum produto cadastro até momento.
          </p>
          <Link className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded transition-colors" to={'/produtos/criar'}>
            Cadastre seu Primeiro Produto
          </Link>
        </div>
      ) : (
        // possui produtos a serem listados.
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {products.map((product, index) => (
            <div className="bg-white rounded-lg shadow-md p-6 space-y-2" key={index}>
              <h3 className="font-bold text-xl text-gray-600">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-600">R$ {product.price.toFixed(2)}</p>
              {/* criando o botao de apagar */}
              <div className="flex space-x-2">
                <button
                  className="text-white text-sm bg-red-700 px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  onClick={() => handleDelete(product.id)}
                >
                  Excluir
                </button>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p>
                  Criado em:{" "}
                  {new Date(product.createdAt).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
