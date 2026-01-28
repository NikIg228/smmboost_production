import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState<string>('');

  useEffect(() => {
    // Get order_id from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const orderIdParam = urlParams.get('order_id');
    if (orderIdParam) {
      setOrderId(orderIdParam);
    }
  }, []);

  const goToHome = () => {
    navigate('/');
  };

  const tryAgain = () => {
    navigate('/services');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        
        <h1 className="text-2xl font-bold text-white mb-4">
          Платеж отменен
        </h1>
        
        <p className="text-gray-300 mb-6">
          Оплата была отменена. Средства не были списаны с вашего счета.
        </p>

        {orderId && (
          <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-400 mb-2">Номер заказа:</p>
            <p className="text-white font-mono text-sm">{orderId}</p>
          </div>
        )}

        <div className="space-y-2 text-sm text-gray-300 mb-8">
          <p>❌ Платеж не был завершен</p>
          <p>ℹ️ Средства не списаны</p>
          <p>🔄 Вы можете попробовать еще раз</p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={tryAgain}
            className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Попробовать снова</span>
          </button>
          
          <button
            onClick={goToHome}
            className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>На главную</span>
          </button>
        </div>
      </div>
    </div>
  );
};