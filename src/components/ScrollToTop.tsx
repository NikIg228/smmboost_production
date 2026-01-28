import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Компонент для автоматической прокрутки страницы наверх при изменении роута
 * Мгновенно прокручивает страницу наверх без анимации при переходе между страницами
 */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Мгновенная прокрутка наверх при изменении пути
    // Используем прямой вызов для максимальной совместимости
    window.scrollTo(0, 0);
    
    // Также прокручиваем documentElement для надежности
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname]);

  return null;
};
