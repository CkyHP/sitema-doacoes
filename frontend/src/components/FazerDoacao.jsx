import React, { useState, useEffect } from 'react';

export default function FazerDoacao() {
  const [doador, setDoador] = useState({ nome: '', telefone: '', is_membro: false });
  const [doacao, setDoacao] = useState({ alimento: '', quantidade: 0, descricao: '', data: '' });
  const [alimentos, setAlimentos] = useState([]);
  const [doadorId, setDoadorId] = useState(null);
  const [doadores, setDoadores] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/alimento/')
      .then(res => res.json())
      .then(setAlimentos);

    fetch('http://localhost:8000/doador/')
      .then(res => res.json())
      .then(setDoadores);
  }, []);

  function handleEscolherDoador(e) {
    const id = e.target.value;
    if (!id) return;
    const escolhido = doadores.find(d => String(d.id) === id);
    setDoadorId(escolhido.id);
    setDoador({ nome: escolhido.nome, telefone: escolhido.telefone || '', is_membro: escolhido.is_membro || false });
  }

  async function handleDoador(e) {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/doador/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doador)
    });
    const data = await res.json();
    setDoadorId(data.id);
  }

  async function handleDoacao(e) {
    e.preventDefault();
    await fetch('http://localhost:8000/doacao/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...doacao, doador: doadorId, quantidade: Number(doacao.quantidade) })
    });
    alert('Doação realizada!');
    setDoadorId(null);
    setDoacao({ alimento: '', quantidade: 0, descricao: '', data: '' });
    setDoador({ nome: '', telefone: '', is_membro: false });
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Fazer Doação</h2>
      {!doadorId ? (
        <>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-slate-700">Escolher doador já cadastrado:</label>
            <select
              className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={handleEscolherDoador}
              defaultValue=""
            >
              <option value="">Selecione um doador</option>
              {doadores.map(d => (
                <option key={d.id} value={d.id}>{d.nome} {d.telefone ? `- ${d.telefone}` : ''}</option>
              ))}
            </select>
            <div className="text-xs text-slate-500 mt-1">Ou cadastre um novo doador abaixo:</div>
          </div>
          <form onSubmit={handleDoador} className="space-y-4">
            <input
              name="nome"
              value={doador.nome}
              onChange={e => setDoador({ ...doador, nome: e.target.value })}
              placeholder="Nome"
              required
              className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              name="telefone"
              value={doador.telefone}
              onChange={e => setDoador({ ...doador, telefone: e.target.value })}
              placeholder="Telefone"
              className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <label className="flex items-center space-x-2 text-slate-700">
              <input
                type="checkbox"
                checked={doador.is_membro}
                onChange={e => setDoador({ ...doador, is_membro: e.target.checked })}
                className="accent-blue-500"
              />
              <span>Membro?</span>
            </label>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Cadastrar Doador
            </button>
          </form>
        </>
      ) : (
        <form onSubmit={handleDoacao} className="space-y-4">
          <select
            name="alimento"
            value={doacao.alimento}
            onChange={e => setDoacao({ ...doacao, alimento: e.target.value })}
            required
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="">Selecione o alimento</option>
            {alimentos.map(a => (
              <option key={a.id} value={a.id}>{a.nome}</option>
            ))}
          </select>
          <input
            name="quantidade"
            type="number"
            value={doacao.quantidade}
            onChange={e => setDoacao({ ...doacao, quantidade: e.target.value })}
            placeholder="Quantidade"
            required
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            name="descricao"
            value={doacao.descricao}
            onChange={e => setDoacao({ ...doacao, descricao: e.target.value })}
            placeholder="Descrição"
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            name="data"
            type="date"
            value={doacao.data}
            onChange={e => setDoacao({ ...doacao, data: e.target.value })}
            required
            className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Fazer Doação
          </button>
        </form>
      )}
    </div>
  );
}