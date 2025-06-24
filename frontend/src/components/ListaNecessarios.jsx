import React, { useEffect, useState } from 'react';

export default function ListaNecessarios({ onIrParaLogin }) {
  const [alimentos, setAlimentos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/alimento/necessarios/')
      .then(res => res.json())
      .then(setAlimentos);
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Alimentos Necessários</h2>
      <ul className="space-y-4">
        {alimentos.length === 0 && (
          <li className="text-center text-slate-500">Nenhum alimento necessário no momento.</li>
        )}
        {alimentos.map(a => (
          <li
            key={a.id}
            className="flex justify-between items-center bg-slate-100 rounded p-4 shadow-sm"
          >
            <span className="font-semibold text-slate-800">{a.nome}</span>
            <span className="text-sm text-slate-600">
              Necessário: <span className="font-bold text-orange-500">{a.quantidade_necessaria}</span> | Disponível: <span className="font-bold text-green-500">{a.quantidade_disponivel}</span>
            </span>
          </li>
        ))}
      </ul>
      {onIrParaLogin && (
        <button
          onClick={onIrParaLogin}
          className="mt-8 w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Entrar no sistema
        </button>
      )}
    </div>
  );
}