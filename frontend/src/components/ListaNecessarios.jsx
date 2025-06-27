import React, { useEffect, useState } from 'react';

export default function ListaNecessarios({ onIrParaLogin }) {
  const [alimentos, setAlimentos] = useState([]);


  const tipoParaIcone = {
  grão: "🌾",
  doce: "🍬",
  massa: "🍝",
  farinha: "🥖",
  bebida: "🥛",
  tempero: "🧂",
  oleo: "🛢️",
  molho: "🍅",
  biscoito: "🍪",
  higiene: "🧼",
  limpeza: "🧽",
  enlatado: "🥫",
  condimento: "🧴",
  carne: "🍗",
  outro: "🛍️",

};

  useEffect(() => {
    fetch('http://localhost:8000/alimento/necessarios/')
      .then(res => res.json())
      .then(setAlimentos);
  }, []);

  const alimentosNecessarios = alimentos.filter(a => a.quantidade_necessaria > a.quantidade_disponivel);
  

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Alimentos Necessários</h2>
      <ul className="space-y-4">
        {alimentosNecessarios.length === 0 && (
          <li className="text-center text-slate-500">Nenhum alimento necessário no momento.</li>
        )}
        {alimentosNecessarios.map(a => (
          <li
            key={a.id}
            className="flex justify-between items-center bg-slate-100 rounded p-4 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                {tipoParaIcone[a.tipo] || "🛒"}
              </span>
              <span className="font-semibold text-slate-800">{a.nome} ({a.unidade})</span>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <span className="text-xs text-slate-600 mb-1">Necessário</span>
                <div className="w-20 h-20 flex items-center justify-center bg-orange-100 rounded-lg">
                  <span className="text-3xl font-bold text-orange-500">{a.quantidade_necessaria}</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-slate-600 mb-1">Disponível</span>
                <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-lg">
                  <span className="text-3xl font-bold text-green-500">{a.quantidade_disponivel}</span>
                </div>
              </div>
            </div>
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
