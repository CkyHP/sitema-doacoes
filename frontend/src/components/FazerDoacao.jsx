import React, { useState, useEffect } from 'react';
import { UserPlus, Heart, Calendar, Package, User, Phone, Users } from 'lucide-react';

export default function FazerDoacao() {
  const [doador, setDoador] = useState({ nome: '', telefone: '', is_membro: false });
  const [doacao, setDoacao] = useState({ alimento: '', quantidade: 0, descricao: '', data: '' });
  const [alimentos, setAlimentos] = useState([]);
  const [doadorId, setDoadorId] = useState(null);
  const [doadores, setDoadores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('http://localhost:8000/alimento/').then(res => res.json()),
      fetch('http://localhost:8000/doador/').then(res => res.json())
    ]).then(([alimentosData, doadoresData]) => {
      setAlimentos(alimentosData || []);
      setDoadores(doadoresData || []);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  function handleEscolherDoador(e) {
    const id = e.target.value;
    if (!id) return;
    const escolhido = doadores.find(d => String(d.id) === id);
    setDoadorId(escolhido.id);
    setDoador({ nome: escolhido.nome, telefone: escolhido.telefone || '', is_membro: escolhido.is_membro || false });
    setStep(2);
  }

  async function handleDoador(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/doador/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doador)
      });
      const data = await res.json();
      setDoadorId(data.id);
      setStep(2);
    } catch (error) {
      alert('Erro ao cadastrar doador');
    } finally {
      setLoading(false);
    }
  }

  async function handleDoacao(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('http://localhost:8000/doacao/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...doacao, doador: doadorId, quantidade: Number(doacao.quantidade) })
      });
      
      alert('🎉 Doação realizada com sucesso! Obrigado por sua generosidade!');
      
      
      setDoadorId(null);
      setDoacao({ alimento: '', quantidade: 0, descricao: '', data: '' });
      setDoador({ nome: '', telefone: '', is_membro: false });
      setStep(1);
      
    } catch (error) {
      alert('Erro ao realizar doação');
    } finally {
      setLoading(false);
    }
  }

  function voltarStep() {
    setStep(1);
    setDoadorId(null);
  }

  if (loading && step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">Carregando dados...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
  
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Fazer Doação
          </h1>
          <p className="text-gray-600">Sua generosidade faz a diferença na vida de muitas pessoas</p>
        </div>

       
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${step >= 1 ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>
              <User className="w-5 h-5" />
            </div>
            <div className={`h-1 w-16 transition-all duration-300 ${step >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${step >= 2 ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>
              <Package className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm">
          {step === 1 ? (
            <>
          
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <User className="w-6 h-6 mr-2 text-blue-500" />
                  Identificação do Doador
                </h2>
                
             
                <div className="mb-8">
                  <label className="block mb-3 font-semibold text-gray-700 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    Escolher doador já cadastrado:
                  </label>
                  <select
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                    onChange={handleEscolherDoador}
                    defaultValue=""
                  >
                    <option value="">Selecione um doador existente</option>
                    {doadores.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.nome} {d.telefone ? `- ${d.telefone}` : ''} {d.is_membro ? '(Membro)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

               
                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">ou cadastre um novo doador</span>
                  </div>
                </div>

              
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Nome completo *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          name="nome"
                          value={doador.nome}
                          onChange={e => setDoador({ ...doador, nome: e.target.value })}
                          placeholder="Digite o nome completo"
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Telefone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          name="telefone"
                          value={doador.telefone}
                          onChange={e => setDoador({ ...doador, telefone: e.target.value })}
                          placeholder="(00) 00000-0000"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <input
                      type="checkbox"
                      id="membro"
                      checked={doador.is_membro}
                      onChange={e => setDoador({ ...doador, is_membro: e.target.checked })}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="membro" className="ml-3 font-medium text-gray-700 cursor-pointer">
                      É membro da organização?
                    </label>
                  </div>

                  <button
                    onClick={handleDoador}
                    disabled={loading || !doador.nome.trim()}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:transform-none shadow-lg"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>{loading ? 'Cadastrando...' : 'Cadastrar e Continuar'}</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
          
              <div className="mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <Package className="w-6 h-6 mr-2 text-green-500" />
                    Detalhes da Doação
                  </h2>
                  <button
                    onClick={voltarStep}
                    className="text-blue-500 hover:text-blue-700 font-medium text-sm px-4 py-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                  >
                    ← Voltar
                  </button>
                </div>

               
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Doador Selecionado:
                  </h3>
                  <p className="text-green-700 text-lg">
                    <strong>{doador.nome}</strong>
                    {doador.telefone && ` - ${doador.telefone}`}
                    {doador.is_membro && ' (Membro)'}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Alimento *</label>
                      <select
                        name="alimento"
                        value={doacao.alimento}
                        onChange={e => setDoacao({ ...doacao, alimento: e.target.value })}
                        required
                        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      >
                        <option value="">Selecione o alimento</option>
                        {alimentos.map(a => (
                          <option key={a.id} value={a.id}>{a.nome}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Quantidade *</label>
                      <input
                        name="quantidade"
                        type="number"
                        value={doacao.quantidade}
                        onChange={e => setDoacao({ ...doacao, quantidade: e.target.value })}
                        placeholder="Ex: 10"
                        min="1"
                        required
                        className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Data da doação *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        name="data"
                        type="date"
                        value={doacao.data}
                        onChange={e => setDoacao({ ...doacao, data: e.target.value })}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Descrição adicional</label>
                    <textarea
                      name="descricao"
                      value={doacao.descricao}
                      onChange={e => setDoacao({ ...doacao, descricao: e.target.value })}
                      placeholder="Informações adicionais sobre a doação..."
                      rows="3"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleDoacao}
                    disabled={loading || !doacao.alimento || !doacao.quantidade || !doacao.data}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 disabled:transform-none shadow-lg"
                  >
                    <Heart className="w-5 h-5" />
                    <span>{loading ? 'Processando...' : 'Confirmar Doação'}</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

      
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Cada doação conta e faz a diferença! 💚</p>
        </div>
      </div>
    </div>
  );
}