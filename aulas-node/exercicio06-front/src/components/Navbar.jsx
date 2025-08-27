import { Link, useNavigate } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-white text-xl font-bold">
            Sistema de Produtos
          </Link>
          
          {isAuthenticated() ? (
            <div className="flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className="text-white hover:text-blue-200 transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                to="/products" 
                className="text-white hover:text-blue-200 transition-colors"
              >
                Produtos
              </Link>
              <span className="text-white">Olá, {user?.nome}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link 
                to="/login" 
                className="text-white hover:text-blue-200 transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
              >
                Registrar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar