import React, { useState, useEffect } from 'react';

const TIPOS_CESTA = [
  {
    nome: "Cesta Padrão",
    alimentos: [
      { nome: "Arroz", quantidade: 5 },
      { nome: "Feijão", quantidade: 2 },
      { nome: "Açúcar", quantidade: 2 },
      { nome: "Macarrão", quantidade: 1 },
      { nome: "Fubá", quantidade: 1 },
      { nome: "Farinha de trigo", quantidade: 1 },
      { nome: "Farinha de mandioca", quantidade: 1 },
      { nome: "Café", quantidade: 0.5 },
      { nome: "Sal", quantidade: 1 },
      { nome: "Óleo", quantidade: 1 },
      { nome: "Goiabada", quantidade: 1 },
      { nome: "Molho de tomate (sache)", quantidade: 2 },
      { nome: "Leite em pó", quantidade: 1 },
      { nome: "Achocolatado", quantidade: 1 },
      { nome: "Mucilon/farinha láctea/aveia em flocos", quantidade: 1 },
      { nome: "Cream cracker", quantidade: 1 },
      { nome: "Rosquinha", quantidade: 1 },
      { nome: "Biscoito recheado", quantidade: 2 },
      { nome: "Gelatina", quantidade: 2 },
      { nome: "Absorvente", quantidade: 1 },
      { nome: "Pasta dental", quantidade: 1 },
      { nome: "Sabonete", quantidade: 3 },
      { nome: "Detergente de pia", quantidade: 1 },
      { nome: "Papel higiênico", quantidade: 1 },
    ],
  },
  {
    nome: "Cesta Família com mais crianças",
    alimentos: [
      { nome: "Arroz", quantidade: 5 },
      { nome: "Feijão", quantidade: 2 },
      { nome: "Açúcar", quantidade: 2 },
      { nome: "Macarrão", quantidade: 1 },
      { nome: "Fubá", quantidade: 1 },
      { nome: "Farinha de trigo", quantidade: 1 },
      { nome: "Farinha de mandioca", quantidade: 1 },
      { nome: "Café", quantidade: 0.5 },
      { nome: "Sal", quantidade: 1 },
      { nome: "Óleo", quantidade: 1 },
      { nome: "Goiabada", quantidade: 1 },
      { nome: "Miojo", quantidade: 2 },
      { nome: "Molho de tomate (sache)", quantidade: 2 },
      { nome: "Leite em pó", quantidade: 1 },
      { nome: "Achocolatado", quantidade: 1 },
      { nome: "Mucilon/farinha láctea/aveia em flocos", quantidade: 2 },
      { nome: "Cream cracker", quantidade: 1 },
      { nome: "Maisena", quantidade: 1 },
      { nome: "Rosquinha", quantidade: 1 },
      { nome: "Biscoito recheado", quantidade: 4 },
      { nome: "Gelatina", quantidade: 3 },
      { nome: "Absorvente", quantidade: 1 },
      { nome: "Pasta dental", quantidade: 1 },
      { nome: "Sabonete", quantidade: 3 },
      { nome: "Detergente de pia", quantidade: 1 },
      { nome: "Papel higiênico", quantidade: 1 },
    ],
  },
  {
    nome: "Cesta Família em estado de miserabilidade",
    alimentos: [
      { nome: "Arroz", quantidade: 5 },
      { nome: "Feijão", quantidade: 2 },
      { nome: "Açúcar", quantidade: 2 },
      { nome: "Macarrão", quantidade: 1 },
      { nome: "Fubá", quantidade: 1 },
      { nome: "Farinha de trigo", quantidade: 1 },
      { nome: "Farinha de mandioca", quantidade: 1 },
      { nome: "Café", quantidade: 0.5 },
      { nome: "Sal", quantidade: 1 },
      { nome: "Miojo", quantidade: 2 },
      { nome: "Tempero para feijão", quantidade: 1 },
      { nome: "Mistura", quantidade: 1 },
      { nome: "Óleo", quantidade: 1 },
      { nome: "Goiabada", quantidade: 1 },
      { nome: "Molho de tomate (sache)", quantidade: 2 },
      { nome: "Leite em pó", quantidade: 1 },
      { nome: "Achocolatado", quantidade: 1 },
      { nome: "Mucilon/farinha láctea/aveia em flocos", quantidade: 1 },
      { nome: "Cream cracker", quantidade: 1 },
      { nome: "Rosquinha", quantidade: 1 },
      { nome: "Biscoito recheado", quantidade: 2 },
      { nome: "Gelatina", quantidade: 2 },
      { nome: "Absorvente", quantidade: 1 },
      { nome: "Pasta dental", quantidade: 1 },
      { nome: "Sabonete", quantidade: 3 },
      { nome: "Detergente de pia", quantidade: 1 },
      { nome: "Papel higiênico", quantidade: 1 },
      { nome: "Cloro", quantidade: 1 },
      { nome: "Sabão em pó", quantidade: 1 },
      { nome: "Sabão em pedra", quantidade: 1 },
      { nome: "Desodorante ou leite de rosas", quantidade: 1 },
      { nome: "Kit shampoo + condicionador", quantidade: 1 },
      { nome: "Esponja para lavar louça", quantidade: 1 },
    ],
  },
  {
    nome: "Cesta de Natal",
    alimentos: [
      { nome: "Panetone", quantidade: 1 },
      { nome: "Maionese (vidro)", quantidade: 1 },
      { nome: "Milho verde (lata)", quantidade: 1 },
      { nome: "Bombons (caixa)", quantidade: 1 },
      { nome: "Coxa com sobrecoxa (kg)", quantidade: 2 },
      { nome: "Suco", quantidade: 1 },
      { nome: "Tempero para frango tipo sazon", quantidade: 1 },
      // Itens da cesta padrão também entram:
      { nome: "Arroz", quantidade: 5 },
      { nome: "Feijão", quantidade: 2 },
      { nome: "Açúcar", quantidade: 2 },
      { nome: "Macarrão", quantidade: 1 },
      { nome: "Fubá", quantidade: 1 },
      { nome: "Farinha de trigo", quantidade: 1 },
      { nome: "Farinha de mandioca", quantidade: 1 },
      { nome: "Café", quantidade: 0.5 },
      { nome: "Sal", quantidade: 1 },
      { nome: "Óleo", quantidade: 1 },
      { nome: "Goiabada", quantidade: 1 },
      { nome: "Miojo", quantidade: 2 },
      { nome: "Molho de tomate (sache)", quantidade: 2 },
      { nome: "Leite em pó", quantidade: 1 },
      { nome: "Achocolatado", quantidade: 1 },
      { nome: "Mucilon/farinha láctea/aveia em flocos", quantidade: 2 },
      { nome: "Cream cracker", quantidade: 1 },
      { nome: "Maisena", quantidade: 1 },
      { nome: "Rosquinha", quantidade: 1 },
      { nome: "Biscoito recheado", quantidade: 4 },
      { nome: "Gelatina", quantidade: 3 },
      { nome: "Absorvente", quantidade: 1 },
      { nome: "Pasta dental", quantidade: 1 },
      { nome: "Sabonete", quantidade: 3 },
      { nome: "Detergente de pia", quantidade: 1 },
      { nome: "Papel higiênico", quantidade: 1 },
    ],
  },
];


export default function AdicionarNecessidadePorCesta() {
  const [quantidades, setQuantidades] = useState(
    TIPOS_CESTA.map(() => 0)
  );
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/cesta/')
      .then(res => res.json())
      .then(data => {
        // data deve ser um array de cestas [{tipo: ..., quantidade: ...}]
        const novasQuantidades = TIPOS_CESTA.map(cesta => {
          const encontrada = data.find(c => c.tipo === cesta.nome);
          return encontrada ? encontrada.quantidade : 0;
        });
        setQuantidades(novasQuantidades);
        setCarregando(false);
      });
  }, []);

  function handleChange(i, value) {
    const novo = [...quantidades];
    novo[i] = Number(value);
    setQuantidades(novo);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const cestasParaEnviar = TIPOS_CESTA.map((cesta, i) => ({
      tipo: cesta.nome,
      quantidade: quantidades[i]
    }));

    await fetch('http://localhost:8000/cesta/atualizar_cestas/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cestasParaEnviar)
    });

    alert('Necessidades e cestas atualizadas!');
    // Não zera os inputs, mantém o valor atualizado
  }

  if (carregando) {
    return <div className="text-center mt-8 text-blue-500 text-xl">Carregando...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow space-y-4 mt-8">
      <h2 className="text-2xl font-bold text-blue-500 mb-4 text-center">Necessidade por Cesta</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {TIPOS_CESTA.map((cesta, i) => (
          <div key={cesta.nome} className="flex flex-col items-center bg-slate-50 rounded-lg p-4 shadow-sm">
            <label className="block font-semibold mb-2 text-center">{cesta.nome}</label>
            <input
              type="number"
              min={0}
              value={quantidades[i]}
              onChange={e => handleChange(i, e.target.value)}
              className="w-24 p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-center"
              placeholder={`Qtd.`}
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Calcular e Adicionar Necessidades
      </button>
      <div className="mt-8 text-sm text-slate-600">
        <b>Observação:</b> Também recebemos doações eventuais de: Sardinha em lata, Salsicha em lata, Milho verde, Ervilha, Vinagre, Suco, Maionese.
      </div>
    </form>
  );
}