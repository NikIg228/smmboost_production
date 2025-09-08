import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { ServiceCard } from './ServiceCard';
import { services, platforms } from '../data/services';
import { Service } from '../types';

interface ServicesGridProps {
  onServiceClick: (service: Service) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onServiceClick }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: 'all', name: 'Все категории' },
    { id: 'likes', name: 'Лайки' },
    { id: 'followers', name: 'Подписчики' },
    { id: 'views', name: 'Просмотры' },
  ];

  const filteredServices = services.filter(service => {
    const matchesPlatform = selectedPlatform === 'all' || service.platform === selectedPlatform;
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesPlatform && matchesCategory && matchesSearch;
  });

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-800 ${
          isVisible ? 'animate-fadeInScale' : 'opacity-0 scale-95'
        }`}>
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent text-glow">
            Наши услуги
          </span>
        </h2>
        <p className={`text-gray-400 text-lg max-w-2xl mx-auto transition-all duration-800 delay-200 ${
          isVisible ? 'animate-slideInLeft' : 'opacity-0 -translate-x-8'
        }`}>
          Выберите нужную услугу для продвижения в социальных сетях
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className={`relative max-w-md mx-auto transition-all duration-600 ${
          isVisible ? 'animate-scaleIn' : 'opacity-0 scale-90'
        }`}
        style={{ animationDelay: '0.4s' }}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Поиск услуг..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 glass-effect border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-4">
          <button
            onClick={() => setSelectedPlatform('all')}
            className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              selectedPlatform === 'all'
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Все платформы
          </button>
          {platforms.map(platform => (
            <button
              key={platform.id}
              onClick={() => setSelectedPlatform(platform.id)}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedPlatform === platform.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {platform.name}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {filteredServices.map(service => (
          <ServiceCard
            key={service.id}
            service={service}
            onServiceClick={onServiceClick}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-4">
            Услуги не найдены
          </div>
          <button
            onClick={() => {
              setSelectedPlatform('all');
              setSelectedCategory('all');
              setSearchTerm('');
            }}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </div>
  );
};