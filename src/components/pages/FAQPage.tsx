import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Как быстро запускается заказ?',
    answer: 'От 0 до 30 минут в среднем. Зависит от загруженности системы и типа услуги. Лайки обычно начинают поступать быстрее всего, подписчики могут занять до часа.'
  },
  {
    question: 'Будет ли подписка/лайк от живых аккаунтов?',
    answer: 'Да, мы используем только проверенные источники трафика. Все подписчики имеют аватары, посты и выглядят как реальные пользователи.'
  },
  {
    question: 'Как я могу оплатить заказ?',
    answer: 'Поддерживаем Kaspi Pay, банковские карты, криптовалюты, Qiwi. Можно уточнить доступные способы у поддержки в Telegram.'
  },
  {
    question: 'Можно ли вернуть деньги?',
    answer: 'Если услуга не была оказана в полном объеме, возврат возможен. Подробности в разделе "Возврат средств".'
  },
  {
    question: 'Безопасно ли это для моего аккаунта?',
    answer: 'Полностью безопасно. Мы не запрашиваем пароли, используем только публичные ссылки. Все методы соответствуют правилам социальных сетей.'
  },
  {
    question: 'Что делать если подписчики пропали?',
    answer: 'У нас есть гарантия на все услуги. Если в течение гарантийного периода количество уменьшилось, мы бесплатно довосполним до заказанного объема.'
  },
  {
    question: 'Можно ли заказать услуги для закрытого аккаунта?',
    answer: 'Для большинства услуг аккаунт должен быть открытым. Исключение - подписчики, их можно накрутить и на закрытые профили.'
  },
  {
    question: 'Есть ли скидки при больших заказах?',
    answer: 'Да, при заказах от 50 000₸ предоставляем скидку 10%. При заказах от 100 000₸ - скидка 15%. Обращайтесь в поддержку.'
  }
];

export const FAQPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Часто задаваемые вопросы
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Ответы на самые популярные вопросы о наших услугах
        </p>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
          >
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors"
            >
              <span className="text-white font-medium text-lg pr-4">{faq.question}</span>
              <div className="flex-shrink-0">
                {openFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-purple-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>
            
            {openFaq === index && (
              <div className="px-6 pb-5 border-t border-gray-700/50">
                <p className="text-gray-300 pt-4 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};