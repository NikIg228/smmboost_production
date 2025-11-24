import React from 'react';
import { Heart, Eye, Users, TrendingUp, Zap, Shield } from 'lucide-react';

interface SplineSectionProps {
  onPageChange: (page: string) => void;
}

export const SplineSection: React.FC<SplineSectionProps> = ({ onPageChange }) => {
  const services = [
    {
      icon: Heart,
      title: 'Лайки',
      description: 'Увеличиваем количество лайков для повышения популярности контента',
      platforms: ['Instagram', 'TikTok', 'VK', 'YouTube'],
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: Eye,
      title: 'Просмотры',
      description: 'Привлекаем просмотры для роста охватов и попадания в рекомендации',
      platforms: ['YouTube', 'TikTok', 'Instagram Reels'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Подписчики',
      description: 'Наращиваем базу подписчиков для увеличения авторитета аккаунта',
      platforms: ['Instagram', 'TikTok', 'YouTube', 'Telegram'],
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Быстрый старт',
      description: 'Результат через 30 минут'
    },
    {
      icon: Shield,
      title: 'Безопасность',
      description: 'Никаких рисков для аккаунта'
    },
    {
      icon: TrendingUp,
      title: 'Рост показателей',
      description: 'Увеличение органических метрик'
    }
  ];

  return (
    <div className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-purple-900/20 to-gray-900/50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          {/* Left Side - Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Продвижение
                </span>
                <br />
                <span className="text-white">
                  в социальных сетях
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
                Профессиональные услуги для роста вашего присутствия в соцсетях
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group relative glass-effect rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 card-hover"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 flex items-start space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 glow-effect`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-glow transition-all duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3 group-hover:text-gray-300 transition-colors duration-300">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {service.platforms.map((platform, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-3 sm:p-4 glass-effect rounded-lg border border-gray-700/30"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center lg:text-left">
              <button
                onClick={() => onPageChange('services')}
                className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-pink-500/25 neon-button button-hover-lift"
              >
                <span>Посмотреть все услуги</span>
                <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right Side - Creative Image Display */}
          <div className="relative flex justify-center lg:justify-end order-first lg:order-last">
            <div className="relative max-w-[280px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-[500px]">
              {/* Main Image Container */}
              <div className="relative group">
                {/* Background glow effects */}
                <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl blur-xl"></div>
                
                {/* Image container with modern design */}
                <div className="relative glass-effect rounded-2xl overflow-hidden border border-purple-500/30 glow-effect group-hover:border-purple-500/50 transition-all duration-500">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src="/like-inst-cover-2.jpg"
                      alt="Instagram продвижение - результаты наших услуг"
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Gradient overlay for better integration */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-gray-900/20"></div>
                    
                    {/* Modern overlay with stats */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="glass-effect rounded-xl p-4 border border-white/20">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-lg font-bold text-white">2.5K+</div>
                              <div className="text-xs text-gray-300">Лайков</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-white">500+</div>
                              <div className="text-xs text-gray-300">Подписчиков</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-white">10K+</div>
                              <div className="text-xs text-gray-300">Просмотров</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating interactive elements */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 glass-effect rounded-full p-2 sm:p-4 border border-pink-500/30 animate-float-slow group-hover:scale-110 transition-transform duration-300">
                <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-full">
                  <Heart className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 glass-effect rounded-full p-2 sm:p-4 border border-blue-500/30 animate-float-slow-reverse group-hover:scale-110 transition-transform duration-300">
                <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </div>
              
              <div className="absolute top-1/4 -right-6 sm:-right-10 glass-effect rounded-full p-2 sm:p-4 border border-cyan-500/30 animate-pulse-slow group-hover:scale-110 transition-transform duration-300">
                <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </div>
              
              <div className="absolute top-3/4 -left-6 sm:-left-10 glass-effect rounded-full p-2 sm:p-4 border border-yellow-500/30 animate-float-medium group-hover:scale-110 transition-transform duration-300">
                <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
              </div>
              
              {/* Animated particles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 right-10 w-2 h-2 bg-pink-400 rounded-full animate-twinkle"></div>
                <div className="absolute bottom-16 left-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-twinkle-delay"></div>
                <div className="absolute top-1/3 left-4 w-1 h-1 bg-blue-400 rounded-full animate-twinkle-slow"></div>
                <div className="absolute bottom-1/4 right-6 w-2.5 h-2.5 bg-cyan-400 rounded-full animate-twinkle-fast"></div>
                <div className="absolute top-2/3 right-16 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-twinkle"></div>
              </div>
              
              {/* Success indicators */}
              <div className="absolute top-12 -left-12 glass-effect rounded-xl p-3 border border-green-500/30 animate-float-triangle">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400 font-semibold">Live</span>
                </div>
              </div>
              
              <div className="absolute bottom-12 -right-16 glass-effect rounded-xl p-3 border border-purple-500/30 animate-float-triangle-reverse">
                <div className="text-center">
                  <div className="text-sm font-bold text-white">100%</div>
                  <div className="text-xs text-gray-400">Success</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
