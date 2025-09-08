import React, { useState, useEffect } from 'react';
import { User, Mail, Edit2, Save, X, Gift, History, Copy, Check, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { updateUserProfile } from '../lib/supabase';
import { PasswordChangeModal } from './PasswordChangeModal';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.user_metadata?.name || '',
    email: user?.email || ''
  });

  // Generate referral code
  useEffect(() => {
    if (user) {
      const code = 'REF' + Math.floor(10000 + Math.random() * 90000);
      setReferralCode(code);
    }
  }, [user]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const { error } = await updateUserProfile(formData);
      if (error) throw error;
      
      setIsEditing(false);
      alert('Профиль успешно обновлен!');
    } catch (error: any) {
      alert('Ошибка при обновлении профиля: ' + error.message);
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
          Личный кабинет
        </h1>
        <p className="text-gray-400">
          Управляйте своим профилем и отслеживайте заказы
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Info */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Информация профиля</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
                <span>Редактировать</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? 'Сохранение...' : 'Сохранить'}</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span>Отмена</span>
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Имя
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              ) : (
                <div className="px-4 py-3 bg-gray-700/50 rounded-lg text-white">
                  {user?.user_metadata?.name || 'Не указано'}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <div className="px-4 py-3 bg-gray-700/50 rounded-lg text-white">
                {user?.email}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Email нельзя изменить
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Пароль
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex-1 px-4 py-3 bg-gray-700/50 rounded-lg text-white">
                  ••••••••••••
                </div>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors min-h-[44px]"
                >
                  <Lock className="w-4 h-4" />
                  <span>Изменить</span>
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Нажмите "Изменить" для смены пароля
              </p>
            </div>
          </div>
        </div>

        {/* Referral & Stats */}
        <div className="space-y-6">
          {/* Referral Code */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <Gift className="w-5 h-5 text-pink-500 mr-2" />
              Реферальный код
            </h3>
            <div className="flex items-center space-x-3">
              <div className="flex-1 px-4 py-3 bg-gray-700 rounded-lg text-white font-mono text-lg">
                {referralCode}
              </div>
              <button
                onClick={copyReferralCode}
                className="flex items-center space-x-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Скопировано!' : 'Копировать'}</span>
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Поделитесь кодом с друзьями и получайте бонусы за каждый их заказ
            </p>
          </div>

          {/* Coupon Counter */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-4">
              Использованные купоны
            </h3>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                0
              </div>
              <p className="text-gray-400">купонов использовано</p>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase History */}
      <div className="mt-8 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center">
          <History className="w-5 h-5 text-blue-500 mr-2" />
          История покупок
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Услуга</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Количество</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Сумма</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Дата</th>
                <th className="text-left py-3 px-4 text-gray-300 font-medium">Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="py-8 text-center">
                  <History className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Пусто</p>
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
    </div>
  );
};