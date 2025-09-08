import React from 'react';
import { Star, User, CheckCircle, ArrowRight } from 'lucide-react';

interface ReviewsPageProps {
  onPageChange: (page: string) => void;
}

const reviews = [
  {
    id: 1,
    name: 'Александр М.',
    service: 'Подписчики Instagram',
    rating: 5,
    text: 'Заказывал 5000 подписчиков для своего бизнес-аккаунта. Все пришло быстро и качественно! Подписчики живые, с аватарками. Рекомендую!',
    date: '2025-05-15',
    verified: true
  },
  {
    id: 2,
    name: 'Мария К.',
    service: 'Лайки TikTok',
    rating: 5,
    text: 'Супер сервис! Лайки пришли буквально через 10 минут после заказа. Видео попало в рекомендации и набрало еще больше органических лайков.',
    date: '2025-04-12',
    verified: true
  },
  {
    id: 3,
    name: 'Дмитрий П.',
    service: 'Просмотры YouTube',
    rating: 5,
    text: 'Заказывал просмотры для своего канала. Качество хорошее, время удержания тоже норм. Единственное - можно было бы чуть быстрее.',
    date: '2025-02-18',
    verified: true
  },
  {
    id: 4,
    name: 'Анна С.',
    service: 'Подписчики Telegram',
    rating: 5,
    text: 'Очень довольна результатом! Канал начал активно расти, подписчики активные. Техподдержка отвечает быстро и помогает с любыми вопросами.',
    date: '2025-02-01',
    verified: true
  },
  {
    id: 5,
    name: 'Игорь Л.',
    service: 'Лайки Instagram',
    rating: 5,
    text: 'Пользуюсь уже полгода. Всегда стабильное качество, никаких проблем с аккаунтом. Цены адекватные, результат отличный.',
    date: '2024-12-28',
    verified: true
  },
  {
    id: 6,
    name: 'Елена В.',
    service: 'Просмотры TikTok',
    rating: 5,
    text: 'Заказывала просмотры для продвижения своего творчества. Результат превзошел ожидания - видео стало популярным и принесло много новых подписчиков!',
    date: '2024-12-15',
    verified: true
  },
  {
    id: 7,
    name: 'Максим Р.',
    service: 'Подписчики YouTube',
    rating: 5,
    text: 'Отличный сервис! Заказал 2000 подписчиков на канал, все пришло в течение дня. Подписчики качественные, канал начал расти органически.',
    date: '2024-11-11',
    verified: true
  },
  {
    id: 8,
    name: 'Ольга Т.',
    service: 'Лайки VK',
    rating: 5,
    text: 'Быстро и качественно! Лайки пришли через 15 минут, все выглядит естественно. Буду заказывать еще.',
    date: '2024-10-23',
    verified: true
  },
  {
    id: 9,
    name: 'Артем К.',
    service: 'Просмотры Instagram Reels',
    rating: 5,
    text: 'Заказывал просмотры для Reels. Результат отличный - видео попало в рекомендации и набрало много органических просмотров.',
    date: '2024-10-15',
    verified: true
  },
  {
    id: 10,
    name: 'Светлана М.',
    service: 'Подписчики Instagram',
    rating: 5,
    text: 'Очень довольна качеством! Подписчики живые, активные. Аккаунт стал выглядеть более популярным и привлекательным.',
    date: '2024-08-15',
    verified: true
  },
  {
    id: 11,
    name: 'Владимир С.',
    service: 'Лайки TikTok',
    rating: 5,
    text: 'Пользуюсь регулярно для продвижения контента. Всегда быстро, качественно и без проблем. Рекомендую всем!',
    date: '2024-07-19',
    verified: true
  },
  {
    id: 12,
    name: 'Наталья Б.',
    service: 'Просмотры YouTube',
    rating: 5,
    text: 'Заказывала просмотры для обучающих видео. Качество отличное, время удержания хорошее. Канал начал расти быстрее.',
    date: '2024-05-10',
    verified: true
  },
  {
    id: 13,
    name: 'Денис Л.',
    service: 'Подписчики Telegram',
    rating: 5,
    text: 'Супер быстро! Заказал 1000 подписчиков, все пришло за пару часов. Канал сразу стал выглядеть более авторитетно.',
    date: '2024-03-30',
    verified: true
  },
  {
    id: 14,
    name: 'Юлия Н.',
    service: 'Лайки Instagram',
    rating: 5,
    text: 'Отличное соотношение цены и качества. Лайки приходят быстро, выглядят естественно. Пользуюсь постоянно.',
    date: '2024-03-04',
    verified: true
  },
  {
    id: 15,
    name: 'Андрей В.',
    service: 'Просмотры TikTok',
    rating: 5,
    text: 'Заказывал просмотры для бизнес-аккаунта. Результат превосходный - охваты увеличились в разы, появились новые клиенты.',
    date: '2024-02-20',
    verified: true
  },
  {
    id: 16,
    name: 'Екатерина Р.',
    service: 'Подписчики VK',
    rating: 5,
    text: 'Качественные подписчики, быстрая доставка. Группа стала активнее, появились новые участники органически.',
    date: '2024-01-03',
    verified: true
  },
  {
    id: 17,
    name: 'Сергей К.',
    service: 'Лайки YouTube',
    rating: 5,
    text: 'Заказываю лайки для своих видео уже несколько месяцев. Всегда стабильное качество, никаких нареканий.',
    date: '2024-01-01',
    verified: true
  },
  {
    id: 18,
    name: 'Марина Д.',
    service: 'Просмотры Instagram Stories',
    rating: 5,
    text: 'Отличный сервис для продвижения Stories! Просмотры приходят быстро, статистика улучшается заметно.',
    date: '2024-03-05',
    verified: true
  },
  {
    id: 19,
    name: 'Алексей П.',
    service: 'Подписчики TikTok',
    rating: 5,
    text: 'Заказал 3000 подписчиков для нового аккаунта. Все пришло качественно и быстро. Аккаунт сразу стал выглядеть серьезно.',
    date: '2023-12-28',
    verified: true
  },
  {
    id: 20,
    name: 'Татьяна Г.',
    service: 'Лайки VK',
    rating: 5,
    text: 'Пользуюсь услугами уже год. Всегда довольна результатом. Лайки качественные, приходят быстро, цены адекватные.',
    date: '2023-07-15',
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
            Отзывы клиентов
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          Более 10,000 довольных клиентов доверяют нам продвижение своих аккаунтов
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
              {totalReviews}+ отзывов
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
              Присоединяйтесь к довольным клиентам
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Начните продвижение своего аккаунта уже сегодня и получите первые результаты через несколько минут
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => onPageChange('services')}
                className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-pink-500/25 neon-button button-hover-lift"
              >
                <span>Выбрать услугу</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <div className="text-sm text-gray-400 sm:ml-4">
                ⭐ Более 10,000 довольных клиентов
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};