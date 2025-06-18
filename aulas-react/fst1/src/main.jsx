import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import FirstComponent from './components/FirstComponent'
import Greeting from './components/Greeting'
import { CalculateBirthYear, Hello } from './components/ManyComponents'
import App from '../App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <h2>Hello From React</h2>
    <FirstComponent/>
    <Greeting name='Maurício Neto'/>
    <Hello name='Maurício'/>
    <CalculateBirthYear age={35} /> */}
  </StrictMode>,
)
