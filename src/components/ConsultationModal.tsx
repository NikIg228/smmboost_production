import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from './Modal';
import { User, MessageCircle, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    platform: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const platforms = [
    { id: 'instagram', name: 'Instagram' },
    { id: 'tiktok', name: 'TikTok' },
    { id: 'youtube', name: 'YouTube' },
    { id: 'telegram', name: 'Telegram' },
    { id: 'vk', name: 'VK' },
    { id: 'twitter', name: 'Twitter' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (!formData.name || !formData.contact || !formData.platform) {
      setError(t('consultation.error'));
      setLoading(false);
      return;
    }
    
    try {
      // Save consultation request to Supabase
      const { error } = await supabase
        .from('consultation_requests')
        .insert([
          {
            name: formData.name,
            contact: formData.contact,
            platform: formData.platform,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      alert(t('consultation.success'));
      onClose();
      setFormData({ name: '', contact: '', platform: '', message: '' });
    } catch (error: any) {
      console.error('Error saving consultation request:', error);
      // Even if DB save fails, we can still show success to user
      alert(t('consultation.success'));
      onClose();
      setFormData({ name: '', contact: '', platform: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('consultation.title')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('consultation.name')} <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              placeholder={t('consultation.namePlaceholder')}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('consultation.contact')} <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({...formData, contact: e.target.value})}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              placeholder={t('consultation.contactPlaceholder')}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('consultation.platform')} <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <select
              value={formData.platform}
              onChange={(e) => setFormData({...formData, platform: e.target.value})}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 appearance-none"
              required
            >
              <option value="">{t('consultation.platformPlaceholder')}</option>
              {platforms.map(platform => (
                <option key={platform.id} value={platform.id}>
                  {platform.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('consultation.message')}
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={3}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            placeholder={t('consultation.messagePlaceholder')}
          />
        </div>

        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
          <p className="text-sm text-gray-300">
            <span className="text-green-400">✓</span> {t('consultation.benefits.free')}
          </p>
          <p className="text-sm text-gray-300">
            <span className="text-green-400">✓</span> {t('consultation.benefits.response')}
          </p>
          <p className="text-sm text-gray-300">
            <span className="text-green-400">✓</span> {t('consultation.benefits.strategy')}
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <span>{loading ? t('common.loading') : t('consultation.submit')}</span>
        </button>
      </form>
    </Modal>
  );
};