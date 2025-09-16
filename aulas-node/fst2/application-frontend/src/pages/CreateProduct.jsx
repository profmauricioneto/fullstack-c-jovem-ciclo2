import React, { useState } from "react";
import useProductStore from "../stores/useProductStore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    descricao: "",
  });

  const { error, createProduct, isLoading, setError } = useProductStore();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    // Validações básicas
    if (!formData.nome.trim()) {
      toast.error("Nome do produto é obrigatório");
      return;
    }

    if (!formData.preco || parseFloat(formData.preco) <= 0) {
      toast.error("Preço deve ser maior que zero");
      return;
    }

    const productData = {
      nome: formData.nome.trim(),
      preco: parseFloat(formData.preco),
      descricao: formData.descricao.trim(),
    };

    // Toast de loading
    const loadingToast = toast.loading("Criando produto...");

    try {
      const response = await createProduct(productData);

      if (response.success) {
        // Dismiss loading e mostrar sucesso
        toast.dismiss(loadingToast);
        toast.success("Produto criado com sucesso! 🎉", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Resetar formulário
        setFormData({
          nome: "",
          preco: "",
          descricao: "",
        });

        // Navegar após um pequeno delay para mostrar o toast
        setTimeout(() => {
          navigate("/produtos");
        }, 1500);
      } else {
        toast.dismiss(loadingToast);
        toast.error(response.error || "Erro ao criar produto");
        setError(response.error);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Erro inesperado ao criar produto");
      console.error("Erro ao criar produto:", error);
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="max-w-lg mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl text-center font-bold text-gray-600">
            Novo Produto
          </h2>

          {error && (
            <div className="bg-red-300 border border-red-500 text-red-700 px-4 py-3 rounded transition-colors">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600 text-sm font-bold mb-2">
                Nome
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-bold mb-2">
                Preco
              </label>
              <input
                type="number"
                name="preco"
                value={formData.preco}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-bold mb-2">
                Descricao
              </label>
              <textarea
                type="text"
                name="descricao"
                rows={4}
                value={formData.descricao}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex space-x-4">
              <button
                className="flex-1 bg-red-500 hover:bg-red-700 rounded-md text-white font-bold px-2 py-1 transition-colors"
                onClick={() => navigate("/produtos")}
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-bold px-2 py-1 transition-colors"
                //   onClick={() => notify}
              >
                {isLoading ? "Criando..." : "Criar Produto"}
              </button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default CreateProduct;
