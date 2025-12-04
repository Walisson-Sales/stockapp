// src/App.tsx
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CategoriasPage } from './pages/CategoriasPage';
import { ProdutoDetalhesPage } from './pages/ProdutoDetalhesPage';
import { ProdutosPage } from './pages/ProdutosPage';

function App() {
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
    </BrowserRouter>
  );
}

export default App;