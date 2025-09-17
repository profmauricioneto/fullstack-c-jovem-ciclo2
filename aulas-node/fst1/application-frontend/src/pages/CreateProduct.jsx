import React, { useState } from "react";
import useProductStore from "../stores/useProductStore";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    descricao: "",
  });
  const [error, setError] = useState("");
  const {createProduct, isLoading} = useProductStore();
  const navigate = useNavigate();

// acao para enviar dados
const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const dataProduct = {
        nome: formData.nome,
        preco: parseFloat(formData.preco),
        descricao: formData.descricao
    }

    try {
        const result = await createProduct(dataProduct);

        if (result.success) {
            navigate('/produtos')
        }
    } catch (error) {
        setError('Error ao cadastrar o produto: ' + error)
    }
}

// acao de cancelamento 
const cancelAction = () => {
    if (formData.nome || formData.preco || formData.descricao) {
        if (window.confirm('Tem certeza que deseja descartar os dados do produto?')) {
            navigate('/produtos');
        }
    }
}

// acao para cada entrada
  const handleChange = (event) => {
    setFormData({
        ...formData,
        [event.target.name]: event.target.value
    })
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-3xl font-bold text-gray-700 mb-4 text-center">Novo Produto</h2>

        {error && <div className="bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Nome</label>
            <input 
                type="text" 
                name="nome" 
                value={formData.nome}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Preço</label>
            <input 
                type="number" 
                name="preco"
                min={0}
                step={0.01}
                value={formData.preco}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Descrição</label>
            <textarea 
                name="descricao" 
                rows={5} 
                value={formData.descricao}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          <div className="flex space-x-4">
            <button type="button" className="flex-1 bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition-colors" onClick={cancelAction}>Cancelar</button>

            <button type="submit" disabled={isLoading} className="flex-1 bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition-colors">{isLoading ? 'Adicionando...' : 'Adicionar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
