import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

export const AuthCallback: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Получаем параметры из URL
        const code = searchParams.get('code');
        const type = searchParams.get('type'); // 'signup', 'recovery', 'email_change', etc.
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        // Если есть ошибка в URL
        if (error) {
          setStatus('error');
          setMessage(errorDescription || error || t('authCallback.errors.generic') || 'Произошла ошибка');
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        // Если есть код, обмениваем его на сессию (PKCE flow)
        if (code) {
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          
          if (exchangeError) {
            setStatus('error');
            setMessage(t('authCallback.errors.invalidCode') || 'Неверный или истекший код подтверждения');
            setTimeout(() => navigate('/'), 3000);
            return;
          }

          if (data.session) {
            setStatus('success');
            
            // Определяем сообщение в зависимости от типа операции
            switch (type) {
              case 'signup':
                setMessage(t('authCallback.success.signup') || 'Email успешно подтвержден! Добро пожаловать!');
                break;
              case 'recovery':
                setMessage(t('authCallback.success.recovery') || 'Ссылка для сброса пароля подтверждена. Теперь вы можете установить новый пароль.');
                // Перенаправляем на страницу сброса пароля
                setTimeout(() => navigate('/reset-password'), 2000);
                return;
              case 'email_change':
                setMessage(t('authCallback.success.emailChange') || 'Email успешно изменен!');
                break;
              default:
                setMessage(t('authCallback.success.generic') || 'Операция успешно завершена!');
            }
            
            // Перенаправляем на главную через 2 секунды (если не recovery)
            if (type !== 'recovery') {
              setTimeout(() => navigate('/'), 2000);
            }
            return;
          }
        }

        // Если нет кода, проверяем существующую сессию
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          setStatus('error');
          setMessage(t('authCallback.errors.noSession') || 'Сессия не найдена. Пожалуйста, используйте ссылку из письма.');
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        // Если сессия есть, но нет кода - возможно это старый формат ссылки
        setStatus('success');
        setMessage(t('authCallback.success.generic') || 'Операция успешно завершена!');
        setTimeout(() => navigate('/'), 2000);
      } catch (err: any) {
        setStatus('error');
        setMessage(err.message || t('authCallback.errors.generic') || 'Произошла ошибка');
        setTimeout(() => navigate('/'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate, t]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 shadow-xl text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-white mb-2">
              {t('authCallback.loading') || 'Обработка запроса...'}
            </h2>
            <p className="text-gray-400">
              {t('authCallback.loadingDescription') || 'Пожалуйста, подождите'}
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              {t('authCallback.successTitle') || 'Успешно!'}
            </h2>
            <p className="text-gray-300 mb-4">{message}</p>
            <p className="text-sm text-gray-400">
              {t('authCallback.redirecting') || 'Перенаправление...'}
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              {t('authCallback.errorTitle') || 'Ошибка'}
            </h2>
            <p className="text-gray-300 mb-4">{message}</p>
            <button
              onClick={() => navigate('/')}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              {t('authCallback.backToHome') || 'Вернуться на главную'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
