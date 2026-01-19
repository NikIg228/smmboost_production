import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, CheckCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {t('terms.title')}
          </span>
        </h1>
        <p className="text-gray-400 text-lg">
          {t('terms.subtitle')}
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-gray-300">
        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">{t('terms.legalInfo')}</h2>
          <div className="space-y-4 text-sm text-gray-300">
            <div className="space-y-1">
              <p>{t('terms.company1.name')}</p>
              <p>{t('terms.company1.bin')}</p>
              <p>{t('terms.company1.address')}</p>
            </div>
            <div className="space-y-1 pt-3 border-t border-gray-700/50">
              <p>{t('terms.company2.name')}</p>
              <p>{t('terms.company2.bin')}</p>
              <p>{t('terms.company2.address')}</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            1. {t('terms.general')}
          </h2>
          <div className="space-y-3">
            <p>
              {t('terms.generalText1')}
            </p>
            <p>
              {t('terms.generalText2')}
            </p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            2. {t('terms.services')}
          </h2>
          <div className="space-y-3">
            <p>{t('terms.servicesText')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('terms.followersService')}</li>
              <li>{t('terms.likesService')}</li>
              <li>{t('terms.viewsService')}</li>
              <li>{t('terms.otherServices')}</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            3. {t('terms.obligations')}
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('terms.ourObligations')}</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>{t('terms.ourObligation1')}</li>
                <li>{t('terms.ourObligation2')}</li>
                <li>{t('terms.ourObligation3')}</li>
                <li>{t('terms.ourObligation4')}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{t('terms.clientObligations')}</h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>{t('terms.clientObligation1')}</li>
                <li>{t('terms.clientObligation2')}</li>
                <li>{t('terms.clientObligation3')}</li>
                <li>{t('terms.clientObligation4')}</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            4. {t('terms.payment')}
          </h2>
          <div className="space-y-3">
            <p>
              {t('terms.paymentText')}
            </p>
            <p>
              {t('terms.refundText')}
            </p>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            5. {t('terms.restrictions')}
          </h2>
          <div className="space-y-3">
            <p>{t('terms.restrictionsText')}</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>{t('terms.restriction1')}</li>
              <li>{t('terms.restriction2')}</li>
              <li>{t('terms.restriction3')}</li>
              <li>{t('terms.restriction4')}</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            6. {t('terms.contactInfo')}
          </h2>
        </section>
      </div>

      <div className="text-center mt-8 text-sm text-gray-500">
        {t('terms.lastUpdate')}
      </div>
    </div>
  );
};