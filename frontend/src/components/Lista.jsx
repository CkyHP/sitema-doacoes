import React, { useEffect, useState } from 'react';

export default function Lista() {
  const [alimentos, setAlimentos] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('');
  const [filtroSituacao, setFiltroSituacao] = useState(''); // novo filtro

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
    fetch('http://localhost:8000/alimento/')
      .then(res => res.json())
      .then(setAlimentos);
  }, []);

  // Filtros e ordenação
  let alimentosFiltrados = alimentos;
  if (filtroTipo) {
    alimentosFiltrados = alimentosFiltrados.filter(a => a.tipo === filtroTipo);
  }
  if (filtroSituacao === 'necessidade') {
    alimentosFiltrados = alimentosFiltrados.filter(a => a.quantidade_necessaria > a.quantidade_disponivel);
  } else if (filtroSituacao === 'garantido') {
    alimentosFiltrados = alimentosFiltrados.filter(a => a.quantidade_disponivel >= a.quantidade_necessaria && a.quantidade_necessaria > 0);
  }
  if (ordenarPor === 'necessidade') {
    alimentosFiltrados = [...alimentosFiltrados].sort((a, b) => (b.quantidade_necessaria - b.quantidade_disponivel) - (a.quantidade_necessaria - a.quantidade_disponivel));
  } else if (ordenarPor === 'disponibilidade') {
    alimentosFiltrados = [...alimentosFiltrados].sort((a, b) => b.quantidade_disponivel - a.quantidade_disponivel);
  } else if (ordenarPor === 'tipo') {
    alimentosFiltrados = [...alimentosFiltrados].sort((a, b) => a.tipo.localeCompare(b.tipo));
  }

  // Lista de tipos únicos para o filtro
  const tiposUnicos = Array.from(new Set(alimentos.map(a => a.tipo))).filter(Boolean);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Lista de Alimentos</h2>

      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <select
          value={filtroTipo}
          onChange={e => setFiltroTipo(e.target.value)}
          className="border border-slate-300 rounded px-3 py-2"
        >
          <option value="">Todos os tipos</option>
          {tiposUnicos.map(tipo => (
            <option key={tipo} value={tipo}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>
          ))}
        </select>
        <button
          className={`px-3 py-2 rounded border ${ordenarPor === 'necessidade' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
          onClick={() => setOrdenarPor(ordenarPor === 'necessidade' ? '' : 'necessidade')}
        >
          Ordenar por Necessidade
        </button>
        <button
          className={`px-3 py-2 rounded border ${ordenarPor === 'disponibilidade' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
          onClick={() => setOrdenarPor(ordenarPor === 'disponibilidade' ? '' : 'disponibilidade')}
        >
          Ordenar por Disponibilidade
        </button>
        <button
          className={`px-3 py-2 rounded border ${ordenarPor === 'tipo' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border-blue-500'}`}
          onClick={() => setOrdenarPor(ordenarPor === 'tipo' ? '' : 'tipo')}
        >
          Ordenar por Tipo
        </button>
        <button
          className={`px-3 py-2 rounded border ${filtroSituacao === 'necessidade' ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border-orange-500'}`}
          onClick={() => setFiltroSituacao(filtroSituacao === 'necessidade' ? '' : 'necessidade')}
        >
          Só com Necessidade
        </button>
        <button
          className={`px-3 py-2 rounded border ${filtroSituacao === 'garantido' ? 'bg-green-500 text-white' : 'bg-white text-green-500 border-green-500'}`}
          onClick={() => setFiltroSituacao(filtroSituacao === 'garantido' ? '' : 'garantido')}
        >
          Só Garantidos
        </button>
        {(filtroTipo || filtroSituacao) && (
          <button
            className="ml-2 px-3 py-2 rounded bg-gray-200 text-gray-700"
            onClick={() => { setFiltroTipo(''); setFiltroSituacao(''); }}
          >
            Limpar Filtros
          </button>
        )}
      </div>

      <ul className="space-y-4">
        {alimentosFiltrados.length === 0 && (
          <li className="text-center text-slate-500">Nenhum alimento cadastrado no momento.</li>
        )}
        {alimentosFiltrados.map(a => (
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
    </div>
  );
}