import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart, Users, Calendar, MapPin, Phone, Mail, Instagram, Facebook, Menu, X, User } from 'lucide-react';

function Header({ autenticado, onIrParaLogin, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Início', href: '#' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Programação', href: '#programacao' },
    { name: 'Ministérios', href: '#ministerios' },
    { name: 'Localização', href: '#localizacao' },
    { name: 'Contato', href: '#contato' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
        
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-2 rounded-lg mr-3">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Igreja Wesleyana</h1>
              <p className="text-sm text-gray-600">Jardim Primavera I</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-gray-700 hover:text-orange-600 font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {autenticado ? (
              <button 
                onClick={onLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center"
              >
                <User className="w-4 h-4 mr-2" />
                Logout
              </button>
            ) : (
              <button 
                onClick={onIrParaLogin}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center"
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </button>
            )}
            
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-gray-700 hover:text-orange-600 font-medium transition-colors px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

function Carrossel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80",
      title: "Mês da Família",
      subtitle: "Celebrando os laços que nos unem"
    },
    {
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
      title: "Ação Social",
      subtitle: "Transformando vidas através do amor"
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      title: "Comunidade Unida",
      subtitle: "Juntos somos mais fortes"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-96 mb-12 rounded-2xl overflow-hidden shadow-2xl">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-orange-500/30 to-transparent">
              <div className="absolute bottom-8 left-8 text-white">
                <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-xl opacity-90">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-200"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="text-center mb-16">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16 px-8 rounded-3xl shadow-2xl mb-12">
        <h1 className="text-5xl font-bold mb-4">Igreja Wesleyana</h1>
        <h2 className="text-3xl font-light mb-6">Jardim Primavera I</h2>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed">
          Uma comunidade de fé dedicada a transformar vidas e fortalecer famílias através do amor de Cristo. 
          Juntos, construímos um futuro melhor para nossa comunidade.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors shadow-lg">
            Venha nos Visitar
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-orange-600 transition-colors">
            Saiba Mais
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ icon: Icon, title, text, stats, gradient }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex items-center mb-6">
        <div className="bg-white/20 p-4 rounded-full mr-4">
          <Icon className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <p className="text-lg leading-relaxed mb-6 opacity-90">{text}</p>
      {stats && (
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 p-4 rounded-lg">
              <div className="text-2xl font-bold">{stat.number}</div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MissionSection() {
  const missions = [
    {
      icon: Heart,
      title: "Nossa Missão",
      text: "Servir às famílias em situação de vulnerabilidade social através de ações concretas de amor e solidariedade. Distribuímos cestas básicas, oferecemos apoio espiritual e promovemos programas de capacitação profissional para gerar autonomia e dignidade.",
      gradient: "from-orange-500 to-red-500",
      stats: [
        { number: "200+", label: "Famílias Atendidas" },
        { number: "1500+", label: "Cestas Distribuídas" }
      ]
    },
    {
      icon: Users,
      title: "Nossa Comunidade",
      text: "Somos uma família unida pela fé, comprometida em viver os valores cristãos no dia a dia. Oferecemos grupos de estudo bíblico, ministérios infantis e juvenis, além de atividades para todas as idades que fortalecem os laços comunitários.",
      gradient: "from-red-500 to-pink-500",
      stats: [
        { number: "350+", label: "Membros Ativos" },
        { number: "15", label: "Ministérios" }
      ]
    },
    {
      icon: Calendar,
      title: "Programação",
      text: "Temos uma agenda rica em atividades espirituais e sociais. Cultos dominicais, estudos bíblicos semanais, eventos especiais, retiros espirituais e ações sociais mensais que transformam vidas e fortalecem nossa comunidade.",
      gradient: "from-pink-500 to-purple-500",
      stats: [
        { number: "4x", label: "Cultos por Semana" },
        { number: "12", label: "Eventos Anuais" }
      ]
    }
  ];

  return (
    <div className="mb-16" id="sobre">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Nossa Igreja</h2>
      <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8">
        {missions.map((mission, index) => (
          <InfoBox key={index} {...mission} />
        ))}
      </div>
    </div>
  );
}

function ProgramacaoSection() {
  const programacao = [
    {
      dia: "Domingo",
      eventos: [
        { hora: "09:00", evento: "Escola Bíblica Dominical", descricao: "Estudo da Palavra para todas as idades" },
        { hora: "19:00", evento: "Culto de Adoração", descricao: "Momento de louvor e pregação da Palavra" }
      ]
    },
    {
      dia: "Terça-feira",
      eventos: [
        { hora: "19:30", evento: "Estudo Bíblico", descricao: "Aprofundamento nas Escrituras Sagradas" }
      ]
    },
    {
      dia: "Quinta-feira",
      eventos: [
        { hora: "19:30", evento: "Culto de Oração", descricao: "Momento de intercessão e comunhão" }
      ]
    },
    {
      dia: "Sábado",
      eventos: [
        { hora: "15:00", evento: "Ministério Infantil", descricao: "Atividades para crianças de 4 a 12 anos" },
        { hora: "17:00", evento: "Juventude", descricao: "Encontro dos jovens e adolescentes" }
      ]
    }
  ];

  return (
    <div className="mb-16" id="programacao">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Programação Semanal</h2>
      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-3xl shadow-xl">
        <div className="grid md:grid-cols-2 gap-8">
          {programacao.map((dia, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-orange-600">{dia.dia}</h3>
              {dia.eventos.map((evento, eventIndex) => (
                <div key={eventIndex} className="mb-4 last:mb-0">
                  <div className="flex items-center mb-2">
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold mr-3">
                      {evento.hora}
                    </span>
                    <h4 className="font-bold text-gray-800">{evento.evento}</h4>
                  </div>
                  <p className="text-gray-600 ml-16">{evento.descricao}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Mapa() {
  return (
    <div className="mb-16" id="localizacao">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Nossa Localização</h2>
      <div className="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-3xl shadow-xl">
        <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            title="Mapa 1ª Igreja Metodista Wesleyana - Jardim Primavera"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3675.123456789!2d-43.2615631!3d-22.6883406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9973f2a1745503%3A0xf0275e830ada9cbd!2s1%C2%AA%20Igreja%20Metodista%20Wesleyana%20-%20Jardim%20Primavera!5e0!3m2!1spt-BR!2sbr!4v1625000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <h3 className="text-xl font-bold text-gray-800">1ª Igreja Metodista Wesleyana</h3>
              <p className="text-gray-600">Jardim Primavera - Duque de Caxias/RJ</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Estamos localizados no coração do bairro Jardim Primavera, com fácil acesso por transporte público. 
            Venha nos visitar e faça parte da nossa família!
          </p>
        </div>
      </div>
    </div>
  );
}

function ContatoSection() {
  return (
    <div className="mb-16" id="contato">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Entre em Contato</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-8 rounded-3xl shadow-xl">
          <h3 className="text-2xl font-bold mb-6">Fale Conosco</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <Phone className="w-6 h-6 mr-4" />
              <div>
                <p className="font-semibold">(21) 99999-9999</p>
                <p className="text-sm opacity-80">WhatsApp - Atendimento 24h</p>
              </div>
            </div>
            <div className="flex items-center">
              <Mail className="w-6 h-6 mr-4" />
              <div>
                <p className="font-semibold">contato@igrejawesleyana.com.br</p>
                <p className="text-sm opacity-80">E-mail principal</p>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="w-6 h-6 mr-4" />
              <div>
                <p className="font-semibold">1ª Igreja Metodista Wesleyana</p>
                <p className="text-sm opacity-80">Jardim Primavera - Duque de Caxias/RJ</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h4 className="text-xl font-bold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <button className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors">
                <Instagram className="w-6 h-6" />
              </button>
              <button className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors">
                <Facebook className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-orange-100">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Envie uma Mensagem</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Seu nome completo"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail</label>
              <input 
                type="email" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mensagem</label>
              <textarea 
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                placeholder="Escreva sua mensagem..."
              />
            </div>
            <button 
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Enviar Mensagem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Igreja Wesleyana</h3>
            <p className="text-orange-100 leading-relaxed">
              Uma comunidade de fé dedicada a transformar vidas através do amor de Cristo.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-orange-100">
              <li><a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#programacao" className="hover:text-white transition-colors">Programação</a></li>
              <li><a href="#ministerios" className="hover:text-white transition-colors">Ministérios</a></li>
              <li><a href="#contato" className="hover:text-white transition-colors">Ação Social</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Horários</h4>
            <ul className="space-y-2 text-orange-100">
              <li>Domingo: 09:00 e 19:00</li>
              <li>Terça: 19:30</li>
              <li>Quinta: 19:30</li>
              <li>Sábado: 15:00 e 17:00</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-orange-400 mt-8 pt-8 text-center text-orange-100">
          <p>&copy; 2025 Igreja Wesleyana Jardim Primavera I. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage({ autenticado, onIrParaLogin, onLogout }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header 
        autenticado={autenticado} 
        onIrParaLogin={onIrParaLogin} 
        onLogout={onLogout} 
      />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Carrossel />
        <HeroSection />
        <MissionSection />
        <ProgramacaoSection />
        <Mapa />
        <ContatoSection />
      </div>
      <Footer />
    </div>
  );
}