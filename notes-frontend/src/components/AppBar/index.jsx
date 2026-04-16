import "./index.css";

// Barra de navegação fixa no topo da página
// Não recebe props — é sempre igual em todas as telas
export default function AppBar() {
    return (
        <div className="appbar">
            <img src="/logo-getit.png" className="logo" />
            <span className="subtitle">Como o Post-it, mas com outro verbo</span>
        </div>
    );
}
