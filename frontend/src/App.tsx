<<<<<<< HEAD
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import PasswordRecovery from "./components/PasswordRecovery";

function App() {
  const [count, setCount] = useState(0);

  // estados para controlar as "páginas" e o usuário autenticado
  const [view, setView] = useState<
    "login" | "register" | "profile" | "recover"
  >("login");
  const [user, setUser] = useState<any>(null);

  // tenta recuperar usuário do localStorage ao iniciar
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
      setView("profile");
    }
  }, []);

  // handlers para login/logout vindos dos componentes
  const handleLogin = (u: any) => {
    setUser(u);
    setView("profile");
  };
  const handleLogout = () => {
    setUser(null);
    setView("login");
  };
=======
// src/App.tsx
// import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CategoriasPage } from './pages/CategoriasPage';
import { ProdutoDetalhesPage } from './pages/ProdutoDetalhesPage';
import { ProdutosPage } from './pages/ProdutosPage';

function App() {
>>>>>>> main
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>Meu App</h1>
          <nav>
            <ul>
              <li><Link to="/">Categorias</Link></li>
              <li><Link to="/produtos">Produtos</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<CategoriasPage />} />
            <Route path="/produtos" element={<ProdutosPage />} />
            <Route path="/produtos/:id" element={<ProdutoDetalhesPage />} />
          </Routes>
        </main>
      </div>
<<<<<<< HEAD
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>

    {/* navegação simples entre páginas */}
      <nav style={{display:'flex',gap:8,margin:'16px 0'}}>
        {!user && <button onClick={()=>setView('login')}>Login</button>}
        {!user && <button onClick={()=>setView('register')}>Cadastro</button>}
        <button onClick={()=>setView('recover')}>Recuperar Senha</button>
        {user && <button onClick={()=>setView('profile')}>Perfil</button>}
      </nav>

      {/* NOVO: área principal que mostra o componente conforme view */}
      <main>
        {view === 'login' && <Login onLogin={handleLogin} />}
        {view === 'register' && <Register onRegistered={() => setView('login')} />}
        {view === 'profile' && <Profile user={user} onLogout={handleLogout} />}
        {view === 'recover' && <PasswordRecovery />}
      </main>
    </>
  );
}

export default App;

// Da aula:
// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import './App.css'
// import Login from './components/Login.tsx'

// function App() {

//   return (
//     <div className="App"><Login /></div>
//   )
// }

// export default App
=======
    </BrowserRouter>
  );
}

export default App;
>>>>>>> main
