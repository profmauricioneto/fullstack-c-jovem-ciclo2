import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import FirstComponent from './components/FirstComponents'
// import Greeting from './components/Greeting'
// import {Hello, CalculateBirthYear} from './components/ManyComponents'
import App from '../exercicio01/App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Hello name="Maurício Neto" />
    <CalculateBirthYear age={35} />
    <Greeting name="Maurício Neto"/>
    <FirstComponent />
    <h1>Hello World from React!</h1> */}
  </StrictMode>,
)
