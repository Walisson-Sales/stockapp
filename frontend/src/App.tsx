import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login-teste'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import { useState } from 'react'
import './App.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <Router>
      <Routes>
        {/* Página de login */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        {/* Dashboard protegido */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Redireciona raiz para login ou dashboard */}
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />

        {/* Profile protegido */}
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />

        {/* Rota coringa para páginas inexistentes */}
        <Route
          path="*"
          element={<h1>Página não encontrada</h1>}
        />
      </Routes>
    </Router>
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
