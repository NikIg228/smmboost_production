import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Copy, Check } from 'lucide-react';

export const PaymentSuccess: React.FC = () => {
  const [orderId, setOrderId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Get order_id from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const orderIdParam = urlParams.get('order_id');
    if (orderIdParam) {
      setOrderId(orderIdParam);
    }
  }, []);

  const copyOrderId = () => {
    if (orderId) {
      navigator.clipboard.writeText(orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const goToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        
        <h1 className="text-2xl font-bold text-white mb-4">
          Платеж успешен!
        </h1>
        
        <p className="text-gray-300 mb-6">
          Ваш заказ принят в обработку. Выполнение начнется в ближайшее время.
        </p>

        {orderId && (
          <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-400 mb-2">Номер заказа:</p>
            <div className="flex items-center justify-between">
              <p className="text-white font-mono text-sm">{orderId}</p>
              <button
                onClick={copyOrderId}
                className="ml-2 p-2 hover:bg-gray-600 rounded transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-2 text-sm text-gray-300 mb-8">
          <p>✅ Заказ принят в обработку</p>
          <p>✅ Выполнение начнется в течение 30 минут</p>
          <p>✅ Уведомление отправлено на email</p>
        </div>

        <button
          onClick={goToHome}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
        >
          <span>Вернуться на главную</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};