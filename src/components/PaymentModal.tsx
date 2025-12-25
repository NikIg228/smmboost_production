import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from './Modal';
import { CreditCard, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { Service } from '../types';
import { PaymentRequest } from '../types/payment';
import { useAuth } from '../hooks/useAuth';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
  quantity: number;
  url: string;
  totalPrice: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  service,
  quantity,
  url,
  totalPrice
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState<'card'>('card');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [paymentMessage, setPaymentMessage] = useState('');
  const [transactionId, setTransactionId] = useState('');
  
  // Form fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');

  const paymentMethods = [
    {
      id: 'card' as const,
      name: 'Банковская карта',
      icon: CreditCard,
      description: 'Visa, MasterCard'
    }
  ];

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s+/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.slice(0, 19); // Max 16 digits + 3 spaces
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  // Validate form
  const validateForm = () => {
    if (!cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
      return 'Введите корректный номер карты (16 цифр)';
    }
    if (!cardHolder.trim() || cardHolder.trim().length < 3) {
      return 'Введите ФИО держателя карты';
    }
    if (!expiryMonth || !expiryYear) {
      return 'Введите срок действия карты';
    }
    if (!cvv.match(/^\d{3}$/)) {
      return 'Введите корректный CVV код (3 цифры)';
    }
    return null;
  };

  const handlePayment = async () => {
    if (!user) {
      setPaymentStatus('error');
      setPaymentMessage(t('payment.loginRequired'));
      return;
    }

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setPaymentStatus('error');
      setPaymentMessage(validationError);
      return;
    }

    setLoading(true);
    setPaymentStatus('processing');
    setPaymentMessage(t('payment.processing'));

    try {
      const paymentData: PaymentRequest = {
        amount: Math.round(totalPrice),
        service: service.name,
        quantity,
        url,
        userData: {
          name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          email: user.email || ''
        },
        paymentMethod: selectedMethod
      };

      // Mock payment processing (temporary implementation)
      // TODO: Replace with actual payment gateway integration
      console.log('Processing payment:', paymentData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate transaction ID
      const transactionId = 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      
      // Mock success (90% success rate for testing)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        setPaymentStatus('success');
        setPaymentMessage('Платеж успешно обработан');
        setTransactionId(transactionId);
      } else {
        // Mock failure scenarios
        const failureReasons = [
          'Недостаточно средств на карте',
          'Карта заблокирована',
          'Превышен лимит операций',
          'Ошибка банка'
        ];
        
        const randomFailure = failureReasons[Math.floor(Math.random() * failureReasons.length)];
        setPaymentStatus('error');
        setPaymentMessage(randomFailure);
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('error');
      setPaymentMessage(t('payment.connectionError'));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPaymentStatus('idle');
    setPaymentMessage('');
    setTransactionId('');
    // Reset form fields
    setCardNumber('');
    setCardHolder('');
    setExpiryMonth('');
    setExpiryYear('');
    setCvv('');
    onClose();
  };

  const renderPaymentStatus = () => {
    switch (paymentStatus) {
      case 'processing':
        return (
          <div className="text-center py-8">
            <Loader className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{t('payment.processingTitle')}</h3>
            <p className="text-gray-300">{paymentMessage}</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Платеж успешен!</h3>
            <p className="text-gray-300 mb-4">{paymentMessage}</p>
            {transactionId && (
              <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-400 mb-1">ID транзакции:</p>
                <p className="text-white font-mono">{transactionId}</p>
              </div>
            )}
            <div className="space-y-2 text-sm text-gray-300 mb-6">
              <p>✅ Заказ принят в обработку</p>
              <p>✅ Выполнение начнется в течение {service.startTime}</p>
              <p>✅ Уведомление отправлено на email</p>
            </div>
            <button
              onClick={handleClose}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
            >
              Закрыть
            </button>
          </div>
        );

      case 'error':
        return (
          <div className="text-center py-8">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Ошибка платежа</h3>
            <p className="text-gray-300 mb-6">{paymentMessage}</p>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => setPaymentStatus('idle')}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-200"
              >
                Попробовать снова
              </button>
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all duration-200"
              >
                Отмена
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-3">Детали заказа</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Услуга:</span>
                  <span className="text-white">{service.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Количество:</span>
                  <span className="text-white">{quantity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Ссылка:</span>
                  <span className="text-white text-xs break-all">{url}</span>
                </div>
                <div className="border-t border-gray-600 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-white">Итого:</span>
                    <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                      {Math.round(totalPrice).toLocaleString()}₸
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Способ оплаты</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                      selectedMethod === method.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <method.icon className={`w-6 h-6 ${
                        selectedMethod === method.id ? 'text-purple-400' : 'text-gray-400'
                      }`} />
                      <div>
                        <div className={`font-medium ${
                          selectedMethod === method.id ? 'text-white' : 'text-gray-300'
                        }`}>
                          {method.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {method.description}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            {selectedMethod === 'card' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Данные карты</h3>
                
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Номер карты
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                {/* Card Holder */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    ФИО держателя карты
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                    placeholder="IVANOV IVAN IVANOVICH"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>

                {/* Expiry Date and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Срок действия
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={expiryMonth}
                        onChange={(e) => setExpiryMonth(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                      >
                        <option value="">ММ</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                          <option key={month} value={month.toString().padStart(2, '0')}>
                            {month.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      <select
                        value={expiryYear}
                        onChange={(e) => setExpiryYear(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                      >
                        <option value="">ГГ</option>
                        {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                          <option key={year} value={year.toString().slice(-2)}>
                            {year.toString().slice(-2)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                        setCvv(value);
                      }}
                      placeholder="000"
                      maxLength={3}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-pink-500/25"
            >
              {loading ? 'Обработка...' : `Оплатить ${Math.round(totalPrice).toLocaleString()}₸`}
            </button>

            {/* Security Notice */}
            <div className="text-center text-xs text-gray-400">
              <p>🔒 Безопасная оплата через SSL шифрование</p>
              <p>Ваши данные защищены и не передаются третьим лицам</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Оплата заказа">
      {renderPaymentStatus()}
    </Modal>
  );
};