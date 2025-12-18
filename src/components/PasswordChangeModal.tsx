import React, { useState, useEffect, useRef } from 'react';
import { X, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PasswordStrength {
  score: number;
  feedback: string[];
  color: string;
  label: string;
}

export const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [],
    color: 'text-gray-400',
    label: 'Слабый'
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
      // Focus first input after animation
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    } else {
      document.body.classList.remove('modal-open');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setError(null);
      setSuccess(false);
      setPasswordStrength({ score: 0, feedback: [], color: 'text-gray-400', label: 'Слабый' });
    }

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  // Keyboard event handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      }

      // Focus trap
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Password strength calculation
  const calculatePasswordStrength = (password: string): PasswordStrength => {
    let score = 0;
    const feedback: string[] = [];

    if (password.length === 0) {
      return { score: 0, feedback: [], color: 'text-gray-400', label: 'Введите пароль' };
    }

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('Минимум 8 символов');
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Строчные буквы');
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Заглавные буквы');
    }

    if (/\d/.test(password)) {
      score += 1;
    } else {
      feedback.push('Цифры');
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Специальные символы');
    }

    const strengthMap = {
      0: { color: 'text-red-400', label: 'Очень слабый' },
      1: { color: 'text-red-400', label: 'Слабый' },
      2: { color: 'text-yellow-400', label: 'Средний' },
      3: { color: 'text-yellow-400', label: 'Хороший' },
      4: { color: 'text-green-400', label: 'Сильный' },
      5: { color: 'text-green-400', label: 'Очень сильный' }
    };

    const strength = strengthMap[score as keyof typeof strengthMap] || strengthMap[0];

    return {
      score,
      feedback,
      color: strength.color,
      label: strength.label
    };
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.newPassword));
  }, [formData.newPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (!formData.currentPassword) {
      setError('Введите текущий пароль');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      setError('Новый пароль должен содержать минимум 8 символов');
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      setLoading(false);
      return;
    }

    if (passwordStrength.score < 3) {
      setError('Пароль слишком слабый. Используйте более сложный пароль.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword
      });

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error: any) {
      let errorMessage = 'Произошла ошибка при смене пароля';
      
      if (error.message?.includes('Invalid login credentials')) {
        errorMessage = 'Неверный текущий пароль';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/75 backdrop-blur-sm z-[9990] transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div 
        ref={modalRef}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="password-modal-title"
        aria-describedby="password-modal-description"
      >
        <div 
          className="bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div>
              <h2 id="password-modal-title" className="text-xl font-bold text-white">
                Изменить пароль
              </h2>
              <p id="password-modal-description" className="text-sm text-gray-400 mt-1">
                Обновите пароль для вашего аккаунта
              </p>
            </div>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0 ml-4"
              aria-label="Закрыть модальное окно"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {success ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Пароль изменен!</h3>
                <p className="text-gray-300">Ваш пароль был успешно обновлен</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Текущий пароль <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      ref={firstInputRef}
                      type={showPasswords.current ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                      className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="Введите текущий пароль"
                      required
                      aria-describedby="current-password-help"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      aria-label={showPasswords.current ? 'Скрыть пароль' : 'Показать пароль'}
                    >
                      {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p id="current-password-help" className="text-xs text-gray-500 mt-1">
                    Введите ваш действующий пароль для подтверждения
                  </p>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Новый пароль <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                      className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="Введите новый пароль"
                      required
                      minLength={8}
                      aria-describedby="new-password-strength"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      aria-label={showPasswords.new ? 'Скрыть пароль' : 'Показать пароль'}
                    >
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {formData.newPassword && (
                    <div id="new-password-strength" className="mt-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">Сложность пароля:</span>
                        <span className={`text-xs font-medium ${passwordStrength.color}`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      
                      {/* Strength Bar */}
                      <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            passwordStrength.score <= 1 ? 'bg-red-500' :
                            passwordStrength.score <= 2 ? 'bg-yellow-500' :
                            passwordStrength.score <= 3 ? 'bg-yellow-400' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        />
                      </div>
                      
                      {/* Requirements */}
                      {passwordStrength.feedback.length > 0 && (
                        <div className="text-xs text-gray-400">
                          <span>Требования: </span>
                          <span>{passwordStrength.feedback.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Подтвердите пароль <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className={`w-full pl-10 pr-12 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                        formData.confirmPassword && formData.newPassword !== formData.confirmPassword
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-gray-600 focus:border-purple-500 focus:ring-purple-500/20'
                      }`}
                      placeholder="Повторите новый пароль"
                      required
                      aria-describedby="confirm-password-help"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      aria-label={showPasswords.confirm ? 'Скрыть пароль' : 'Показать пароль'}
                    >
                      {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                    <p id="confirm-password-help" className="text-xs text-red-400 mt-1">
                      Пароли не совпадают
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading || passwordStrength.score < 3 || formData.newPassword !== formData.confirmPassword}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-pink-500/25 disabled:transform-none min-h-[44px]"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        <span>Изменение...</span>
                      </>
                    ) : (
                      <span>Изменить пароль</span>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-all duration-200 min-h-[44px]"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};