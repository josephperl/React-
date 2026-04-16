# React-
O QUE É REACT?
-React é uma biblioteca JavaScript para construir interfaces.
-Você divide a tela em componentes (pedaços reutilizáveis) e o React decide o que atualizar quando os dados mudam — sem recarregar a página.
// você descreve como quer que apareça:
exemplo:
function Note(props) {
  return <div>{props.title}</div>
}

// e reutiliza quantas vezes quiser
<Note title="Miojo" />
<Note title="Banana" />

ACESSO DO PROJETO:
Acesse `http://localhost:5173` no navegador.

ESTRUTURA DO PROJETO

notes-frontend/
├── index.html      # HTML base com o <div id="root"> que o React preenche
├── src/
│   ├── main.jsx  # Ponto de entrada: injeta o <App /> no #root ( "liga o REACT")
│   ├── App.jsx  # raiz: define as notas e renderiza os cartões (tem os dados)("constrói com REACT)
│   ├── index.css   # Estilos globais (cores, fontes, layout dos cards)
│   └── components/
│       └── Note/
│           ├── index.jsx       # Componente de cartão: recebe title e children via props
│           └── index.css       # Estilos específicos do componente Note
\```

COMO FUNCIONA:

1- O navegador carrega o `index.html`
2- O `main.jsx` inicializa o React e renderiza o `<App />` dentro do `<div id="root">`
3- O `App.jsx` possui um array de notas (com `id`, `title` e `content`) e usa `.map()` para renderizar um componente `<Note>` para cada item
4- Cada `<Note>` recebe o título via prop `title` e o conteúdo como `children`, exibindo um cartão colorido na tela

FLUXO:

index.html
    │
    │  carrega
    ▼
main.jsx  ← LIGA O REACT
    │        (createRoot().render() injeta tudo no <div id="root">)
    │
    ├── importa → index.css        (estilos globais)
    │
    │  passa o controle para
    ▼
App.jsx  ← CONSTRÓI A INTERFACE COM O REACT
    │       (define os dados e quais componentes aparecem na tela)
    │
    ├── importa → App.css          (estilos do app)
    │
    │  para cada nota do array, renderiza
    ▼
components/Note/index.jsx  ← COMPONENTE REUTILIZÁVEL
    │                         (recebe props e desenha cada cartão)
    │
    └── importa → components/Note/index.css   (estilos do cartão)


COMANDOS JS:
const → variável que não muda
function → bloco de código reutilizável
export default → disponibiliza o arquivo pra outros importarem
import → traz código de outro arquivo
props → dados passados para um componente
.map() → percorre um array e transforma cada item
{} no JSX → executa JavaScript dentro do HTML
=> → forma curta de escrever uma função