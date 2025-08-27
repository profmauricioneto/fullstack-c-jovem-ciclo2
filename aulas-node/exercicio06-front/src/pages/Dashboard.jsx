import { Link } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'

const Dashboard = () => {
  const { user } = useAuthStore()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Bem-vindo, {user?.nome}!
        </h1>
        <p className="text-gray-600 mb-6">
          Este é o seu painel de controle. Aqui você pode gerenciar seus produtos.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/products"
            className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg text-center transition-colors"
          >
            <h3 className="text-xl font-bold mb-2">Ver Produtos</h3>
            <p>Visualize todos os seus produtos cadastrados</p>
          </Link>
          
          <Link
            to="/products/create"
            className="bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg text-center transition-colors"
          >
            <h3 className="text-xl font-bold mb-2">Novo Produto</h3>
            <p>Cadastre um novo produto no sistema</p>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Informações do Usuário</h2>
        <div className="space-y-2">
          <p><strong>ID:</strong> {user?.id}</p>
          <p><strong>Nome:</strong> {user?.nome}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Criado em:</strong> {user?.createdAt && new Date(user.createdAt).toLocaleDateString('pt-BR')}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard