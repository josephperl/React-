// Importa o CSS específico deste componente
import "./index.css";

// props é um objeto que contém tudo que foi passado para o componente:
//   props.title    → o atributo title="..." definido em App.jsx
//   props.children → o conteúdo colocado entre <Note>...</Note> em App.jsx
export default function Note(props) {
  return (
    // className no JSX equivale ao atributo class do HTML
    <div className="card">
      {/* Exibe o título recebido via props — as chaves {} executam JavaScript dentro do JSX */}
      <h3 className="card-title">{props.title}</h3>

      {/* Exibe o conteúdo filho passado entre as tags <Note>...</Note> */}
      <div className="card-content">{props.children}</div>
    </div>
  );
}
