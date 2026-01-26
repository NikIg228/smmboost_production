import React from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export const RefundPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <RefreshCw className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {t('refund.title')}
          </span>
        </h1>
        <p className="text-gray-400 text-lg">
          {t('refund.subtitle')}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-gray-300">
        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">{t('refund.legalInfo')}</h2>
          <div className="space-y-4 text-sm text-gray-300">
            <div className="space-y-1">
              <p>{t('refund.company1.name')}</p>
              <p>{t('refund.company1.bin')}</p>
              <p>{t('refund.company1.address')}</p>
            </div>
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
            {t('refund.whenNotPossible')}
          </h2>
          <div className="space-y-3">
            <p>{t('refund.whenNotPossibleText')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('refund.notPossible1')}</li>
              <li>{t('refund.notPossible2')}</li>
              <li>{t('refund.notPossible3')}</li>
              <li>{t('refund.notPossible4')}</li>
              <li>{t('refund.notPossible5')}</li>
              <li>{t('refund.notPossible6')}</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Clock className="w-5 h-5 text-blue-500 mr-2" />
            {t('refund.procedure')}
          </h2>
          <div className="space-y-4">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{t('refund.step1')}</h3>
              <p>{t('refund.step1Text')}</p>
            </div>
            
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{t('refund.step2')}</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>{t('refund.step2Item1')}</li>
                <li>{t('refund.step2Item2')}</li>
                <li>{t('refund.step2Item3')}</li>
              </ul>
            </div>
            
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{t('refund.step3')}</h3>
              <p>{t('refund.step3Text')}</p>
            </div>
            
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">{t('refund.step4')}</h3>
              <p>{t('refund.step4Text')}</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            {t('refund.methods')}
          </h2>
          <div className="space-y-3">
            <p>{t('refund.methodsText')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>{t('refund.card')}</strong> {t('refund.cardTime')}</li>
              <li><strong>{t('refund.ewallet')}</strong> {t('refund.ewalletTime')}</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            {t('refund.partial')}
          </h2>
          <div className="space-y-3">
            <p>
              {t('refund.partialText1')}
            </p>
            <p>
              {t('refund.partialText2')}
            </p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            {t('refund.contacts')}
          </h2>
          <div className="space-y-2">
            <p>
              {t('refund.contactText')}{' '}
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  window.dispatchEvent(new CustomEvent('pageChange', { detail: 'support' }));
                }}
                className="text-pink-500 hover:text-pink-400 underline transition-colors"
              >
                {t('refund.contactTextLink')}
              </button>
            </p>
          </div>
        </section>
      </div>

      <div className="text-center mt-8 text-sm text-gray-500">
        {t('refund.lastUpdate')}
      </div>
    </div>
  );
};