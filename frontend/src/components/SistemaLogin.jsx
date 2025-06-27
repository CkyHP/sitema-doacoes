import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowLeft,
  LogIn
} from "lucide-react";

const EMAIL = "admin@gmail.com";
const SENHA = "12345";

export default function SistemaLogin({ onLogin, onVoltar }) {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (erro) setErro("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setCarregando(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (form.email === EMAIL && form.senha === SENHA) {
      onLogin();
    } else {
      setErro("Email ou senha inválidos");
    }

    setCarregando(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative">
      <div
        className="absolute inset-0 opacity-40 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      <div className="relative w-full max-w-md z-10">
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <LogIn className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bem-vindo
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Acesse com suas credenciais
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Digite seu email"
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-500 transition-all duration-300 text-gray-700 placeholder-gray-500"
              />
            </div>

            <div className="relative">
              <label htmlFor="senha" className="sr-only">
                Senha
              </label>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="senha"
                name="senha"
                type={mostrarSenha ? "text" : "password"}
                autoComplete="current-password"
                value={form.senha}
                onChange={handleChange}
                placeholder="Digite sua senha"
                required
                className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-500 transition-all duration-300 text-gray-700 placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                title={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {mostrarSenha ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {erro && (
              <div
                role="alert"
                className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-fade-in"
              >
                {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 rounded-2xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {carregando ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Entrando...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <LogIn className="w-5 h-5" />
                  <span>Entrar</span>
                </div>
              )}
            </button>

            {onVoltar && (
              <button
                type="button"
                onClick={onVoltar}
                className="w-full bg-gray-100/90 text-gray-700 font-semibold py-4 rounded-2xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300/20 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <div className="flex items-center justify-center space-x-2">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Voltar</span>
                </div>
              </button>
            )}
          </form>

          <div className="mt-8 p-4 bg-blue-50/60 rounded-xl border border-blue-100 text-blue-600 text-sm">
            <p className="font-medium mb-1">Credenciais de demonstração:</p>
            <p>Email: <span className="font-mono">admin@gmail.com</span></p>
            <p>Senha: <span className="font-mono">12345</span></p>
          </div>
        </div>

        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-20 blur-xl"></div>
      </div>
    </div>
  );
}
