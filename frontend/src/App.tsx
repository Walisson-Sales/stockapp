import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import PasswordRecovery from "./components/passwordRecovery";
import Dashboard from "./components/Dashboard";
import { ProdutosPage } from "./pages/ProdutosPage";
import { ProdutoDetalhesPage } from "./pages/ProdutoDetalhesPage";
import { CategoriasPage } from "./pages/CategoriasPage";
import MovementsLog from "./pages/MovementsLog";

function App() {
  const [user, setUser] = useState<any>(null);

  // tenta recuperar usuário do localStorage ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // handlers para login/logout vindos dos componentes
  const handleLogin = (u: any) => {
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>Meu App</h1>
        </header>

        <nav style={{ display: "flex", gap: 8, margin: "16px 0" }}>
          <Link to="/">Dashboard</Link>
          <Link to="/produtos">Produtos</Link>
          <Link to="/categorias">Categorias</Link>
          <Link to="/movimentacoes">Movimentações</Link>
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/register">Cadastro</Link>}
          <Link to="/recover">Recuperar Senha</Link>
          {user && <Link to="/profile">Perfil</Link>}
          {user && (
            <button style={{ marginLeft: 8 }} onClick={handleLogout}>Sair</button>
          )}
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/produtos" element={<ProdutosPage />} />
            <Route path="/produtos/:id" element={<ProdutoDetalhesPage />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/movimentacoes" element={<MovementsLog />} />

            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register onRegistered={() => { /* opcional: redirecionar */ }} />} />
            <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
            <Route path="/recover" element={<PasswordRecovery />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
