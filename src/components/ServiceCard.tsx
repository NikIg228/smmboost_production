import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, UserPlus, Eye, PlayCircle, ThumbsUp, MessageCircle, Instagram, Video, Play, Users, Twitter, Tv } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onServiceClick: (service: Service) => void;
  onBuyClick: () => void;
}

const iconMap = {
  Heart,
  UserPlus,
  Eye,
  PlayCircle,
  ThumbsUp,
  MessageCircle,
  Instagram,
  Video,
  Play,
  Users,
  Twitter,
  Tv
};

const platformColors = {
  instagram: 'from-pink-500 to-purple-600',
  tiktok: 'from-gray-800 to-black',
  youtube: 'from-red-500 to-red-700',
  telegram: 'from-blue-400 to-blue-600',
  vk: 'from-blue-600 to-blue-800',
  twitter: 'from-blue-400 to-blue-600'
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onServiceClick, onBuyClick }) => {
  const { t } = useTranslation();
  const IconComponent = iconMap[service.icon as keyof typeof iconMap];
  const platformGradient = platformColors[service.platform as keyof typeof platformColors];
  
  return (
    <div 
      className="group relative h-full glass-effect rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 overflow-hidden card-hover glow-effect cursor-pointer"
      onClick={() => onServiceClick(service)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10 p-4 sm:p-6 h-full flex flex-col">
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${platformGradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 glow-effect`}>
              <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            
            <div className="text-right">
              <div className="text-xs sm:text-sm text-gray-400">{t('services.from')}</div>
              <div className="text-base sm:text-lg font-bold text-white">
                {service.price.toLocaleString()}₸
              </div>
              <div className="text-xs text-gray-500">
                {service.category === 'likes' || service.category === 'live' ? t('services.per100') : t('services.per1000')}
              </div>
            </div>
          </div>
          
          {/* Content */}
          <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-glow transition-all duration-300">
            {service.name}
          </h3>
          
          <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
            {service.description}
          </p>
          
          {/* Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 mb-3 sm:mb-4 space-y-1 sm:space-y-0">
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs">{t('services.start')}: {service.startTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs">{t('services.speedLabel')}: {service.speed}</span>
            </div>
          </div>
        </div>
        
        {/* Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBuyClick();
          }}
          className="w-full mt-auto py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-pink-500/25 button-hover-lift glow-effect neon-button"
        >
{t('services.buy')}
        </button>
      </div>
    </div>
  );
};