import React, { useState } from 'react';

const EMAIL = "admin@gmail.com";
const SENHA = "12345";

export default function SistemaLogin({ onLogin, onVoltar }) {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.email === EMAIL && form.senha === SENHA) {
      onLogin();
    } else {
      setErro('Email ou senha inválidos');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow max-w-xs w-full">
        <h2 className="text-2xl font-bold text-blue-500 mb-6 text-center">Login do Sistema</h2>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-2 mb-4 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <input
          name="senha"
          type="password"
          value={form.senha}
          onChange={handleChange}
          placeholder="Senha"
          required
          className="w-full p-2 mb-4 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {erro && <div className="text-red-500 text-sm mb-2">{erro}</div>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-colors mb-2"
        >
          Entrar
        </button>
        {onVoltar && (
          <button
            type="button"
            onClick={onVoltar}
            className="w-full bg-slate-200 text-blue-500 font-semibold py-2 rounded hover:bg-blue-100 transition-colors"
          >
            Voltar para a lista
          </button>
        )}
      </form>
    </div>
  );
}