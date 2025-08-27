import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useProductStore from '../stores/useProductStore'

const Products = () => {
  const { 
    products, 
    isLoading, 
    error, 
    fetchProducts, 
    deleteProduct,
    clearError 
  } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    // Limpar erro quando componente montar
    return () => clearError()
  }, [clearError])

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) {
      return
    }

    const result = await deleteProduct(id)
    
    if (!result.success) {
      alert(result.error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Meus Produtos</h1>
        <Link
          to="/products/create"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
        >
          Novo Produto
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 mb-4">Nenhum produto cadastrado ainda.</p>
          <Link
            to="/products/create"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Cadastrar Primeiro Produto
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {product.nome || product.name}
              </h3>
              <p className="text-gray-600 mb-2">
                {product.descricao || product.description}
              </p>
              <p className="text-2xl font-bold text-green-600 mb-4">
                R$ {(product.preco || product.price).toFixed(2)}
              </p>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Excluir
                </button>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                <p>Criado em: {new Date(product.createdAt).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Products