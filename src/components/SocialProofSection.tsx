import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Eye, Heart, Users, Shield, Clock, Award } from 'lucide-react';
import { useCountAnimation, useIntersectionObserver } from '../hooks/useCountAnimation';

export const SocialProofSection: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, 0.3);

  const stats = [
    {
      icon: Eye,
      value: 100,
      suffix: 'M+',
      label: t('socialProof.stats.views'),
      color: 'from-blue-500 to-cyan-500',
      isDecimal: false
    },
    {
      icon: Heart,
      value: 9,
      suffix: 'M+',
      label: t('socialProof.stats.likes'),
      color: 'from-pink-500 to-red-500',
      isDecimal: false
    },
    {
      icon: Users,
      value: 17, // Изменяем на 17, чтобы потом разделить на 10
      suffix: 'M+',
      label: t('socialProof.stats.followers'),
      color: 'from-purple-500 to-indigo-500',
      isDecimal: true,
      decimalPlaces: 1
    }
  ];

  const trustIndicators = [
    {
      icon: Shield,
      title: t('socialProof.trust.security.title'),
      description: t('socialProof.trust.security.description')
    },
    {
      icon: Clock,
      title: t('socialProof.trust.quickStart.title'),
      description: t('socialProof.trust.quickStart.description')
    },
    {
      icon: Award,
      title: t('socialProof.trust.guarantee.title'),
      description: t('socialProof.trust.guarantee.description')
    }
  ];

  return (
    <div ref={sectionRef} className="relative overflow-hidden bg-gray-900 py-12 sm:py-16">
      {/* Анимированный фон */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Основной градиентный фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-pink-900/15 animate-gradient-shift"></div>
        
        {/* Движущиеся сферы */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/6 w-72 h-72 bg-gradient-to-br from-purple-500/8 to-pink-500/8 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-1/4 right-1/6 w-64 h-64 bg-gradient-to-br from-blue-500/8 to-purple-500/8 rounded-full blur-3xl animate-float-slow-reverse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>
        
        {/* Геометрические фигуры */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-24 h-24 border border-purple-500/15 rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-20 h-20 border border-pink-500/15 rounded-full animate-spin-slow-reverse"></div>
          <div className="absolute top-2/3 left-1/6 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-purple-500/15 animate-float-triangle"></div>
        </div>
        
        {/* Световые блики */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-twinkle shadow-lg shadow-pink-400/30"></div>
          <div className="absolute bottom-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-twinkle-delay shadow-lg shadow-purple-400/30"></div>
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-twinkle-slow shadow-lg shadow-blue-400/30"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('socialProof.title')}
          </h2>
          <p className="text-gray-400 text-lg mb-12">
            {t('socialProof.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => {
              const StatCounter = () => {
                const { count } = useCountAnimation({
                  end: stat.value,
                  duration: 2000 + (index * 300), // Разная длительность для каждого счетчика
                  isVisible
                });

                const displayValue = stat.isDecimal 
                  ? (count / 10).toFixed(stat.decimalPlaces || 1)
                  : count;

                return (
                  <span>
                    {displayValue}{stat.suffix}
                  </span>
                );
              };

              return (
                <div
                  key={index}
                  className="group relative glass-effect rounded-xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105 card-hover"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 glow-effect`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-countUp">
                      <StatCounter />
                    </div>
                    
                    <div className="text-gray-400 text-lg group-hover:text-gray-300 transition-colors duration-300">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustIndicators.map((indicator, index) => (
            <div
              key={index}
              className="group flex items-start space-x-4 p-6 glass-effect rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 card-hover"
              style={{ animationDelay: `${(index + 3) * 0.2}s` }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 glow-effect">
                <indicator.icon className="w-6 h-6 text-white" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-glow transition-all duration-300">
                  {indicator.title}
                </h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {indicator.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-6 px-8 py-4 glass-effect rounded-full border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 glow-effect">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50"></div>
              <span className="text-sm text-gray-300 hover:text-white transition-colors duration-300">{t('socialProof.indicators.online')}</span>
            </div>
            
            <div className="w-px h-6 bg-gray-600"></div>
            
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500 drop-shadow-lg" />
              <span className="text-sm text-gray-300 hover:text-white transition-colors duration-300">{t('socialProof.indicators.securePayments')}</span>
            </div>
            
            <div className="w-px h-6 bg-gray-600"></div>
            
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-yellow-500 drop-shadow-lg" />
              <span className="text-sm text-gray-300 hover:text-white transition-colors duration-300">{t('socialProof.indicators.satisfiedClients')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};