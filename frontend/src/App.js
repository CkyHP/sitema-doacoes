import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AdicionarAlimento from './components/AdicionarAlimento';
import FazerDoacao from './components/FazerDoacao';
import ListaNecessarios from './components/ListaNecessarios';
import SistemaLogin from './components/SistemaLogin';
import HomePage from './components/HomePage';

function App() {
  const [autenticado, setAutenticado] = useState(() => {
     return localStorage.getItem('autenticado') === 'true';
  });
  

  const [mostrarLogin, setMostrarLogin] = useState(false);

  function handleIrParaLogin() {
    setMostrarLogin(true);
  }

  function handleLogin() {
    setAutenticado(true);
    setMostrarLogin(false);
  }

  function handleLogout() {
    setAutenticado(false);
    setMostrarLogin(false);
  }

  React.useEffect(() => {
    localStorage.setItem('autenticado', autenticado ? 'true' : 'false');
  }, [autenticado]);

  return (
    <Router>
      {autenticado && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            !autenticado && !mostrarLogin ? (
              <ListaNecessarios
                onIrParaLogin={handleIrParaLogin}
                autenticado={autenticado}
              />
            ) : !autenticado && mostrarLogin ? (
              <SistemaLogin onLogin={handleLogin} onVoltar={() => setMostrarLogin(false)} />
            ) : (
              <ListaNecessarios />
            )
          }
        />
        {autenticado && (
          <>
            <Route path="/adicionar" element={<AdicionarAlimento />} />
            <Route path="/doar" element={<FazerDoacao />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;