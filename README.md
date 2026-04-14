# React-
\```bash
npm install
npm run dev
\```

Acesse `http://localhost:5173` no navegador.

ESTRUTURA DO PROJETO

notes-frontend/
├── index.html                  # HTML base com o <div id="root"> que o React preenche
├── src/
│   ├── main.jsx                # Ponto de entrada: injeta o <App /> no #root
│   ├── App.jsx                 # Componente raiz: define as notas e renderiza os cartões
│   ├── index.css               # Estilos globais (cores, fontes, layout dos cards)
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

TECNOLOGIAS:

-> [React](https://react.dev/) — biblioteca para construção de interfaces
-> [Vite](https://vitejs.dev/) — ferramenta de build e servidor de desenvolvimento
-> [Google Fonts](https://fonts.google.com/) — fontes Roboto e Permanent Marke


FLUXO:

index.html
    │
    │  carrega
    ▼
main.jsx
    │
    ├── importa → index.css        (estilos globais)
    │
    │  renderiza dentro do <div id="root">
    ▼
App.jsx
    │
    ├── importa → App.css          (estilos do app)
    │
    │  para cada nota do array, renderiza
    ▼
components/Note/index.jsx
    │
    └── importa → components/Note/index.css   (estilos do cartão)