// ─────────────────────────────────────────────
// Formulario/index.jsx — componente do formulário de criação
// Exibe os campos de título e conteúdo e um botão para criar a nota
// Ao criar, envia os dados para a API e pede para App atualizar a lista
// ─────────────────────────────────────────────

import axios from "axios";
import { useState } from "react";
import "./index.css";

// função JS que representa o formulário de criação
// recebe props do App:
//   props.loadNotes = função carregaNotas do App — chamada após criar uma nota
export default function Formulario(props) {

  // titulo: valor atual do campo de título (começa vazio)
  // setTitulo: função que atualiza titulo
  // cada vez que o usuário digita uma letra, setTitulo é chamado e React re-renderiza o input
  const [titulo, setTitulo] = useState("");

  // mesmo esquema para o campo de conteúdo
  const [content, setContent] = useState("");

  // função JS chamada quando o usuário submete o formulário (clica em "Criar")
  const criarNote = (event) => {

    // event é o objeto do evento de submit gerado pelo browser
    // event.preventDefault() cancela o comportamento padrão do HTML
    // sem isso, o browser tentaria enviar o form e recarregaria a página
    event.preventDefault();

    // monta o objeto com os dados que serão enviados no corpo da requisição POST
    // as chaves "title" e "content" precisam bater com o que a API Django espera receber
    const data = {
      "title": titulo,   // valor atual do estado titulo
      "content": content // valor atual do estado content
    }

    axios
      .post("http://localhost:8000/notes/", data)
      // faz POST na API Django enviando o objeto data no corpo da requisição
      // Django cria a nota no banco de dados e responde com os dados da nota criada

      .then((response) => {
        // .then() recebe uma função que roda quando Django confirmar a criação
        // response contém os dados da nota criada, mas não precisamos usar aqui

        props.loadNotes();
        // chama carregaNotas do App — busca a lista atualizada na API
        // isso faz o novo cartão aparecer na tela sem recarregar a página

        setTitulo("");
        // reseta o estado titulo para string vazia
        // como o input tem value={titulo}, ele visualmente limpa o campo

        setContent("");
        // mesmo para o textarea
      })
      .catch((error) => console.log(error));
  }

  return (
    // onSubmit={criarNote} — quando o form for submetido, chama a função criarNote
    // o submit acontece quando o botão type="submit" é clicado
    <form className="form-card" onSubmit={criarNote}>

      <input
        className="form-card-title"
        type="text"
        placeholder="Título"
        value={titulo}
        // value={titulo} faz o input ser "controlado" pelo React
        // o valor exibido no campo sempre reflete o estado titulo
        // isso é necessário para poder limpar o campo com setTitulo("")
        onChange={(event) => setTitulo(event.target.value)}
        // onChange dispara a cada tecla pressionada
        // event.target é o próprio input
        // event.target.value é o texto atual do campo
        // setTitulo() atualiza o estado com esse texto
        // React re-renderiza o input com o novo valor
      />

      <textarea
        className="autoresize"
        placeholder="Digite o conteúdo..."
        value={content}       // mesmo esquema do input acima
        onChange={(event) => setContent(event.target.value)}
      ></textarea>

      {/* type="submit" faz esse botão disparar o evento onSubmit do form ao ser clicado */}
      <button className="btn" type="submit">Criar</button>
    </form>
  );
}
