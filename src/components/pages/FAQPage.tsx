import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  const faqs = [
    {
      question: t('faq.questions.speed.question'),
      answer: t('faq.questions.speed.answer')
    },
    {
      question: t('faq.questions.realAccounts.question'),
      answer: t('faq.questions.realAccounts.answer')
    },
    {
      question: t('faq.questions.refund.question'),
      answer: t('faq.questions.refund.answer')
    },
    {
      question: t('faq.questions.safe.question'),
      answer: t('faq.questions.safe.answer')
    },
    {
      question: t('faq.questions.disappeared.question'),
      answer: t('faq.questions.disappeared.answer')
    },
    {
      question: t('faq.questions.closedAccount.question'),
      answer: t('faq.questions.closedAccount.answer')
    },
    {
      question: t('faq.questions.discounts.question'),
      answer: t('faq.questions.discounts.answer')
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {t('faq.title')}
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          {t('faq.subtitle')}
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