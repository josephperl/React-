// ─────────────────────────────────────────────
// App.jsx — componente raiz da página principal
// É a função que monta a tela de listagem de notas
// Ela busca as notas na API e passa os dados para os componentes filhos
// ─────────────────────────────────────────────

// axios é uma biblioteca JS para fazer requisições HTTP (GET, POST, PUT, DELETE)
// sem ela teríamos que usar o fetch nativo do browser, que é mais verboso
import axios from "axios";

// useEffect e useState são funções do React para gerenciar estado e efeitos colaterais
import { useEffect, useState } from "react";

// importa os componentes filhos — cada um é uma função JS definida em seu próprio arquivo
import Note from "./components/Note";
import AppBar from "./components/AppBar";
import Formulario from "./components/Formulario";
import "./App.css";

// função JS que representa a página principal
// quando o react-router detecta a URL "/", ele chama essa função
// ela retorna o HTML que será exibido na tela
function App() {

  // useState([]) cria um "estado reativo" (Estado reativo — muda o valor e atualiza a tela)
  // notes: variável que guarda o array de notas atual — começa vazio
  // setNotes: função que atualiza notes — quando chamada, o React re-renderiza o componente
  // ou seja: toda vez que setNotes for chamado, App() é executada novamente com os novos dados
  const [notes, setNotes] = useState([]);

  // carregaNotas é uma função JS definida dentro de App
  // ela faz GET na API Django para buscar todas as notas
  // depois chama setNotes com o resultado, o que faz a tela atualizar
  const carregaNotas = () => {
    axios
      .get("http://localhost:8000/notes/")  // requisição GET para a API Django
      .then((res) => setNotes(res.data));   // res.data é o array de notas retornado pelo Django
                                            // setNotes salva esse array no estado notes
                                            // React detecta a mudança e re-renderiza App()
  }

  // useEffect é uma função do React que executa um efeito colateral
  // recebe dois argumentos:
  //   1. uma função com o código a executar
  //   2. um array de dependências — [] significa "execute só uma vez, quando App aparecer na tela"
  // sem o [], rodaria toda vez que qualquer estado mudasse (causaria loop infinito aqui)
  useEffect(() => {
    carregaNotas(); // chama a função que busca as notas na API assim que a página abre
  }, []);

  // return define o JSX (HTML+JS) que App vai renderizar na tela
  return (
    // <> </> é um fragmento — agrupa elementos sem criar uma div extra no HTML
    <>
      {/* chama a função AppBar — ela retorna a barra amarela do topo */}
      <AppBar />

      <main className="container">

        {/* chama a função Formulario
            loadNotes={carregaNotas} passa a função carregaNotas como prop
            dentro de Formulario, ela fica disponível como props.loadNotes
            isso permite que Formulario atualize a lista de notas após criar uma nova */}
        <Formulario loadNotes={carregaNotas} />

        <div className="card-container">

          
          {/* notes.map() é uma função JS de array
              percorre cada item do array notes e executa a função passada como argumento
              para cada nota, retorna um componente <Note> com os dados da nota
              o resultado é um array de componentes Note que o React renderiza na tela */}
          {notes.map((note) => (
            <Note
              key={`note__${note.id}`}
              // key é obrigatório quando se usa .map() no React
              // precisa ser único entre os irmãos — React usa para saber qual item mudou
              // sem key, React não consegue otimizar a re-renderização e dá warning

              title={note.title}
              // passa o título da nota como prop
              // dentro de Note fica disponível como props.title

              id={note.id}
              // passa o id da nota como prop
              // Note usa para montar a URL de edição e para deletar

              loadNotes={carregaNotas}
              // passa a função carregaNotas como prop
              // Note usa para atualizar a lista após deletar um cartão
            >
              {note.content}
              {/* conteúdo entre as tags — dentro de Note fica como props.children */}
            </Note>
          ))}
        </div>
      </main>
    </>
  );
}

// exporta a função App para que main.jsx possa importar e usar
export default App;
