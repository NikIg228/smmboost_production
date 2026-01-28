import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Edit2, Save, X, Gift, History, Copy, Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { updateUserProfile } from '../lib/supabase';
import { PasswordChangeModal } from './PasswordChangeModal';
import { EmailChangeModal } from './EmailChangeModal';

export const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || ''
  });

  // Generate static referral code based on user ID
  useEffect(() => {
    if (user?.id) {
      // Generate deterministic code from user ID
      const hash = user.id.split('').reduce((acc, char) => {
        return ((acc << 5) - acc) + char.charCodeAt(0);
      }, 0);
      const code = 'REF' + String(Math.abs(hash)).slice(0, 5).padStart(5, '0');
      setReferralCode(code);
    }
  }, [user?.id]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await updateUserProfile(formData);
      if (error) throw error;
      
      setIsEditing(false);
      alert(t('profile.updateSuccess'));
    } catch (error: any) {
      alert(t('profile.updateError') + ': ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.user_metadata?.name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Empty purchase history
  const purchaseHistory: any[] = [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {t('profile.title')}
        </h1>
        <p className="text-gray-400">
          {t('profile.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Info */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="text-xl font-bold text-white">{t('profile.profileInfo')}</h2>
            {isEditing && (
              <div className="flex space-x-2 flex-shrink-0">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center px-2.5 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                  title={loading ? t('common.saving') : t('common.save')}
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center px-2.5 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  title={t('common.cancel')}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('profile.name')}
              </label>
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  />
                ) : (
                  <div className="flex-1 px-4 py-3 bg-gray-700/50 rounded-lg text-white">
                    {user?.user_metadata?.name || t('profile.notSpecified')}
                  </div>
                )}
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-2.5 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    title={t('common.edit')}
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('profile.email')}
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 px-4 py-3 bg-gray-700/50 rounded-lg text-white">
                  {user?.email}
                </div>
                <button
                  onClick={() => setShowEmailModal(true)}
                  className="flex items-center px-2.5 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  title={t('profile.changeEmail')}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('profile.password')}
              </label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 px-4 py-3 bg-gray-700/50 rounded-lg text-white">
                  ••••••••••••
                </div>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center px-2.5 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  title={t('profile.changePassword')}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Referral & Stats */}
        <div className="space-y-6">
          {/* Referral Code */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Gift className="w-5 h-5 text-pink-500 mr-2" />
              {t('profile.referralCode')}
            </h3>
            <div className="flex items-center space-x-2">
              <div className="flex-1 px-4 py-3 bg-gray-700 rounded-lg text-white font-mono text-lg">
                {referralCode}
              </div>
              <button
                onClick={copyReferralCode}
                className="flex items-center px-2.5 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                title={copied ? t('profile.copied') : t('profile.copy')}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {t('profile.referralCodeDescription')}
            </p>
          </div>

          {/* Coupon Counter */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">
              {t('profile.usedCoupons')}
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                0
              </div>
              <p className="text-gray-400">{t('profile.couponsUsed')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase History */}
      <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <History className="w-5 h-5 text-blue-500 mr-2" />
          {t('profile.purchaseHistory')}
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300 font-medium">{t('profile.service')}</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">{t('profile.quantity')}</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">{t('profile.amount')}</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">{t('profile.date')}</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">{t('profile.status')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="py-8 text-center">
                  <History className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">{t('profile.empty')}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Password Change Modal */}
      <PasswordChangeModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />

      {/* Email Change Modal */}
      {user?.email && (
        <EmailChangeModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          currentEmail={user.email}
        />
      )}
    </div>
  );
};