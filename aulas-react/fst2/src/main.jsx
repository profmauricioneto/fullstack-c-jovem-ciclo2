import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from '../exercicio02/App'
import { BrowserRouter } from 'react-router-dom'
import ClickZustand from './components/ClickZustand'
// import ListaTarefas from './components/ListaTarefas'
// import GetPostsFromAPI from './components/GetPostsFromAPI'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* <App /> */}
      {/* <GetPostsFromAPI /> */}
      {/* <ListaTarefas /> */}
      <ClickZustand />
    </BrowserRouter>
  </StrictMode>,
)
