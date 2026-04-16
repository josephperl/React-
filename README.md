COMO RODAR?

npm install
npm run dev

PROJETO (2 PARTES):

-Frontend (o que você está fazendo) — React
   (É a interface visual. Mostra os cartões, formulário de criar, editar e deletar notas.)

-Backend — Django (já pronto, você só consome)
(É o servidor que salva e busca as notas no banco de dados. O frontend se comunica com ele via axios.)

-COMO SE COMUNICAM?

Frontend (React)          Backend (Django)
      │                         │
      │  GET /notes/            │  → busca todas as notas
      │  POST /notes/           │  → cria uma nota
      │  PUT /notes/1/          │  → edita a nota de id 1
      │  DELETE /notes/1/       │  → deleta a nota de id 1
      └─────────────────────────┘

ESTRUTURA DO PROJETO

notes-frontend/
├── index.html                        # HTML base com o <div id="root"> que o React preenche
├── src/
│   ├── main.jsx                      # Liga o React e define as rotas da aplicação
│   ├── App.jsx                       # Componente raiz: busca as notas da API e renderiza os cartões
│   ├── index.css                     # Estilos globais (cores, fontes, layout dos cards)
│   └── components/
│       ├── AppBar/
│       │   ├── index.jsx             # Barra de navegação do topo
│       │   └── index.css
│       ├── Note/
│       │   ├── index.jsx             # Cartão de nota: exibe título, conteúdo, botão editar e deletar
│       │   └── index.css
│       ├── Formulario/
│       │   ├── index.jsx             # Formulário de criação de notas
│       │   └── index.css
│       └── Editar/
│           ├── index.jsx             # Página de edição de uma nota existente
│           └── index.css


COMO FUNCIONA

-O navegador carrega o index.html
-O main.jsx inicializa o React, define as rotas e renderiza o <App /> no <div id="root">
-O App.jsx busca as notas da API Django via axios e usa .map() para renderizar um <Note> para cada item
-Cada <Note> exibe o cartão com cor e rotação aleatórias, link para editar e botão para deletar
-O <Formulario> envia uma nova nota para a API e atualiza a lista
-Ao clicar em ✏️, o usuário é levado para /edit/:id onde pode editar e salvar a nota


FLUXO

index.html
    │
    │  carrega
    ▼
main.jsx  ← LIGA O REACT E DEFINE AS ROTAS (tipo o urls.py)
    │        (createRoot().render() + react-router-dom)
    │
    ├──  /          →  App.jsx  ← LISTA AS NOTAS
    │                   ├── <AppBar />        (barra do topo)
    │                   ├── <Formulario />    (criar nota)
    │                   └── <Note /> ×N       (cartões)
    │
    └──  /edit/:id  →  Editar.jsx  ← EDITA UMA NOTA
                        ├── loader()   (busca a nota na API)
                        └── salvarNota() (envia PUT e redireciona)

JAVA SCRIPT
-Com JS o usuário interage com ela — clica, digita, envia dados, vê a tela atualizar sem recarregar.
No projeto, JS aparece em 4 lugares:

1- Lógica — variáveis, funções, arrays
const notes = []
function randomInt(min, max) { ... }

2- Dentro do HTML — as chaves {} executam JS no JSX:
<h3>{props.title}</h3>
{notes.map((note) => <Note title={note.title} />)}

3-Eventos — usuário faz algo, JS reage:
onChange={(event) => setTitulo(event.target.value)} // digitou
onClick={deletarNote}                                // clicou
onSubmit={criarNote}                                 // enviou o form

4- API — axios envia e busca dados no Django

axios.get(...)    // busca
axios.post(...)   // cria
axios.put(...)    // edita
axios.delete(...) // deleta
React também é JS — useState, useEffect e props são só funções JavaScript normais.

Todo arquivo .jsx do projeto é um JS(COMPONENTE)
dentro de cada componente temos funoces
(No React é mais comum usar const + => para funções dentro de componentes)


AppBar/index.jsx      → componente JS que desenha a barra do topo
Note/index.jsx        → componente JS que desenha um cartão
Formulario/index.jsx  →  omponente JS que desenha o formulário de criar
Editar/index.jsx      → componente JS que desenha o formulário de editar
App.jsx               → componente JS que junta todos os componentes acima
main.jsx              → JS que liga o React e define as rotas


COMANDOS JS:
const → variável que não muda
function → bloco de código reutilizável
export default → disponibiliza o arquivo pra outros importarem
import → traz código de outro arquivo
props → dados passados para um componente
.map() → percorre um array e transforma cada item
{} no JSX → executa JavaScript dentro do HTML
=> → forma curta de escrever uma função


fluxo dos componentes (IMPORTANTE)
App()
  │
  │  busca notas na API → setNotes(res.data)
  │
  ├── chama AppBar()
  │     └── não recebe props
  │
  ├── chama Formulario()
  │     └── recebe props:
  │           props.loadNotes = carregaNotas
  │
  └── notes.map() → para cada nota chama Note()
        └── recebe props:
              props.key      = "note__1", "note__2"...
              props.title    = note.title   → exibe no <h3>
              props.id       = note.id      → usa na URL do Link e no DELETE
              props.children = note.content → exibe no <div className="card-content">
              props.loadNotes = carregaNotas → chama após deletar


Note()
  │
  ├── useEffect() → sorteia rotation e color
  │
  ├── style = { rotate(rotation), backgroundColor(color) }
  │
  ├── <h3>{props.title}</h3>
  │
  ├── <Link to={`edit/${props.id}`}>        → navega para Editar
  │
  ├── <div>{props.children}</div>
  │
  └── <button onClick={deletarNote}>
            │
            └── axios.delete(/notes/${props.id}/)
                  └── .then() → chama props.loadNotes()
                                    └── volta para carregaNotas no App
                                          └── setNotes() → tela atualiza