import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Check, Shield, Clock, Zap, Calculator } from 'lucide-react';
import { Service } from '../types';

interface ServiceDetailProps {
  service: Service;
  onBack: () => void;
  onPaymentClick: () => void;
}

export const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, onBack, onPaymentClick }) => {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [quantity, setQuantity] = useState(1000);
  const [isCalculating, setIsCalculating] = useState(false);

  const predefinedQuantities = [100, 500, 1000, 5000, 10000];
  
  // Get translated service data
  const serviceTranslation = t(`services.serviceItems.${service.id}`, { returnObjects: true }) as {
    name?: string;
    description?: string;
    startTime?: string;
    speed?: string;
    guarantee?: string;
  } | string;
  
  const serviceName = typeof serviceTranslation === 'object' && serviceTranslation?.name 
    ? serviceTranslation.name 
    : service.name;
  const serviceDescription = typeof serviceTranslation === 'object' && serviceTranslation?.description 
    ? serviceTranslation.description 
    : service.description;
  const serviceStartTime = typeof serviceTranslation === 'object' && serviceTranslation?.startTime 
    ? serviceTranslation.startTime 
    : service.startTime;
  const serviceSpeed = typeof serviceTranslation === 'object' && serviceTranslation?.speed 
    ? serviceTranslation.speed 
    : service.speed;
  const serviceGuarantee = typeof serviceTranslation === 'object' && serviceTranslation?.guarantee 
    ? serviceTranslation.guarantee 
    : service.guarantee;
  
  const calculatePrice = (qty: number) => {
    if (service.category === 'likes') {
      return (qty / 100) * service.price;
    }
    return (qty / 1000) * service.price;
  };
  
  const totalPrice = calculatePrice(quantity);

  const handleQuantityChange = (newQuantity: number) => {
    setIsCalculating(true);
    setTimeout(() => {
      setQuantity(Math.max(service.minQuantity, Math.min(service.maxQuantity, newQuantity)));
      setIsCalculating(false);
    }, 300);
  };

  const handleOrder = () => {
    onPaymentClick();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>{t('services.backToServices')}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Service Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">
              {serviceName}
            </h1>
            <p className="text-gray-400 text-lg">
              {serviceDescription}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">{t('services.serviceFeatures')}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-sm text-gray-400">{t('services.startTime')}</div>
                  <div className="text-white font-medium">{serviceStartTime}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                <Zap className="w-5 h-5 text-yellow-500" />
                <div>
                  <div className="text-sm text-gray-400">{t('services.speed')}</div>
                  <div className="text-white font-medium">{serviceSpeed}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                <Shield className="w-5 h-5 text-green-500" />
                <div>
                  <div className="text-sm text-gray-400">{t('services.guarantee')}</div>
                  <div className="text-white font-medium">{serviceGuarantee}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg">
                <Calculator className="w-5 h-5 text-purple-500" />
                <div>
                  <div className="text-sm text-gray-400">
                    {t('services.pricePer')} {service.category === 'likes' ? t('services.per100') : t('services.per1000')}
                  </div>
                  <div className="text-white font-medium">
                    {service.price.toLocaleString()}₸
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">{t('services.howItWorks')}</h3>
            
            <div className="space-y-3">
              {[
                t('services.step1'),
                t('services.step2'),
                t('services.step3'),
                t('services.step4')
              ].map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6">{t('services.orderForm')}</h3>
          
          <div className="space-y-6">
            {/* URL Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('services.profileLink')}
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t('services.profileLinkPlaceholder')}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            {/* Quantity Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('services.quantity')} ({service.minQuantity} - {service.maxQuantity})
              </label>
              
              {/* Predefined Quantities */}
              <div className="grid grid-cols-5 gap-2 mb-3">
                {predefinedQuantities.map(qty => (
                  <button
                    key={qty}
                    onClick={() => handleQuantityChange(qty)}
                    className={`py-2 px-3 rounded-lg font-medium transition-all ${
                      quantity === qty
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {qty}
                  </button>
                ))}
              </div>
              
              {/* Custom Quantity */}
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
                min={service.minQuantity}
                max={service.maxQuantity}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>

            {/* Price Calculator */}
            <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">{t('services.quantity')}:</span>
                <span className="text-white font-medium">
                  {isCalculating ? '...' : quantity.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">{t('services.pricePer1000')}:</span>
                <span className="text-white font-medium">
                  {service.price.toLocaleString()}₸
                </span>
              </div>
              
              <div className="border-t border-gray-600 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-white">{t('services.total')}:</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    {isCalculating ? t('services.calculating') : `${Math.round(totalPrice).toLocaleString()}₸`}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Button */}
            <button
              onClick={handleOrder}
              disabled={!url || isCalculating}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-pink-500/25"
            >
              {isCalculating ? t('services.calculating') : t('services.proceedToPayment')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};