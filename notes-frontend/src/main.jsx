// ─────────────────────────────────────────────
// main.jsx — ponto de entrada da aplicação
// É o primeiro arquivo JS executado pelo Vite
// Ele liga o React, define as rotas e injeta tudo no HTML
// ─────────────────────────────────────────────

// StrictMode é um componente do React que ativa avisos extras durante o desenvolvimento
// não muda nada visualmente, só ajuda a encontrar problemas no código
import { StrictMode } from 'react'

// createRoot é a função que conecta o React ao HTML
// ela recebe um elemento do HTML e "assume o controle" dele
import { createRoot } from 'react-dom/client'

// createBrowserRouter: função que recebe um array de rotas e cria o roteador
// cada rota é um objeto com { path, element } — "qual URL mostra qual componente"
// RouterProvider: componente que recebe o roteador e decide o que renderizar
// baseado na URL atual do navegador
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css' // CSS global aplicado em toda a aplicação

// importa a função App definida em App.jsx
// essa função é o componente da página principal (lista de notas)
import App from './App.jsx'

// importa duas coisas do arquivo Editar/index.jsx:
// - Editar: a função componente da página de edição (export default)
// - loader: função que busca a nota na API antes de abrir a página (export nomeado)
// "loader as noteLoader" é só um apelido para ficar mais claro
import Editar, { loader as noteLoader } from './components/Editar'

// define a tabela de rotas da aplicação
// é um array de objetos — cada objeto representa uma página
const router = createBrowserRouter([
  {
    path: "/",        // quando a URL for http://localhost:5173/
    element: <App />, // renderiza a função App — mostra a lista de notas
  },
  {
    path: "edit/:noteId",
    // :noteId é uma variável dinâmica na URL
    // ex: se a URL for http://localhost:5173/edit/3, então noteId = "3"
    // esse valor fica disponível como params.noteId dentro do loader
    element: <Editar />,  // renderiza a função Editar — mostra o formulário de edição
    loader: noteLoader,
    // loader é executado ANTES de renderizar Editar
    // o react-router chama noteLoader automaticamente, passando os params da URL
    // só depois que loader terminar (buscar a nota na API), Editar é renderizado
  },
]);

// document.getElementById('root') pega o <div id="root"> do index.html
// createRoot() diz para o React: "você vai controlar esse elemento"
// .render() coloca o conteúdo React dentro desse elemento
// RouterProvider recebe o router criado acima e renderiza o componente certo para a URL atual
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
