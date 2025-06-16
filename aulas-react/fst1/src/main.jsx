import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FirstComponent from './components/FirstComponent'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h2>Hello From React</h2>
    <FirstComponent/>
  </StrictMode>,
)
