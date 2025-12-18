import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Lock, Eye, Database } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {t('privacy.title')}
          </span>
        </h1>
        <p className="text-gray-400 text-lg">
          {t('privacy.subtitle')}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-gray-300">
        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">{t('privacy.legalInfo')}</h2>
          <div className="space-y-1 text-sm text-gray-300">
            <p>ТОО "White Trade"</p>
            <p>БИН 250140025178</p>
            <p>Казахстан, г. Алматы, Бостандыкский район, Темирязева 69, 050057</p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Database className="w-5 h-5 text-blue-500 mr-2" />
            1. {t('privacy.dataCollection')}
          </h2>
          <div className="space-y-3">
            <p>
              {t('privacy.dataCollectionText')}
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('privacy.contactData')}</li>
              <li>{t('privacy.socialLinks')}</li>
              <li>{t('privacy.orderInfo')}</li>
              <li>{t('privacy.technicalInfo')}</li>
            </ul>
            <p className="text-yellow-400 font-medium">
              ⚠️ {t('privacy.noPasswords')}
            </p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Eye className="w-5 h-5 text-green-500 mr-2" />
            2. {t('privacy.dataUsage')}
          </h2>
          <div className="space-y-3">
            <p>{t('privacy.dataUsageText')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('privacy.serviceDelivery')}</li>
              <li>{t('privacy.communication')}</li>
              <li>{t('privacy.support')}</li>
              <li>{t('privacy.qualityImprovement')}</li>
              <li>{t('privacy.legalCompliance')}</li>
            </ul>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mt-4">
              <p className="text-green-400 font-medium">
                ✅ {t('privacy.noThirdParty')}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Lock className="w-5 h-5 text-purple-500 mr-2" />
            3. {t('privacy.dataProtection')}
          </h2>
          <div className="space-y-3">
            <p>{t('privacy.dataProtectionText')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('privacy.sslEncryption')}</li>
              <li>{t('privacy.secureStorage')}</li>
              <li>{t('privacy.limitedAccess')}</li>
              <li>{t('privacy.securityChecks')}</li>
              <li>{t('privacy.standardsCompliance')}</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            4. {t('privacy.yourRights')}
          </h2>
          <div className="space-y-3">
            <p>{t('privacy.yourRightsText')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('privacy.requestInfo')}</li>
              <li>{t('privacy.correctData')}</li>
              <li>{t('privacy.deleteData')}</li>
              <li>{t('privacy.limitProcessing')}</li>
              <li>{t('privacy.withdrawConsent')}</li>
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
            <p>
              <strong>Telegram:</strong>{' '}
              <a 
                href="https://t.me/qmzp101" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                @qmzp101
              </a>
            </p>           
          </div>
        </section>
      </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          {t('privacy.lastUpdate')}
        </div>
    </div>
  );
};