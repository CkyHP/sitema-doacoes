import React from 'react';

// Exemplo de carrossel simples (pode trocar por um pacote como react-responsive-carousel)
function Carrossel() {
  return (
    <div className="w-full h-64 bg-slate-200 flex items-center justify-center mb-8 rounded-lg">
      <span className="text-slate-500">[Carrossel de Imagens da Ação Social]</span>
    </div>
  );
}

function InfoBox({ img, title, text, reverse }) {
  return (
    <div className={`flex flex-col md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} items-center mb-8`}>
      <img src={img} alt={title} className="w-32 h-32 object-cover rounded-lg shadow mx-4" />
      <div className="flex-1 p-4">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-700">{text}</p>
      </div>
    </div>
  );
}

function Mapa() {
  return (
    <div className="w-full h-64 mb-8 rounded-lg overflow-hidden shadow">
      <iframe
        title="Mapa Igreja"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.123456789!2d-43.123456!3d-22.987654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sNome%20da%20Igreja!5e0!3m2!1spt-BR!2sbr!4v0000000000000"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

function Contato() {
  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow text-center">
      <h3 className="text-lg font-bold mb-2">Contato</h3>
      <p className="mb-1">WhatsApp: (99) 99999-9999</p>
      <p className="mb-1">Email: contato@igreja.com.br</p>
      <p className="mb-1">Endereço: Rua Exemplo, 123 - Bairro, Cidade/UF</p>
      <p className="text-slate-500 text-sm mt-2">Siga-nos nas redes sociais!</p>
    </div>
  );
}

export default function HomePage(props) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Carrossel />
      {props.children}
      <InfoBox
        img="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
        title="Nossa Missão"
        text="Ajudar famílias em situação de vulnerabilidade através da arrecadação e distribuição de cestas básicas."
      />
      <InfoBox
        img="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80"
        title="Como Funciona"
        text="Recebemos doações de alimentos e montamos cestas conforme a necessidade de cada família atendida."
        reverse
      />
      <Mapa />
      <Contato />
    </div>
  );
}