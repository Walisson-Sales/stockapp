import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProdutosPage } from './pages/ProdutosPage';
import { ProdutoDetalhesPage } from './pages/ProdutoDetalhesPage';
import { CategoriasPage } from './pages/CategoriasPage';
import { MainLayout } from './components/MainLayout';
import { NotificationProvider } from './contexts/NotificationContext';
import './App.css'

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/produtos" />} />
            <Route path="/produtos" element={<ProdutosPage />} />
            <Route path="/produtos/:id" element={<ProdutoDetalhesPage />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/movimentacoes" element={<div>Página de Movimentações</div>} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </NotificationProvider>
  )
}

export default App


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
