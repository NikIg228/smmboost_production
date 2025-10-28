import React from 'react';
import { Zap, Mail, Phone, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  
  const handlePageChange = (page: string) => {
    // Scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Then trigger page change
    window.dispatchEvent(new CustomEvent('pageChange', { detail: page }));
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                SMM Boost
              </span>
            </div>
            <p className="text-gray-400">
              Профессиональные услуги по продвижению в социальных сетях. Быстро, безопасно, эффективно.
            </p>
            <div className="text-gray-400 text-sm space-y-1 pt-2">
              <p className="text-gray-500 uppercase tracking-wider text-xs">Юридическая информация</p>
              <p>ТОО "White Trade"</p>
              <p>БИН 250140025178</p>
              <p>Республика Казахстан, город Алматы, Бостандыкский район, Темирязева 69, почтовый индекс 050057</p>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Услуги</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => handlePageChange('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Instagram
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageChange('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  TikTok
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageChange('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  YouTube
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageChange('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  Telegram
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageChange('services')}
                  className="hover:text-white transition-colors text-left"
                >
                  VK
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Поддержка</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => handlePageChange('faq')}
                  className="hover:text-white transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageChange('terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Пользовательское соглашение
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageChange('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Политика конфиденциальности
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handlePageChange('refund')}
                  className="hover:text-white transition-colors text-left"
                >
                  Возврат средств
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5" />
                <span>support.smm.boost.kz@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5" />
                <span>+7 707 345 12 12</span>
              </div>
              <a
                href="https://t.me/smmboost1bot"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Telegram: @smmboost1bot</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 SMM Boost. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};