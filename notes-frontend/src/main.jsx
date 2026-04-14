// Importa o modo estrito do React (ajuda a detectar problemas no código)
import { StrictMode } from 'react'

// Importa a função que cria a "raiz" do React no HTML
import { createRoot } from 'react-dom/client'

// Importa o CSS global (fontes, cores, estilos base)
import './index.css'

// Importa o componente principal da aplicação
import App from './App.jsx'

// Pega o elemento <div id="root"> do index.html e manda o React renderizar
// o <App /> dentro dele — é aqui que o React "toma conta" da página
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
