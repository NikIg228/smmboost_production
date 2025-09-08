import React from 'react';
import { Shield, Lock, Eye, Database } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Политика конфиденциальности
          </span>
        </h1>
        <p className="text-gray-400 text-lg">
          Как мы защищаем и используем ваши данные
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-gray-300">
        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Database className="w-5 h-5 text-blue-500 mr-2" />
            1. Сбор информации
          </h2>
          <div className="space-y-3">
            <p>
              Мы собираем только необходимую информацию для предоставления услуг:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Контактные данные (email, телефон, Telegram)</li>
              <li>Ссылки на профили в социальных сетях</li>
              <li>Информацию о заказах и платежах</li>
              <li>Техническую информацию (IP-адрес, браузер)</li>
            </ul>
            <p className="text-yellow-400 font-medium">
              ⚠️ Мы НИКОГДА не запрашиваем пароли от ваших аккаунтов!
            </p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Eye className="w-5 h-5 text-green-500 mr-2" />
            2. Использование данных
          </h2>
          <div className="space-y-3">
            <p>Ваши данные используются исключительно для:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Выполнения заказанных услуг</li>
              <li>Связи с вами по вопросам заказов</li>
              <li>Предоставления технической поддержки</li>
              <li>Улучшения качества сервиса</li>
              <li>Соблюдения законодательных требований</li>
            </ul>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mt-4">
              <p className="text-green-400 font-medium">
                ✅ Мы НЕ передаем ваши данные третьим лицам для маркетинговых целей
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Lock className="w-5 h-5 text-purple-500 mr-2" />
            3. Защита данных
          </h2>
          <div className="space-y-3">
            <p>Для защиты ваших данных мы применяем:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>SSL-шифрование для всех соединений</li>
              <li>Безопасное хранение данных на защищенных серверах</li>
              <li>Ограниченный доступ сотрудников к персональным данным</li>
              <li>Регулярные проверки безопасности системы</li>
              <li>Соответствие международным стандартам защиты</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            4. Ваши права
          </h2>
          <div className="space-y-3">
            <p>Вы имеете право:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Запросить информацию о хранящихся данных</li>
              <li>Потребовать исправления неточных данных</li>
              <li>Запросить удаление ваших данных</li>
              <li>Ограничить обработку данных</li>
              <li>Отозвать согласие на обработку</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            5. Cookies и аналитика
          </h2>
          <div className="space-y-3">
            <p>
              Мы используем cookies для улучшения работы сайта и анализа трафика. 
              Вы можете отключить cookies в настройках браузера.
            </p>
            <p>
              Для анализа посещаемости используются анонимные данные, которые не позволяют 
              идентифицировать конкретного пользователя.
            </p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            6. Изменения в политике
          </h2>
          <div className="space-y-3">
            <p>
              Мы можем обновлять данную политику конфиденциальности. О существенных 
              изменениях мы уведомим вас по email или через уведомления на сайте.
            </p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            7. Контакты
          </h2>
          <div className="space-y-2">
            <p>По вопросам конфиденциальности обращайтесь:</p>
            <p><strong>Email:</strong> support.smm.boost.kz@gmail.com</p>
            <p><strong>Telegram:</strong> @smm.boost.kz</p>
            <p><strong>Телефон:</strong> +7 707 345 12 12</p>
          </div>
        </section>
      </div>

      <div className="text-center mt-8 text-sm text-gray-500">
        Последнее обновление: 15 января 2024 года
      </div>
    </div>
  );
};