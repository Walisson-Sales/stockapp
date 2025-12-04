import { useState, type ReactNode } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

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
  // inicializa o estado do usuário a partir do localStorage
  const [user, setUser] = useState<any>(() => {
    try {
      const stored = localStorage.getItem("user");
      // Também verifica se existe um token válido (opcional, mas recomendado)
      const token = localStorage.getItem("token");
      if (stored && token) {
          return JSON.parse(stored);
      }
      return null;
    } catch (e) {
      return null;
    }
  });

  // handlers para login/logout vindos dos componentes
  const handleLogin = (u: any) => {
    setUser(u);
    // O token já deve ter sido salvo pelo componente de Login no localStorage
    localStorage.setItem("user", JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Remove também o token
  };

  // Componente para proteger rotas
  const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    if (!user) {
      // Se não estiver logado, redireciona para o login
      return <Navigate to="/login" replace />;
    }
    // Se estiver logado, renderiza o conteúdo da rota
    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>StockApp</h1>
        </header>

        <nav style={{ display: "flex", gap: 8, margin: "16px 0" }}>
          {/* Links visíveis apenas se logado */}
          {user && (
            <>
              <Link to="/">Dashboard</Link>
              <Link to="/produtos">Produtos</Link>
              <Link to="/categorias">Categorias</Link>
              <Link to="/movimentacoes">Movimentações</Link>
            </>
          )}

          {/* Links visíveis apenas se NÃO logado */}
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/register">Cadastro</Link>}
          {!user && <Link to="/recover">Recuperar Senha</Link>}

          {/* Links visíveis apenas se logado */}
          {user && <Link to="/profile">Perfil</Link>}
          {user && (
            <button style={{ marginLeft: 8 }} onClick={handleLogout}>Sair</button>
          )}
        </nav>

        <main>
          <Routes>
            {/* Rotas Protegidas */}
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/produtos" element={
              <ProtectedRoute>
                <ProdutosPage />
              </ProtectedRoute>
            } />
            <Route path="/produtos/:id" element={
              <ProtectedRoute>
                <ProdutoDetalhesPage />
              </ProtectedRoute>
            } />
            <Route path="/categorias" element={
              <ProtectedRoute>
                <CategoriasPage />
              </ProtectedRoute>
            } />
            <Route path="/movimentacoes" element={
              <ProtectedRoute>
                <MovementsLog />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            } />

            {/* Rotas Públicas */}
            <Route path="/login" element={
                // Se já estiver logado, redireciona para o dashboard
                user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
            } />
            <Route path="/register" element={
                user ? <Navigate to="/" replace /> : <Register onRegistered={() => { /* opcional: redirecionar */ }} />
            } />
            <Route path="/recover" element={
                user ? <Navigate to="/" replace /> : <PasswordRecovery />
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;