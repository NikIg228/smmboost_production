import React, { useState } from 'react';
import { t } from '../lib/i18n';
import { MessageCircle, Mail, Clock, Send, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'Безопасно ли использовать ваши услуги?',
    answer: 'Да, все наши услуги полностью безопасны. Мы не запрашиваем пароли от аккаунтов и используем только официальные методы продвижения. Ваш аккаунт остается под вашим полным контролем.'
  },
  {
    question: 'Как быстро начинается выполнение заказа?',
    answer: 'Большинство заказов начинают выполняться в течение 30 минут после оплаты. Время может варьироваться в зависимости от типа услуги и текущей загрузки.'
  },
  {
    question: 'Что делать, если подписчики или лайки исчезли?',
    answer: 'У нас есть гарантия на все услуги. Если количество уменьшилось в течение гарантийного периода, мы бесплатно пополним до заказанного объема. Обратитесь в поддержку с номером заказа.'
  },
  {
    question: 'Можно ли отменить заказ?',
    answer: 'Отменить заказ можно только до начала выполнения. Если работа уже началась, отмена невозможна. Рекомендуем внимательно проверять данные перед оплатой.'
  },
  {
    question: 'Какие способы оплаты вы принимаете?',
    answer: 'Мы принимаем оплату банковскими картами, электронными кошельками и банковскими переводами. Все платежи проходят через защищенные платежные системы.'
  },
  {
    question: 'Влияет ли накрутка на охваты и алгоритмы?',
    answer: 'Наши услуги помогают улучшить показатели аккаунта, что положительно влияет на алгоритмы социальных сетей. Качественные подписчики и активность способствуют органическому росту.'
  }
];

export const SupportPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь была бы логика отправки формы
    alert('Сообщение отправлено! Мы ответим в течение 24 часов.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Поддержка
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Мы всегда готовы помочь вам с любыми вопросами
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Methods */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">{t('support.contacts')}</h2>
          
          {/* Contact Cards */}
          <div className="space-y-4">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{t('support.telegram')}</h3>
                  <p className="text-gray-400">{t('support.telegramDesc')}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-white">@smmboost1bot</div>
                <div className="text-sm text-gray-400">Ответ в течение 5 минут</div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{t('support.email')}</h3>
                  <p className="text-gray-400">{t('support.emailDesc')}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-white">support.smm.boost.kz@gmail.com</div>
                <div className="text-sm text-gray-400">Ответ в течение 24 часов</div>
              </div>
            </div>

          </div>

          {/* Working Hours */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-6 h-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-white">{t('support.workHours')}</h3>
            </div>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Telegram поддержка:</span>
                <span className="text-green-400">24/7</span>
              </div>
              <div className="flex justify-between">
                <span>Email поддержка:</span>
                <span className="text-green-400">24/7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">{t('support.contactForm')}</h2>
          
          <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('support.name')}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder={t('support.namePlaceholder')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('support.email')}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder={t('support.emailPlaceholder')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('support.subject')}
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder={t('support.subjectPlaceholder')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('support.message')}
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={5}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder={t('support.messagePlaceholder')}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-pink-500/25"
            >
              <Send className="w-5 h-5" />
              <span>{t('support.send')}</span>
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          {t('support.faq')}
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700/50 transition-colors"
              >
                <span className="text-white font-medium">{faq.question}</span>
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              {openFaq === index && (
                <div className="px-6 pb-4 border-t border-gray-700">
                  <p className="text-gray-300 pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};