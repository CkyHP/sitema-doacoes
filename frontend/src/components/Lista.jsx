import React, { useEffect, useState } from 'react';
import { Search, Filter, X, Package, AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Grid3X3 } from 'lucide-react';

export default function Lista() {
  const [alimentos, setAlimentos] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [ordenarPor, setOrdenarPor] = useState('');
  const [filtroSituacao, setFiltroSituacao] = useState('');
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    setLoading(true);
    fetch('http://localhost:8000/alimento/')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar dados');
        return res.json();
      })
      .then(data => {
        setAlimentos(data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setAlimentos([]);
      })
      .finally(() => setLoading(false));
  }, []);

 
  let alimentosFiltrados = alimentos;
  
  if (busca) {
    alimentosFiltrados = alimentosFiltrados.filter(a => 
      a.nome.toLowerCase().includes(busca.toLowerCase())
    );
  }
  
  if (filtroTipo) {
    alimentosFiltrados = alimentosFiltrados.filter(a => a.tipo === filtroTipo);
  }
  
  if (filtroSituacao === 'necessidade') {
    alimentosFiltrados = alimentosFiltrados.filter(a => a.quantidade_necessaria > a.quantidade_disponivel);
  } else if (filtroSituacao === 'garantido') {
    alimentosFiltrados = alimentosFiltrados.filter(a => a.quantidade_disponivel >= a.quantidade_necessaria && a.quantidade_necessaria > 0);
  } else if (filtroSituacao === 'critico') {
    alimentosFiltrados = alimentosFiltrados.filter(a => a.quantidade_disponivel === 0 && a.quantidade_necessaria > 0);
  }


  if (ordenarPor === 'necessidade') {
    alimentosFiltrados = [...alimentosFiltrados].sort((a, b) => 
      (b.quantidade_necessaria - b.quantidade_disponivel) - (a.quantidade_necessaria - a.quantidade_disponivel)
    );
  } else if (ordenarPor === 'disponibilidade') {
    alimentosFiltrados = [...alimentosFiltrados].sort((a, b) => b.quantidade_disponivel - a.quantidade_disponivel);
  } else if (ordenarPor === 'tipo') {
    alimentosFiltrados = [...alimentosFiltrados].sort((a, b) => a.tipo.localeCompare(b.tipo));
  } else if (ordenarPor === 'nome') {
    alimentosFiltrados = [...alimentosFiltrados].sort((a, b) => a.nome.localeCompare(b.nome));
  }

  const tiposUnicos = Array.from(new Set(alimentos.map(a => a.tipo))).filter(Boolean);
  
  const limparFiltros = () => {
    setFiltroTipo('');
    setFiltroSituacao('');
    setBusca('');
    setOrdenarPor('');
  };

  const temFiltrosAtivos = filtroTipo || filtroSituacao || busca || ordenarPor;

  const getSituacaoAlimento = (alimento) => {
    if (alimento.quantidade_disponivel === 0 && alimento.quantidade_necessaria > 0) {
      return { status: 'critico', cor: 'red', icone: AlertTriangle };
    }
    if (alimento.quantidade_necessaria > alimento.quantidade_disponivel) {
      return { status: 'necessidade', cor: 'orange', icone: AlertTriangle };
    }
    if (alimento.quantidade_disponivel >= alimento.quantidade_necessaria && alimento.quantidade_necessaria > 0) {
      return { status: 'garantido', cor: 'green', icone: CheckCircle };
    }
    return { status: 'neutro', cor: 'gray', icone: Package };
  };

  const getPercentualDisponivel = (alimento) => {
    if (alimento.quantidade_necessaria === 0) return 100;
    return Math.min(100, (alimento.quantidade_disponivel / alimento.quantidade_necessaria) * 100);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg mt-8">
        <div className="text-center text-red-500">
          <AlertTriangle className="mx-auto h-12 w-12 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Erro ao carregar dados</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg mt-8 overflow-hidden">
   
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <Package className="h-8 w-8" />
            Lista de Alimentos
          </h2>
          <div className="text-white/80">
            <span className="text-2xl font-bold">{alimentosFiltrados.length}</span>
            <span className="text-sm ml-1">itens</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* busca */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar alimentos..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Filtro */}
        <div className="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <Filter className="h-4 w-4" />
            Filtros:
          </div>

          <select
            value={filtroTipo}
            onChange={e => setFiltroTipo(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Todos os tipos</option>
            {tiposUnicos.map(tipo => (
              <option key={tipo} value={tipo}>
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </option>
            ))}
          </select>

          <button
            className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
              filtroSituacao === 'critico' 
                ? 'bg-red-500 text-white border-red-500' 
                : 'bg-white text-red-500 border-red-300 hover:bg-red-50'
            }`}
            onClick={() => setFiltroSituacao(filtroSituacao === 'critico' ? '' : 'critico')}
          >
            <AlertTriangle className="h-4 w-4" />
            Crítico
          </button>

          <button
            className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
              filtroSituacao === 'necessidade' 
                ? 'bg-orange-500 text-white border-orange-500' 
                : 'bg-white text-orange-500 border-orange-300 hover:bg-orange-50'
            }`}
            onClick={() => setFiltroSituacao(filtroSituacao === 'necessidade' ? '' : 'necessidade')}
          >
            <TrendingDown className="h-4 w-4" />
            Com Necessidade
          </button>

          <button
            className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
              filtroSituacao === 'garantido' 
                ? 'bg-green-500 text-white border-green-500' 
                : 'bg-white text-green-500 border-green-300 hover:bg-green-50'
            }`}
            onClick={() => setFiltroSituacao(filtroSituacao === 'garantido' ? '' : 'garantido')}
          >
            <CheckCircle className="h-4 w-4" />
            Garantido
          </button>

          <div className="border-l border-gray-300 pl-3 ml-2 flex items-center gap-2">
            <span className="text-gray-700 font-medium">Ordenar:</span>
            
            <button
              className={`px-3 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                ordenarPor === 'nome' 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-blue-500 border-blue-300 hover:bg-blue-50'
              }`}
              onClick={() => setOrdenarPor(ordenarPor === 'nome' ? '' : 'nome')}
            >
              Nome
            </button>

            <button
              className={`px-3 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                ordenarPor === 'necessidade' 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-blue-500 border-blue-300 hover:bg-blue-50'
              }`}
              onClick={() => setOrdenarPor(ordenarPor === 'necessidade' ? '' : 'necessidade')}
            >
              <TrendingUp className="h-4 w-4" />
              Necessidade
            </button>

            <button
              className={`px-3 py-2 rounded-lg border transition-all ${
                ordenarPor === 'tipo' 
                  ? 'bg-blue-500 text-white border-blue-500' 
                  : 'bg-white text-blue-500 border-blue-300 hover:bg-blue-50'
              }`}
              onClick={() => setOrdenarPor(ordenarPor === 'tipo' ? '' : 'tipo')}
            >
              <Grid3X3 className="h-4 w-4" />
              Tipo
            </button>
          </div>

          {temFiltrosAtivos && (
            <button
              className="ml-auto px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all flex items-center gap-2"
              onClick={limparFiltros}
            >
              <X className="h-4 w-4" />
              Limpar Filtros
            </button>
          )}
        </div>

        {/* a lista dos alimento */}
        <div className="space-y-4">
          {alimentosFiltrados.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Package className="mx-auto h-16 w-16 mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">Nenhum alimento encontrado</h3>
              <p>Tente ajustar os filtros ou adicionar novos alimentos.</p>
            </div>
          )}
          
          {alimentosFiltrados.map(alimento => {
            const situacao = getSituacaoAlimento(alimento);
            const percentual = getPercentualDisponivel(alimento);
            const StatusIcon = situacao.icone;
            
            return (
              <div
                key={alimento.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">
                      {tipoParaIcone[alimento.tipo] || "🛒"}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 mb-1">
                        {alimento.nome}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {alimento.tipo.charAt(0).toUpperCase() + alimento.tipo.slice(1)}
                        </span>
                        <span className="text-sm text-gray-600">
                          Unidade: {alimento.unidade}
                        </span>
                        <div className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full bg-${situacao.cor}-100 text-${situacao.cor}-700`}>
                          <StatusIcon className="h-3 w-3" />
                          {situacao.status === 'critico' && 'Crítico'}
                          {situacao.status === 'necessidade' && 'Necessário'}
                          {situacao.status === 'garantido' && 'Garantido'}
                          {situacao.status === 'neutro' && 'Neutro'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-2">Necessário</div>
                      <div className="w-20 h-20 flex items-center justify-center bg-orange-50 border-2 border-orange-200 rounded-xl">
                        <span className="text-2xl font-bold text-orange-600">
                          {alimento.quantidade_necessaria}
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xs text-gray-500 mb-2">Disponível</div>
                      <div className={`w-20 h-20 flex items-center justify-center bg-${situacao.cor}-50 border-2 border-${situacao.cor}-200 rounded-xl`}>
                        <span className={`text-2xl font-bold text-${situacao.cor}-600`}>
                          {alimento.quantidade_disponivel}
                        </span>
                      </div>
                    </div>

                    <div className="text-center min-w-20">
                      <div className="text-xs text-gray-500 mb-2">Progresso</div>
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            className="text-gray-200"
                          />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                            strokeDasharray={`${percentual * 1.76} 176`}
                            className={`text-${situacao.cor}-500`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-sm font-bold text-${situacao.cor}-600`}>
                            {Math.round(percentual)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}