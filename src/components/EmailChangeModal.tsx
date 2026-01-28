import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from './Modal';
import { Mail, X } from 'lucide-react';
import { updateUserEmail } from '../lib/supabase';

interface EmailChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentEmail: string;
}

export const EmailChangeModal: React.FC<EmailChangeModalProps> = ({ isOpen, onClose, currentEmail }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    oldEmail: '',
    newEmail: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const firstInputRef = useRef<HTMLInputElement>(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        oldEmail: currentEmail,
        newEmail: ''
      });
      setError(null);
      setSuccess(false);
      // Focus first input after animation
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    } else {
      setFormData({
        oldEmail: '',
        newEmail: ''
      });
      setError(null);
      setSuccess(false);
    }
  }, [isOpen, currentEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validation
    if (!formData.oldEmail.trim()) {
      setError(t('emailChange.errors.oldEmailRequired'));
      setLoading(false);
      return;
    }

    if (!formData.newEmail.trim()) {
      setError(t('emailChange.errors.newEmailRequired'));
      setLoading(false);
      return;
    }

    if (formData.oldEmail === formData.newEmail) {
      setError(t('emailChange.errors.sameEmail'));
      setLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.newEmail)) {
      setError(t('emailChange.errors.invalidEmail'));
      setLoading(false);
      return;
    }

    if (formData.oldEmail !== currentEmail) {
      setError(t('emailChange.errors.oldEmailMismatch'));
      setLoading(false);
      return;
    }

    try {
      const { error } = await updateUserEmail(formData.newEmail);
      if (error) throw error;
      
      setSuccess(true);
      // Close modal after 3 seconds
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error: any) {
      let errorMessage = t('emailChange.errors.generic');
      if (error.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({
      oldEmail: '',
      newEmail: ''
    });
    setError(null);
    setSuccess(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={t('emailChange.title')}>
      <div className="space-y-6">
        <p className="text-sm text-gray-300">
          {t('emailChange.description')}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Old Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('emailChange.oldEmail')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={firstInputRef}
                type="email"
                value={formData.oldEmail}
                onChange={(e) => setFormData({ ...formData, oldEmail: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder={t('emailChange.oldEmailPlaceholder')}
                required
                disabled={loading}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {t('emailChange.oldEmailHint')}
            </p>
          </div>

          {/* New Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('emailChange.newEmail')}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={formData.newEmail}
                onChange={(e) => setFormData({ ...formData, newEmail: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder={t('emailChange.newEmailPlaceholder')}
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Divider before button */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
              <p className="text-green-400 text-sm">{t('emailChange.success')}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? t('common.loading') : t('emailChange.button')}
          </button>
        </form>
      </div>
    </Modal>
  );
};
