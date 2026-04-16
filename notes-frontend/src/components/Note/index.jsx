// ─────────────────────────────────────────────
// Note/index.jsx — componente de cartão de nota
// Representa um único cartão na tela
// Recebe os dados da nota via props e exibe com cor e rotação aleatórias
// ─────────────────────────────────────────────

import axios from "axios";

// Link é um componente do react-router que funciona como <a href>
// mas troca a URL sem recarregar a página — React intercepta o clique
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import "./index.css";

// array com as cores possíveis para os cartões
// cada cartão sorteia uma cor desse array quando aparece na tela
const colors = ["#ead3a7", "#9de0f5", "#ef89ba", "#fae890", "#abe9c1"];

// função JS comum — não é um componente React, só uma utilidade
// gera um número inteiro aleatório entre min e max (ambos incluídos)
// Math.ceil arredonda min para cima, Math.floor arredonda max para baixo
// a fórmula garante distribuição uniforme incluindo os extremos
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// função JS que representa um cartão de nota
// props é o objeto que contém todos os argumentos passados pelo App:
//   props.title     = título da nota
//   props.id        = id da nota no banco de dados
//   props.children  = conteúdo da nota (passado entre as tags <Note>...</Note>)
//   props.loadNotes = função carregaNotas do App para atualizar a lista
export default function Note(props) {

  // rotation: guarda os graus de rotação do cartão (começa em 0)
  // setRotation: função que atualiza rotation
  const [rotation, setRotation] = useState(0);

  // color: guarda a cor de fundo do cartão (começa vazio)
  // setColor: função que atualiza color
  const [color, setColor] = useState("");

  // useEffect com [] roda uma única vez quando o cartão aparece na tela
  // sorteia valores aleatórios para rotation e color
  // por isso cada cartão tem rotação e cor diferentes
  useEffect(() => {
    setRotation(randomInt(-5, 5));
    // randomInt(-5, 5) retorna um número entre -5 e 5
    // ex: -3 significa que o cartão vai girar 3 graus para a esquerda

    setColor(colors[randomInt(0, colors.length - 1)]);
    // colors.length - 1 = 4 (último índice do array)
    // randomInt(0, 4) retorna um índice aleatório: 0, 1, 2, 3 ou 4
    // colors[índice] pega a cor correspondente
  }, []);

  // objeto JS de estilo — aplicado diretamente na div via style={style}
  // React aceita estilo inline como objeto JS
  // diferença do CSS: propriedades usam camelCase (backgroundColor, não background-color)
  const style = {
    transform: `rotate(${rotation}deg)`, // ex: rotate(-3deg) — gira o cartão
    backgroundColor: color,              // ex: #fae890 — cor de fundo sorteada
  };

  // função JS chamada quando o usuário clica no botão "Deletar"
  const deletarNote = () => {
    axios
      .delete(`http://localhost:8000/notes/${props.id}/`)
      // faz DELETE na API Django passando o id da nota na URL
      // ex: se props.id = 3, a URL fica: http://localhost:8000/notes/3/

      .then(() => props.loadNotes())
      // .then() recebe uma função que roda quando Django confirmar a deleção
      // chama props.loadNotes() que é a função carregaNotas do App
      // isso faz App buscar a lista atualizada e re-renderizar sem o cartão deletado

      .catch((error) => console.log(error));
      // .catch() roda se der algum erro na requisição
      // console.log imprime o erro no console do navegador (F12)
  }

  return (
    // style={style} aplica o objeto de estilo na div — rotação e cor
    <div className="card" style={style}>

      {/* props.title é o título passado pelo App — ex: "Receita de miojo" */}
      <h3 className="card-title">{props.title}</h3> 

      {/* Link é como um <a>, mas não recarrega a página
          to={`edit/${props.id}`} monta a URL dinamicamente
          ex: se props.id = 3, to="edit/3"
          ao clicar, o react-router troca a URL e renderiza o componente Editar */}
      <Link to={`edit/${props.id}`}>✏️</Link>

      {/* props.children é o conteúdo passado entre as tags <Note>...</Note> no App
          ex: "Bata com um martelo antes de abrir o pacote..." */}
      <div className="card-content">{props.children}</div>

      {/* onClick={deletarNote} — quando clicado, chama a função deletarNote definida acima
          não usa () depois de deletarNote — se usasse, chamaria na hora de renderizar
          sem (), passa a referência da função para o React chamar quando o botão for clicado */}
      <button className="btn" onClick={deletarNote}>🗑️</button>
    </div>
  );
}
