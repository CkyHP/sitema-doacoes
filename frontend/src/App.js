import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdicionarAlimento from './components/AdicionarAlimento';
import FazerDoacao from './components/FazerDoacao';
import ListaNecessarios from './components/ListaNecessarios';
import SistemaLogin from './components/SistemaLogin';
import HomePage from './components/HomePage';
import Lista from './components/Lista';

function AppContent() {
  const [autenticado, setAutenticado] = useState(() => {
    return localStorage.getItem('autenticado') === 'true';
  });
  
  const [mostrarLogin, setMostrarLogin] = useState(false);
  const location = useLocation();

  function handleIrParaLogin() {
    setMostrarLogin(true);
  }

  function handleLogin() {
    setAutenticado(true);
    setMostrarLogin(false);
    localStorage.setItem('autenticado', 'true');
  }

  function handleLogout() {
    setAutenticado(false);
    setMostrarLogin(false);
    localStorage.setItem('autenticado', 'false');
  }

  useEffect(() => {
    localStorage.setItem('autenticado', autenticado ? 'true' : 'false');
  }, [autenticado]);

  // Só mostra o Navbar se não estiver na HomePage
  const showNavbar = location.pathname !== '/';

  return (
    <>
      {showNavbar && <Navbar autenticado={autenticado} onLogout={handleLogout} />}
      <Routes>
        {/* Página inicial - agora com funcionalidade de login integrada */}
        <Route 
          path="/" 
          element={
            mostrarLogin ? (
              <SistemaLogin
                onLogin={handleLogin}
                onVoltar={() => setMostrarLogin(false)}
              />
            ) : (
              <HomePage 
                autenticado={autenticado}
                onIrParaLogin={handleIrParaLogin}
                onLogout={handleLogout}
              />
            )
          } 
        />

        {/* Rota para lista - sempre disponível, mas com comportamento diferente */}
        <Route
          path="/lista"
          element={
            !autenticado && !mostrarLogin ? (
              <ListaNecessarios
                onIrParaLogin={handleIrParaLogin}
                autenticado={autenticado}
              />
            ) : !autenticado && mostrarLogin ? (
              <SistemaLogin
                onLogin={handleLogin}
                onVoltar={() => setMostrarLogin(false)}
              />
            ) : (
              <Lista />
            )
          }
        />

        {/* Rotas protegidas - só disponíveis para usuários autenticados */}
        {autenticado && (
          <>
            <Route path="/adicionar" element={<AdicionarAlimento />} />
            <Route path="/doar" element={<FazerDoacao />} />
          </>
        )}
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;