import React from 'react';
import { ArrowRight, Zap, Shield, Clock, Headphones } from 'lucide-react';
import { SplineSection } from './SplineSection';
import { SocialProofSection } from './SocialProofSection';

interface HeroProps {
  onPageChange: (page: string) => void;
  onConsultation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPageChange, onConsultation }) => {
  const benefits = [
    {
      icon: Zap,
      title: 'Мгновенный запуск',
      description: 'Результат через 30 минут после оплаты'
    },
    {
      icon: Shield,
      title: 'Анонимно и безопасно',
      description: 'Никаких паролей, полная конфиденциальность'
    },
    {
      icon: Clock,
      title: 'Без паролей',
      description: 'Не требуем доступ к вашему аккаунту'
    },
    {
      icon: Headphones,
      title: 'Поддержка 24/7',
      description: 'Помогаем в любое время дня и ночи'
    }
  ];

  return (
    <>
      <div className="relative overflow-hidden">
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-gray-900/40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
          <div className="text-center">
            {/* New Hero Header */}
            <div className="mb-8 animate-heroTitle">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4">
                <span className="gradient-flow-text text-glow">
                  Продвижение аккаунтов по всему миру — лайки и подписчики без границ!
                </span>
              </h2>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent text-glow">
                Продвижение
              </span>
              <br />
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                в социальных сетях
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-glow">
                для вашего успеха
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Профессиональные услуги для роста вашего присутствия в соцсетях
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button 
                onClick={() => onPageChange('services')}
                className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-pink-500/25 button-hover-lift glow-effect neon-button"
              >
                <span className="flex items-center space-x-2">
                  <span>Выбрать услугу</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button 
                onClick={onConsultation}
                className="px-8 py-4 glass-effect text-white font-semibold rounded-xl hover:bg-purple-500/20 transition-all duration-300 button-hover-lift border border-purple-500/30 hover:border-purple-400"
              >
                Получить консультацию
              </button>
            </div>
          </div>
          
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group relative p-6 glass-effect rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 glow-effect">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-glow transition-all duration-300">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Spline 3D Section */}
      <SplineSection onPageChange={onPageChange} />
      
      {/* Social Proof Section */}
      <SocialProofSection />
    </>
  );
};