import React, { useRef, useState } from 'react';
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
  },
  {
    id: 13,
    name: 'Денис Л.',
    service: 'Подписчики Telegram',
    rating: 5,
    text: 'Телеграм‑канал по IT. Подписчики пришли живые, обсуждают посты, ботов не заметил. Недельный ER вырос почти вдвое.',
    date: '2024-04-14',
    verified: true
  },
  {
    id: 14,
    name: 'Гаяне А.',
    service: 'Лайки Instagram',
    rating: 5,
    text: 'Продвигаю личный блог. Лайки пришли в течение часа, сторис стали смотреть больше. Красивый UI у сайта и честная поддержка.',
    date: '2024-03-04',
    verified: true
  },
  {
    id: 15,
    name: 'Андрей В.',
    service: 'Просмотры TikTok',
    rating: 5,
    text: 'Снял серию роликов про авто. После закупки просмотров новые ролики стабильно набирают органику. Буду работать дальше.',
    date: '2024-02-20',
    verified: true
  },
  {
    id: 16,
    name: 'Нургуль С.',
    service: 'Подписчики VK',
    rating: 5,
    text: 'Для городского сообщества нужен был рост. Подписчики пришли без шквала отписок, комментарии пошли активнее.',
    date: '2024-01-03',
    verified: true
  },
  {
    id: 17,
    name: 'Сергей К.',
    service: 'Лайки YouTube',
    rating: 5,
    text: 'У видео с обзорами мало реакций. Лайки помогли ускорить старт, теперь больше переходов из рекомендаций.',
    date: '2024-01-01',
    verified: true
  },
  {
    id: 18,
    name: 'Марина Д.',
    service: 'Просмотры Instagram Stories',
    rating: 5,
    text: 'Stories на магазине одежды проседали. После поддержки просмотров, отклики в директ пошли чаще, есть заказы.',
    date: '2024-03-05',
    verified: true
  },
  {
    id: 19,
    name: 'Фаррух Н.',
    service: 'Подписчики TikTok',
    rating: 5,
    text: 'Завёл новый аккаунт. Нужен был первый толчок — аудитория пришла плавно, ролики собирают комментарии.',
    date: '2023-12-28',
    verified: true
  },
  {
    id: 20,
    name: 'Татьяна Г.',
    service: 'Лайки VK',
    rating: 5,
    text: 'Поддержали конкурсный пост. Охваты заметно выросли, люди начали отмечать друзей — пошла органика.',
    date: '2023-07-15',
    verified: true
  },
  {
    id: 21,
    name: 'Олжас Т.',
    service: 'Просмотры YouTube Shorts',
    rating: 5,
    text: 'Шортсы не могли пробиться. Поддержка просмотров дала первые импульсы — теперь почти каждый в рекомендациях.',
    date: '2025-01-12',
    verified: true
  },
  {
    id: 22,
    name: 'Виктория С.',
    service: 'Подписчики Instagram',
    rating: 5,
    text: 'Салон красоты. Подписчики приходили равномерно, хештеги отработали лучше, лиды с direct выросли.',
    date: '2025-03-18',
    verified: true
  },
  {
    id: 23,
    name: 'Мурат А.',
    service: 'Лайки Telegram',
    rating: 5,
    text: 'Посты в канале стали попадать в рекомендованные разделы. Реакции приходят быстро и выглядят естественно.',
    date: '2025-04-03',
    verified: true
  },
  {
    id: 24,
    name: 'Наташа Р.',
    service: 'Комментарии Instagram',
    rating: 5,
    text: 'Нужны были живые комментарии под коллабом. Тексты не шаблонные, смотрятся натурально. Спасибо!',
    date: '2025-05-01',
    verified: true
  },
  {
    id: 25,
    name: 'Арман Ж.',
    service: 'Просмотры VK видео',
    rating: 5,
    text: 'Музыкальный клип. Просмотры пришли волнами, без резких скачков. Комментарии и репосты подтянулись.',
    date: '2024-11-02',
    verified: true
  },
  {
    id: 26,
    name: 'Сауле М.',
    service: 'Подписчики YouTube',
    rating: 5,
    text: 'Кулинарный канал. После старта стало больше сохранений и лайков, средний просмотр держится.',
    date: '2024-09-09',
    verified: true
  },
  {
    id: 27,
    name: 'Роман Н.',
    service: 'Лайки Twitter/X',
    rating: 5,
    text: 'Выводили твит в тренды ниши. Лайки пришли аккуратно, ретвиты появились органически.',
    date: '2024-06-22',
    verified: true
  },
  {
    id: 28,
    name: 'Жанна П.',
    service: 'Просмотры TikTok LIVE',
    rating: 5,
    text: 'Поддержали прямой эфир — онлайн удержался выше обычного, донаты тоже выросли.',
    date: '2025-02-10',
    verified: true
  },
  {
    id: 29,
    name: 'Ирина Ш.',
    service: 'Подписчики Instagram',
    rating: 5,
    text: 'Фэшн‑стилист. Пришли люди с нормальными аватарками и активностью, понравилось, что всё без риска.',
    date: '2025-02-22',
    verified: true
  },
  {
    id: 30,
    name: 'Михал П.',
    service: 'Просмотры YouTube',
    rating: 5,
    text: 'Техноканал на русском. Поддержка просмотров дала первые 48 часов разгона — теперь трафик идет из поиска.',
    date: '2025-03-03',
    verified: true
  },
  {
    id: 31,
    name: 'Айгерим К.',
    service: 'Лайки Instagram',
    rating: 5,
    text: 'Фотопроект. Лайки пришли быстро и равномерно, без подозрений со стороны платформы.',
    date: '2024-08-08',
    verified: true
  },
  {
    id: 32,
    name: 'Павел Ф.',
    service: 'Комментарии YouTube',
    rating: 5,
    text: 'Нужна была активность под туториалом. Комментарии по делу, без воды — смотрятся естественно.',
    date: '2024-05-30',
    verified: true
  },
  {
    id: 33,
    name: 'Асель Т.',
    service: 'Подписчики Telegram',
    rating: 5,
    text: 'Канал про психологию. Подписчики пришли с хорошей вовлеченностью, вопросы в чате стали задавать чаще.',
    date: '2024-04-07',
    verified: true
  },
  {
    id: 34,
    name: 'Руслан Е.',
    service: 'Просмотры Instagram Reels',
    rating: 5,
    text: 'Поддержали несколько роликов — один зашёл в топ по хэштегам, подписчики прибавились.',
    date: '2024-10-05',
    verified: true
  },
  {
    id: 35,
    name: 'Олеся С.',
    service: 'Лайки VK',
    rating: 5,
    text: 'Проект по интерьеру. Лайки помогли вернуть активность после паузы — теперь посты снова собирают охваты.',
    date: '2024-09-01',
    verified: true
  },
  {
    id: 36,
    name: 'Данияр Х.',
    service: 'Подписчики TikTok',
    rating: 5,
    text: 'Музыкант. Нужно было докрутить до 10к, чтобы открыть функции — сделали быстро и без вопросов.',
    date: '2025-01-28',
    verified: true
  },
  {
    id: 37,
    name: 'Кристина Л.',
    service: 'Просмотры YouTube',
    rating: 5,
    text: 'Обучающий курс. Просмотры пришли с нормальной динамикой, удержание не упало, лиды стали дешевле.',
    date: '2025-04-05',
    verified: true
  },
  {
    id: 38,
    name: 'Бекзат Н.',
    service: 'Лайки Instagram',
    rating: 5,
    text: 'Аккаунт барбершопа. Лайки раскачали профиль, запись через директ стала чаще.',
    date: '2025-03-21',
    verified: true
  },
  {
    id: 39,
    name: 'Эльвира Ч.',
    service: 'Подписчики YouTube',
    rating: 5,
    text: 'Детский канал. Подписчики пришли без претензий от платформы, теперь работаем над контентом.',
    date: '2024-12-10',
    verified: true
  },
  {
    id: 40,
    name: 'Санжар У.',
    service: 'Просмотры TikTok',
    rating: 5,
    text: 'Нишевые ролики про путешествия. Стартовые просмотры сильно помогают попасть в рекомендации.',
    date: '2025-02-03',
    verified: true
  },
  {
    id: 41,
    name: 'Людмила Б.',
    service: 'Комментарии Instagram',
    rating: 5,
    text: 'Попросила комментарии под отзывом клиента. Формулировки живые, без спама — аккуратно.',
    date: '2025-01-09',
    verified: true
  },
  {
    id: 42,
    name: 'Женя С.',
    service: 'Лайки YouTube',
    rating: 5,
    text: 'Технообзоры. Лайки помогли роликам стартовать лучше в первые сутки, удержание выросло.',
    date: '2024-11-19',
    verified: true
  },
  {
    id: 43,
    name: 'Амина Р.',
    service: 'Подписчики Instagram',
    rating: 5,
    text: 'Блог о кофе. После первой закупки стали писать об открытии кофейни, трафик из поиска увеличился.',
    date: '2025-05-10',
    verified: true
  },
  {
    id: 44,
    name: 'Илья П.',
    service: 'Просмотры YouTube Shorts',
    rating: 5,
    text: 'Шортсы про гейминг. После поддержки просмотров органика стала стабильно заходить.',
    date: '2025-05-12',
    verified: true
  },
  {
    id: 45,
    name: 'Матильда Е.',
    service: 'Лайки TikTok',
    rating: 5,
    text: 'Делала челлендж. Лайки пришли быстро, комментарии подтянулись сами, подписки пошли.',
    date: '2025-05-14',
    verified: true
  }
];

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onPageChange }) => {
  const averageRating = 4.97;
  const totalReviews = 450;
  const perPage = 9;
  const totalPages = Math.ceil(reviews.length / perPage);
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);
  const paginated = reviews.slice((page - 1) * perPage, page * perPage);

  const goToPage = (p: number) => {
    const next = Math.max(1, Math.min(totalPages, p));
    setPage(next);
    // скролл к началу секции
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={topRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              {[...Array(5)].map((_, i) => {
                const fullStars = Math.floor(averageRating);
                const fraction = Math.max(0, Math.min(1, averageRating - fullStars));
                const isFull = i < fullStars;
                const isPartial = i === fullStars && fraction > 0;
                const fillPct = isFull ? 100 : isPartial ? Math.round(fraction * 100) : 0;
                return (
                  <div key={i} className="relative w-5 h-5">
                    {/* base gray star */}
                    <Star className="w-5 h-5 text-gray-600" />
                    {/* yellow overlay with partial width */}
                    {fillPct > 0 && (
                      <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: `${fillPct}%` }}>
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="text-sm text-gray-400">
              {totalReviews}+ {t('reviews.totalReviews')}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.map(review => (
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

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-10">
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          className="px-3 py-2 rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:border-purple-500 disabled:opacity-50"
        >
          Назад
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`${p === page ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' : 'border border-gray-600 text-gray-300 hover:text-white hover:border-purple-500'} px-3 py-2 rounded-lg`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-2 rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:border-purple-500 disabled:opacity-50"
        >
          Далее
        </button>
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
