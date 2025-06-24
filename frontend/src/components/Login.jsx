import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow mt-8">
      <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Fazer Doação</h2>
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
        </div>
      )