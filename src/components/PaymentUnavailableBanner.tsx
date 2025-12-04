import React from 'react';
import { X, AlertCircle } from 'lucide-react';

interface PaymentUnavailableBannerProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToCatalog?: () => void;
  title?: string | React.ReactNode;
  description?: string;
  showCatalogButton?: boolean;
}

export const PaymentUnavailableBanner: React.FC<PaymentUnavailableBannerProps> = ({ 
  isOpen, 
  onClose, 
  onGoToCatalog,
  title = 'Приём платежей временно недоступен',
  description,
  showCatalogButton = true
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      
      {/* Banner */}
      <div 
        className="relative bg-gray-800 rounded-xl border border-gray-700 shadow-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>

          {/* Content */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-yellow-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-3">
              {title}
            </h2>
            
            {description && (
              <p className="text-gray-300 mb-6">
                {description}
              </p>
            )}

            {/* Button */}
            {showCatalogButton && onGoToCatalog && (
              <button
                onClick={() => {
                  onGoToCatalog();
                  onClose();
                }}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-pink-500/25 button-hover-lift"
              >
                к Каталогу
              </button>
            )}
          </div>
        </div>
    </div>
  );
};

