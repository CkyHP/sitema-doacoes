import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowLeft, LogIn } from 'lucide-react';

const EMAIL = "admin@gmail.com";
const SENHA = "12345";

export default function SistemaLogin({ onLogin, onVoltar }) {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (erro) setErro(''); // Limpa erro quando usuário digita
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setCarregando(true);
    
   
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (form.email === EMAIL && form.senha === SENHA) {
      onLogin();
    } else {
      setErro('Email ou senha inválidos');
    }
    setCarregando(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="relative w-full max-w-md">
       
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white/20">
         
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <LogIn className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bem-vindo
            </h2>
            <p className="text-gray-500 mt-2">Entre com suas credenciais</p>
          </div>

          <div className="space-y-6">
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Digite seu email"
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-700 placeholder-gray-400"
              />
            </div>

          
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="senha"
                type={mostrarSenha ? "text" : "password"}
                value={form.senha}
                onChange={handleChange}
                placeholder="Digite sua senha"
                required
                className="w-full pl-12 pr-12 py-4 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-700 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {mostrarSenha ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

          
            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm animate-pulse">
                {erro}
              </div>
            )}

        
            <button
              onClick={handleSubmit}
              disabled={carregando}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-4 rounded-2xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
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
                className="w-full bg-gray-100/80 text-gray-600 font-semibold py-4 rounded-2xl hover:bg-gray-200/80 focus:outline-none focus:ring-2 focus:ring-gray-300/20 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <div className="flex items-center justify-center space-x-2">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Voltar para a lista</span>
                </div>
              </button>
            )}
          </div>

         
          <div className="mt-8 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-600 font-medium mb-2">Credenciais de demonstração:</p>
            <p className="text-xs text-blue-500">Email: admin@gmail.com</p>
            <p className="text-xs text-blue-500">Senha: 12345</p>
          </div>
        </div>

      
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-20 blur-xl"></div>
      </div>
    </div>
  );
}