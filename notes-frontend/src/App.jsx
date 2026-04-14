// Importa o componente Note (cada cartão de anotação)
import Note from "./components/Note";

// Importa o CSS específico do App (atualmente vazio)
import "./App.css";

function App() {
  // Array com os dados das notas — futuramente pode vir de uma API
  const notes = [
    {
      id: 1, // identificador único, usado no atributo key do .map()
      title: "Receita de miojo",
      content:
        "Bata com um martelo antes de abrir o pacote. Misture o tempero, coloque em uma vasilha e aproveite seu snack :)",
    },
    {
      id: 2,
      title: "Sorvete de banana",
      content: "Coloque a banana no congelador e espere.",
    },
  ];

  return (
    // <> </> é um fragmento — agrupa elementos sem criar uma div extra no HTML
    <>
      {/* .map() percorre o array e transforma cada nota em um componente <Note> */}
      {notes.map((note) => (
        // key é obrigatório quando se usa .map() — ajuda o React a identificar
        // qual item mudou, foi adicionado ou removido na lista
        <Note key={`note__${note.id}`} title={note.title}>
          {/* O conteúdo entre as tags vira props.children lá no componente Note */}
          {note.content}
        </Note>
      ))}
    </>
  );
}

export default App;
