// ─────────────────────────────────────────────
// Editar/index.jsx — componente da página de edição
// Abre quando o usuário clica em ✏️ em um cartão
// Busca os dados da nota na API, preenche o formulário e salva as alterações
// ─────────────────────────────────────────────

import axios from "axios";

// useLoaderData: função do react-router que acessa o retorno da função loader
// useNavigate: função do react-router que retorna uma função para trocar de rota via código
import { useLoaderData, useNavigate } from "react-router-dom";

import { useState } from "react";
import AppBar from "../AppBar";
import "./index.css";

// loader é uma função JS exportada separadamente (não é o componente principal)
// o react-router a chama AUTOMATICAMENTE antes de renderizar o componente Editar
// isso garante que os dados da nota estejam disponíveis quando Editar for renderizado
//
// async: marca a função como assíncrona — ela pode usar await dentro
// { params }: desestruturação — pega params de dentro do objeto de argumentos
// params.noteId: variável capturada da URL — ex: URL "edit/3" → params.noteId = "3"
export async function loader({ params }) {
  const note = await axios
    .get(`http://localhost:8000/notes/${params.noteId}/`)
    // await faz o código esperar a API responder antes de continuar
    // sem await, note seria uma Promise (promessa de valor futuro), não o valor em si

    .then((response) => response.data)
    // response é o objeto de resposta do axios
    // response.data é só os dados retornados pela API (a nota em si)

  return { note };
  // retorna um objeto com a nota
  // esse objeto fica disponível dentro do componente Editar via useLoaderData()
}

// função JS que representa a página de edição
// é chamada pelo react-router quando a URL bate com "edit/:noteId"
// só é chamada DEPOIS que loader() terminar
export default function Editar() {

  // useNavigate retorna uma função chamada navigate
  // chamar navigate("/") troca a URL para "/" sem recarregar a página
  // o react-router detecta e renderiza o componente App no lugar de Editar
  const navigate = useNavigate();

  // useLoaderData() retorna o objeto { note } que loader() retornou
  // desestruturação: const { note } = ... é o mesmo que: const note = resultado.note
  const { note } = useLoaderData();

  // estados inicializados com os valores atuais da nota
  // por isso o formulário já abre preenchido com o título e conteúdo existentes
  // se o usuário não mudar nada e salvar, os mesmos valores são enviados de volta
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  // função JS chamada quando o usuário submete o formulário (clica em "Salvar")
  const salvarNota = (event) => {
    event.preventDefault(); // cancela o comportamento padrão do HTML (recarregar a página)

    const data = {
      "title": title,
      "content": content
    }

    axios
      .put(`http://localhost:8000/notes/${note.id}/`, data)
      // PUT substitui todos os dados da nota pelo objeto data
      // diferente de PATCH que atualiza só os campos enviados
      // note.id vem dos dados carregados pelo loader

      .then(() => navigate("/"))
      // quando Django confirmar a atualização, chama navigate("/")
      // isso troca a URL para "/" e o react-router renderiza App() no lugar de Editar
      // App() busca as notas atualizadas e o cartão editado aparece com os novos dados

      .catch((error) => console.log(error));
  }

  return (
    <>
      {/* chama a função AppBar — mesma barra do topo da página principal */}
      <AppBar />
      <main className="container">

        {/* onSubmit={salvarNota} — ao submeter o form, chama salvarNota */}
        <form className="form-card" onSubmit={salvarNota}>

          <input
            className="form-card-title"
            type="text"
            value={title}
            // value={title} controla o campo com o estado
            // começa com note.title (título atual da nota)
            // atualiza conforme o usuário digita via onChange
            onChange={(event) => setTitle(event.target.value)}
          />

          <textarea
            className="autoresize"
            value={content}  // começa com note.content (conteúdo atual da nota)
            onChange={(event) => setContent(event.target.value)}
          ></textarea>

          <button className="btn" type="submit">Salvar</button>
        </form>
      </main>
    </>
  );
}
