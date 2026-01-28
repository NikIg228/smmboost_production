import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const ResetPassword: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    // Проверяем наличие сессии после перехода по ссылке из письма
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          setError(t('resetPassword.errors.sessionError') || 'Ошибка проверки сессии');
          return;
        }

        if (!session) {
          // Пытаемся обменять код на сессию (для PKCE flow)
          const code = searchParams.get('code');
          if (code) {
            const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
            if (exchangeError) {
              setError(t('resetPassword.errors.invalidLink') || 'Неверная или истекшая ссылка');
              return;
            }
            if (data.session) {
              setIsValidSession(true);
              return;
            }
          }
          setError(t('resetPassword.errors.noSession') || 'Сессия не найдена. Пожалуйста, используйте ссылку из письма.');
        } else {
          setIsValidSession(true);
        }
      } catch (err: any) {
        setError(t('resetPassword.errors.generic') || 'Произошла ошибка');
      }
    };

    checkSession();
  }, [searchParams, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Валидация
    if (formData.password.length < 8) {
      setError(t('resetPassword.errors.minLength') || 'Пароль должен содержать минимум 8 символов');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(t('resetPassword.errors.mismatch') || 'Пароли не совпадают');
      setLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: formData.password
      });

      if (updateError) throw updateError;

      setSuccess(true);
      
      // Перенаправляем на главную через 2 секунды
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err: any) {
      let errorMessage = t('resetPassword.errors.generic') || 'Произошла ошибка при сбросе пароля';
      
      if (err.message?.includes('session')) {
        errorMessage = t('resetPassword.errors.sessionExpired') || 'Сессия истекла. Пожалуйста, запросите новую ссылку для сброса пароля.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  if (!isValidSession && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 shadow-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-300">{t('resetPassword.checking') || 'Проверка сессии...'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">
          {t('resetPassword.title') || 'Сброс пароля'}
        </h1>
        <p className="text-gray-400 text-sm mb-6 text-center">
          {t('resetPassword.description') || 'Введите новый пароль для вашего аккаунта'}
        </p>

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 mb-4">
            <p className="text-green-400 text-sm">
              {t('resetPassword.success') || 'Пароль успешно изменен! Перенаправление...'}
            </p>
          </div>
        )}

        {!success && isValidSession && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('resetPassword.newPassword') || 'Новый пароль'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPasswords.password ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder={t('resetPassword.newPasswordPlaceholder') || 'Введите новый пароль'}
                  required
                  disabled={loading}
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPasswords.password ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {t('resetPassword.minLengthHint') || 'Минимум 8 символов'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('resetPassword.confirmPassword') || 'Подтвердите пароль'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPasswords.confirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  placeholder={t('resetPassword.confirmPasswordPlaceholder') || 'Повторите новый пароль'}
                  required
                  disabled={loading}
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPasswords.confirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (t('common.loading') || 'Загрузка...') : (t('resetPassword.button') || 'Изменить пароль')}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                {t('resetPassword.backToHome') || 'Вернуться на главную'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
