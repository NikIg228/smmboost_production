import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 lg:gap-6">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                SMM Boost
              </span>
            </div>
            <p className="text-gray-400">
              {t('footer.description')}
            </p>
            <div className="text-gray-400 text-sm space-y-1 pt-2">
              <p className="text-gray-500 uppercase tracking-wider text-xs">{t('footer.legalInfo')}</p>
              <div className="space-y-3">
                <div className="space-y-1">
                  <p>{t('footer.company1.name')}</p>
                  <p>{t('footer.company1.bin')}</p>
                  <p>{t('footer.company1.address')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">{t('footer.services')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link 
                  to="/services"
                  className="hover:text-white transition-colors block"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link 
                  to="/services"
                  className="hover:text-white transition-colors block"
                >
                  TikTok
                </Link>
              </li>
              <li>
                <Link 
                  to="/services"
                  className="hover:text-white transition-colors block"
                >
                  YouTube
                </Link>
              </li>
              <li>
                <Link 
                  to="/services"
                  className="hover:text-white transition-colors block"
                >
                  Telegram
                </Link>
              </li>
              <li>
                <Link 
                  to="/services"
                  className="hover:text-white transition-colors block"
                >
                  VK
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Information */}
          <div className="space-y-4 -ml-2 sm:-ml-1 lg:-ml-2">
            <h3 className="text-lg font-semibold text-white">{t('footer.legalInfo')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link 
                  to="/terms"
                  className="hover:text-white transition-colors block"
                >
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy"
                  className="hover:text-white transition-colors block"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/refund"
                  className="hover:text-white transition-colors block"
                >
                  {t('footer.refund')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 pt-8 text-center text-gray-400">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
};