import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';

interface LogoutNotificationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutNotification: React.FC<LogoutNotificationProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      
      {/* Notification */}
      <div 
        className="relative bg-gray-800 rounded-xl border border-gray-700 shadow-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3">
            {t('logout.title')}
          </h2>
          
          <p className="text-gray-300 mb-6">
            {t('logout.message')}
          </p>

          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-pink-500/25 button-hover-lift"
          >
            {t('common.ok')}
          </button>
        </div>
      </div>
    </div>
  );
};

