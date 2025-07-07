import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// import Login from './components/Login'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
