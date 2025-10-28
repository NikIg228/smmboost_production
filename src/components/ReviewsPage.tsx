import React from 'react';
import { t } from '../lib/i18n';
import { Star, User, CheckCircle, ArrowRight } from 'lucide-react';

interface ReviewsPageProps {
  onPageChange: (page: string) => void;
}

const reviews = [
  {
    id: 1,
    name: 'Ерлан К.',
    service: 'Подписчики Instagram',
    rating: 5,
    text: 'Заказывал 5000 подписчиков для бизнес‑аккаунта. Пришли плавно, без скачков, удержание хорошее. Запустили акции — конверсия выросла в 2,1 раза.',
    date: '2025-05-15',
    verified: true
  },
  {
    id: 2,
    name: 'Мария К.',
    service: 'Лайки TikTok',
    rating: 5,
    text: 'Нужен был старт для ролика. Через час лайки уже подтянулись, видео улетело в рекомендации и собрало органику. Поддержка отвечает мгновенно.',
    date: '2025-04-12',
    verified: true
  },
  {
    id: 3,
    name: 'Арам Г.',
    service: 'Просмотры YouTube',
    rating: 5,
    text: 'Прокачал просмотры на обучающих видео. Аудитория держит просмотр, метрики в Studio зеленые. Видно, что источник аккуратный.',
    date: '2025-02-18',
    verified: true
  },
  {
    id: 4,
    name: 'Дилноза Р.',
    service: 'Подписчики Telegram',
    rating: 5,
    text: 'Заказала для канала о косметике. Подписчики приходили равномерно, без бототы. Комментарии появились, ER вырос — это самое главное.',
    date: '2025-02-01',
    verified: true
  },
  {
    id: 5,
    name: 'Игорь Л.',
    service: 'Лайки Instagram',
    rating: 5,
    text: 'Фотосет бренда требовал активности. Лайки пришли как надо, без блокировок и вопросов со стороны Insta. По цене/качеству огонь.',
    date: '2024-12-28',
    verified: true
  },
  {
    id: 6,
    name: 'Манижа К.',
    service: 'Просмотры TikTok',
    rating: 5,
    text: 'Ролики проседали — подключили просмотры. Алгоритм подхватил, теперь стабильно выходим в рекомендации. Заказываю уже третий раз.',
    date: '2024-12-15',
    verified: true
  },
  {
    id: 7,
    name: 'Максим Р.',
    service: 'Подписчики YouTube',
    rating: 5,
    text: 'Каналу по обзорам техники нужен был толчок. Подписчики пришли аккуратно, без массовых отписок. CTR на новых видео вырос.',
    date: '2024-11-11',
    verified: true
  },
  {
    id: 8,
    name: 'Айжан Т.',
    service: 'Лайки VK',
    rating: 5,
    text: 'Запускали розыгрыш — нужно было “разбудить” сообщество. Лайки пришли быстро, пост вышел в ТОП по охватам в группе.',
    date: '2024-10-23',
    verified: true
  },
  {
    id: 9,
    name: 'Баходир У.',
    service: 'Просмотры Instagram Reels',
    rating: 5,
    text: 'Рилс с обзорами еды почти не летал. После запуска просмотров пошел органический рост, подписки с гео Алматы заметны.',
    date: '2024-10-15',
    verified: true
  },
  {
    id: 10,
    name: 'Светлана М.',
    service: 'Подписчики Instagram',
    rating: 5,
    text: 'Клиент — бьюти‑студия. Нужен был базовый пул подписчиков под таргет. Всё пришло мягко, рекламу одобрили, лиды пошли дешевле.',
    date: '2024-08-15',
    verified: true
  },
  {
    id: 11,
    name: 'Азамат Ж.',
    service: 'Лайки TikTok',
    rating: 5,
    text: 'Снимаю комедийные скетчи. Поддержал первые 3 часа публикации — ролик собрал x4 к обычному. Рекомендую для разгона.',
    date: '2024-07-19',
    verified: true
  },
  {
    id: 12,
    name: 'Наталья Б.',
    service: 'Просмотры YouTube',
    rating: 5,
    text: 'Длинные видео с рецептами трудно раскачать. Просмотры пришли равномерно, удержание не просело. Подписки с поиска увеличились.',
    date: '2024-05-10',
    verified: true
  }
];

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onPageChange }) => {
  const averageRating = 4.8;
  const totalReviews = 450;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            {t('reviews.title')}
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          {t('reviews.subtitle')}
        </p>
        
        {/* Rating Summary */}
        <div className="flex items-center justify-center space-x-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">
              {averageRating}
            </div>
            <div className="flex items-center justify-center space-x-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-400">
              {totalReviews}+ {t('reviews.totalReviews')}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map(review => (
          <div
            key={review.id}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-white">{review.name}</h3>
                    {review.verified && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-400">{review.service}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Review Text */}
            <p className="text-gray-300 mb-4 leading-relaxed">
              {review.text}
            </p>

            {/* Date */}
            <div className="text-sm text-gray-500">
              {new Date(review.date).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center mt-12">
        <div className="relative glass-effect rounded-xl p-8 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 glow-effect">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-xl opacity-80"></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 text-glow">
              {t('reviews.joinClients')}
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              {t('reviews.startPromotion')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => onPageChange('services')}
                className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/25 neon-button button-hover-lift"
              >
                <span>{t('reviews.chooseService')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <div className="text-sm text-gray-400 sm:ml-4">
                ⭐ {t('reviews.moreThan10000')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
