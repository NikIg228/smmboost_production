import React from 'react';
import { t } from '../../lib/i18n';
import { RefreshCw, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export const RefundPage: React.FC = () => {
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <RefreshCw className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Возврат средств
          </span>
        </h1>
        <p className="text-gray-400 text-lg">
          Условия и процедура возврата денежных средств
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-gray-300">
        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Юридическая информация</h2>
          <div className="space-y-1 text-sm text-gray-300">
            <p>ТОО "White Trade"</p>
            <p>БИН 250140025178</p>
            <p>Республика Казахстан, город Алматы, Бостандыкский район, Темирязева 69, почтовый индекс 050057</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            {t('refund.whenPossible')}
          </h2>
          <div className="space-y-3">
            <p>{t('refund.whenPossibleText')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('refund.notProvided')}</li>
              <li>{t('refund.insufficientQuantity')}</li>
              <li>{t('refund.technicalError')}</li>
              <li>{t('refund.cancelledByClient')}</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            Когда возврат невозможен
          </h2>
          <div className="space-y-3">
            <p>Возврат средств НЕ производится в случаях:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Услуга была предоставлена в полном объеме</li>
              <li>Клиент изменил настройки приватности аккаунта после заказа</li>
              <li>Аккаунт был заблокирован или удален после выполнения заказа</li>
              <li>Естественное снижение показателей со временем</li>
              <li>Клиент предоставил неверные данные для выполнения заказа</li>
              <li>Прошло более 30 дней с момента выполнения заказа</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Clock className="w-5 h-5 text-blue-500 mr-2" />
            Процедура возврата
          </h2>
          <div className="space-y-4">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Шаг 1: Обращение в поддержку</h3>
              <p>Напишите в Telegram @smmboost1bot или на email support.smm.boost.kz@gmail.com</p>
            </div>
            
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Шаг 2: Предоставьте информацию</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Номер заказа или чек об оплате</li>
                <li>Описание проблемы</li>
                <li>Скриншоты (если необходимо)</li>
              </ul>
            </div>
            
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Шаг 3: Рассмотрение заявки</h3>
              <p>Мы рассмотрим вашу заявку в течение 24 часов и дадим ответ</p>
            </div>
            
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Шаг 4: Возврат средств</h3>
              <p>При положительном решении возврат происходит в течение 3-7 рабочих дней</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Способы возврата
          </h2>
          <div className="space-y-3">
            <p>Возврат производится тем же способом, которым была произведена оплата:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Банковская карта:</strong> 3-7 рабочих дней</li>
              <li><strong>Kaspi Pay:</strong> 1-3 рабочих дня</li>
              <li><strong>Криптовалюта:</strong> в течение 24 часов</li>
              <li><strong>Электронные кошельки:</strong> 1-3 рабочих дня</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Частичный возврат
          </h2>
          <div className="space-y-3">
            <p>
              Если услуга была предоставлена частично, возможен частичный возврат средств 
              пропорционально невыполненному объему.
            </p>
            <p>
              Например, если заказано 1000 подписчиков, а предоставлено только 700, 
              возврат составит 30% от стоимости заказа.
            </p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Контакты для возврата
          </h2>
          <div className="space-y-2">
            <p><strong>Telegram:</strong> @smmboost1bot</p>
            <p><strong>Email:</strong> support.smm.boost.kz@gmail.com</p>
            <p><strong>Телефон:</strong> +7 707 345 12 12</p>
            <p className="text-sm text-gray-400 mt-4">
              Время работы поддержки: 24/7 (Telegram), 09:00-21:00 (телефон)
            </p>
          </div>
        </section>
      </div>

      <div className="text-center mt-8">
        <div className="bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-xl p-6 border border-purple-500/20">
          <p className="text-gray-300 mb-4">
            Мы стремимся решить все вопросы мирным путем и найти компромисс, 
            который устроит обе стороны.
          </p>
          <a
            href="https://t.me/smmboost1bot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            {t('refund.contactSupport')}
          </a>
        </div>
      </div>

      <div className="text-center mt-8 text-sm text-gray-500">
        Последнее обновление: 15 января 2024 года
      </div>
    </div>
  );
};