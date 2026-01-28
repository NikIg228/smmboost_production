import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from './Modal';
import { Mail, Lock, User, Gift } from 'lucide-react';
import { signUp, signIn, signInWithGoogle, resetPassword } from '../lib/supabase';
import { GoogleButton } from './GoogleButton';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onModeChange?: (mode: 'login' | 'register') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onModeChange }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [view, setView] = useState<'auth' | 'reset'>('auth');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (view !== 'auth') return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (mode === 'register' && formData.password !== formData.confirmPassword) {
      setError(t('auth.register.passwordMismatch'));
      setLoading(false);
      return;
    }
    
    try {
      if (mode === 'register') {
        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) throw error;
        setSuccess(t('auth.register.success'));

        // После успешной регистрации переключаемся на форму входа
        // Оставляем email, очищаем пароли
        if (onModeChange) {
          setTimeout(() => {
            setFormData(prev => ({
              ...prev,
              password: '',
              confirmPassword: ''
            }));
            onModeChange('login');
          }, 2000);
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
        onClose();
      }
    } catch (error: any) {
      let errorMessage = t('auth.errors.generic');
      
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = t('auth.errors.invalidCredentials');
      } else if (error.message?.includes('Email not confirmed')) {
        errorMessage = t('auth.errors.emailNotConfirmed');
      } else if (error.message?.includes('User already registered') || error.message?.includes('already been registered')) {
        errorMessage = t('auth.errors.userExists');
        if (onModeChange) {
          setTimeout(() => {
            onModeChange('login');
            setError(null);
          }, 3000);
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);
    
    try {
      const { error } = await signInWithGoogle();
      if (error) throw error;
      // User will be redirected to Google, so we don't close the modal here
    } catch (error: any) {
      let errorMessage = t('auth.errors.googleError');
      if (error.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForgotPasswordClick = () => {
    setError(null);
    setSuccess(null);
    setView('reset');
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      setError(t('auth.forgotPassword.emailRequired'));
      return;
    }

    setResetPasswordLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const { error } = await resetPassword(formData.email);
      if (error) throw error;
      setSuccess(t('auth.forgotPassword.success'));
    } catch (error: any) {
      let errorMessage = t('auth.forgotPassword.error');
      if (error.message) {
        errorMessage = error.message;
      }
      setError(errorMessage);
    } finally {
      setResetPasswordLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({ name: '', email: '', password: '', confirmPassword: '', referralCode: '' });
    setError(null);
    setSuccess(null);
    setView('auth');
  };

  const title = view === 'reset'
    ? t('auth.forgotPassword.title')
    : (mode === 'login' ? t('auth.login.title') : t('auth.register.title'));

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={title}>
      <div className="space-y-6">
        {view === 'auth' ? (
          <>
            {/* Google Sign In Button */}
            <GoogleButton
              onClick={handleGoogleSignIn}
              loading={googleLoading}
              text={mode === 'login' ? t('auth.login.googleButton') : t('auth.register.googleButton')}
            />

            {/* Divider */}
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-gray-800 text-gray-400">{t('common.or')}</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-300">
            {t('auth.forgotPassword.description')}
          </p>
        )}

        {/* Auth / Reset Forms */}
        {view === 'auth' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('auth.register.name')}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder={t('auth.register.namePlaceholder')}
                required
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              placeholder={mode === 'login' ? t('auth.login.emailPlaceholder') : t('auth.register.emailPlaceholder')}
              required={mode === 'register'}
            />
          </div>
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('profile.password')}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              placeholder={mode === 'login' ? t('auth.login.passwordPlaceholder') : t('auth.register.passwordPlaceholder')}
              required={mode === 'register'}
            />
          </div>
          {mode === 'login' && (
            <div className="mt-2 text-right">
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                disabled={resetPasswordLoading}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resetPasswordLoading ? t('common.loading') : t('auth.forgotPassword.link')}
              </button>
            </div>
          )}
        </div>

        {mode === 'register' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('auth.register.confirmPassword')}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder={t('auth.register.confirmPasswordPlaceholder')}
                required
              />
            </div>
          </div>
        )}

        {/* Divider before promo code */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
        </div>

        {/* Referral Code Field */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t('auth.referralCode')}
          </label>
          <div className="relative">
            <Gift className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.referralCode}
              onChange={(e) => setFormData({...formData, referralCode: e.target.value})}
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              placeholder={t('auth.referralCodePlaceholder')}
            />
          </div>
        </div>

        {/* Divider before button */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
        </div>

        {/* Error message (над кнопками Войти/Зарегистрироваться) */}
        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Success message (над кнопками Войти/Зарегистрироваться) */}
        {success && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
            <p className="text-green-400 text-sm">{success}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? t('common.loading') : (mode === 'login' ? t('auth.login.button') : t('auth.register.button'))}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={() => onModeChange && onModeChange(mode === 'login' ? 'register' : 'login')}
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
          >
            {mode === 'login' ? t('auth.login.noAccount') : t('auth.register.hasAccount')}
          </button>
        </div>
        </form>
        ) : (
        <form onSubmit={handleResetSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder={t('auth.login.emailPlaceholder')}
                required
              />
            </div>
          </div>

          {/* Divider before button */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
          </div>

          {/* Error message (над кнопкой) */}
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Success message (над кнопкой) */}
          {success && (
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
              <p className="text-green-400 text-sm">{success}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={resetPasswordLoading}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-pink-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {resetPasswordLoading ? t('common.loading') : t('auth.forgotPassword.button')}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setView('auth')}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              {mode === 'login' ? t('auth.login.title') : t('auth.register.title')}
            </button>
          </div>
        </form>
        )}
      </div>
    </Modal>
  );
};