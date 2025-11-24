import { Service, ServiceCategory, Platform } from '../types';

export const platforms: Platform[] = [
  { id: 'instagram', name: 'Instagram', icon: 'Instagram', color: '#E4405F' },
  { id: 'tiktok', name: 'TikTok', icon: 'Video', color: '#000000' },
  { id: 'youtube', name: 'YouTube', icon: 'Play', color: '#FF0000' },
  { id: 'telegram', name: 'Telegram', icon: 'MessageCircle', color: '#0088cc' },
  { id: 'vk', name: 'VK', icon: 'Users', color: '#4A76A8' },
  { id: 'twitter', name: 'Twitter', icon: 'Twitter', color: '#1DA1F2' },
];

export const services: Service[] = [
  // Instagram
  {
    id: 'ig-likes',
    name: 'Лайки Instagram',
    description: 'Быстрая накрутка лайков от живых аккаунтов',
    price: 1000,
    platform: 'instagram',
    category: 'likes',
    icon: 'Heart',
    minQuantity: 100,
    maxQuantity: 50000,
    startTime: 'в течение 30 минут',
    speed: '1000-5000 в час',
    guarantee: '30 дней'
  },
  {
    id: 'ig-followers',
    name: 'Подписчики Instagram',
    description: 'Живые подписчики с аватарами и постами',
    price: 2000,
    platform: 'instagram',
    category: 'followers',
    icon: 'UserPlus',
    minQuantity: 50,
    maxQuantity: 20000,
    startTime: '0-60 минут',
    speed: '500-2000 в день',
    guarantee: '60 дней'
  },
  {
    id: 'ig-views',
    name: 'Просмотры Stories Instagram',
    description: 'Просмотры историй от активных пользователей',
    price: 1500,
    platform: 'instagram',
    category: 'views',
    icon: 'Eye',
    minQuantity: 100,
    maxQuantity: 100000,
    startTime: '0-15 минут',
    speed: '5000-10000 в час',
    guarantee: '7 дней'
  },
  {
    id: 'ig-reels',
    name: 'Просмотры Reels Instagram',
    description: 'Качественные просмотры для ваших Reels',
    price: 1500,
    platform: 'instagram',
    category: 'views',
    icon: 'PlayCircle',
    minQuantity: 500,
    maxQuantity: 1000000,
    startTime: 'в течение 30 минут',
    speed: '10000-50000 в час',
    guarantee: '30 дней'
  },
  {
    id: 'ig-live-viewers',
    name: 'Зрители для прямого эфира Instagram',
    description: 'Активные зрители для прямых трансляций в Instagram',
    price: 1250,
    platform: 'instagram',
    category: 'live',
    icon: 'Tv',
    minQuantity: 50,
    maxQuantity: 3000,
    startTime: '0-5 минут',
    speed: '30-150 в минуту',
    guarantee: 'На время эфира'
  },
  
  // TikTok
  {
    id: 'tt-followers',
    name: 'Подписчики TikTok',
    description: 'Быстрая накрутка подписчиков TikTok',
    price: 2500,
    platform: 'tiktok',
    category: 'followers',
    icon: 'UserPlus',
    minQuantity: 100,
    maxQuantity: 50000,
    startTime: '0-60 минут',
    speed: '1000-5000 в день',
    guarantee: '30 дней'
  },
  {
    id: 'tt-likes',
    name: 'Лайки TikTok',
    description: 'Лайки от активных пользователей TikTok',
    price: 1000,
    platform: 'tiktok',
    category: 'likes',
    icon: 'Heart',
    minQuantity: 100,
    maxQuantity: 100000,
    startTime: 'в течение 30 минут',
    speed: '1000-10000 в час',
    guarantee: '30 дней'
  },
  {
    id: 'tt-views',
    name: 'Просмотры TikTok',
    description: 'Просмотры видео с высоким retention',
    price: 1200,
    platform: 'tiktok',
    category: 'views',
    icon: 'Eye',
    minQuantity: 1000,
    maxQuantity: 10000000,
    startTime: '0-15 минут',
    speed: '50000-200000 в час',
    guarantee: '30 дней'
  },
  {
    id: 'tt-live-viewers',
    name: 'Зрители для прямого эфира TikTok',
    description: 'Живые зрители для стримов в TikTok',
    price: 1500,
    platform: 'tiktok',
    category: 'live',
    icon: 'Tv',
    minQuantity: 30,
    maxQuantity: 2000,
    startTime: '0-5 минут',
    speed: '20-100 в минуту',
    guarantee: 'На время эфира'
  },
  
  // YouTube
  {
    id: 'yt-subscribers',
    name: 'Подписчики YouTube',
    description: 'Качественные подписчики для канала',
    price: 4500,
    platform: 'youtube',
    category: 'followers',
    icon: 'UserPlus',
    minQuantity: 50,
    maxQuantity: 10000,
    startTime: '0-120 минут',
    speed: '200-1000 в день',
    guarantee: '90 дней'
  },
  {
    id: 'yt-views',
    name: 'Просмотры YouTube',
    description: 'Просмотры видео с удержанием аудитории',
    price: 3500,
    platform: 'youtube',
    category: 'views',
    icon: 'Eye',
    minQuantity: 500,
    maxQuantity: 1000000,
    startTime: '0-60 минут',
    speed: '5000-20000 в час',
    guarantee: '60 дней'
  },
  {
    id: 'yt-likes',
    name: 'Лайки YouTube',
    description: 'Лайки от реальных пользователей',
    price: 2500,
    platform: 'youtube',
    category: 'likes',
    icon: 'ThumbsUp',
    minQuantity: 50,
    maxQuantity: 50000,
    startTime: 'в течение 30 минут',
    speed: '500-2000 в час',
    guarantee: '60 дней'
  },
  
  // Telegram
  {
    id: 'tg-subscribers',
    name: 'Подписчики Telegram',
    description: 'Подписчики для каналов и ботов',
    price: 3000,
    platform: 'telegram',
    category: 'followers',
    icon: 'UserPlus',
    minQuantity: 100,
    maxQuantity: 50000,
    startTime: 'в течение 30 минут',
    speed: '1000-5000 в час',
    guarantee: '30 дней'
  },
  {
    id: 'tg-views',
    name: 'Просмотры Telegram',
    description: 'Просмотры постов в каналах',
    price: 3000,
    platform: 'telegram',
    category: 'views',
    icon: 'Eye',
    minQuantity: 500,
    maxQuantity: 1000000,
    startTime: '0-15 минут',
    speed: '10000-50000 в час',
    guarantee: '30 дней'
  },
  
  // VK
  {
    id: 'vk-likes',
    name: 'Лайки VK',
    description: 'Лайки от активных пользователей ВКонтакте',
    price: 1000,
    platform: 'vk',
    category: 'likes',
    icon: 'Heart',
    minQuantity: 100,
    maxQuantity: 50000,
    startTime: 'в течение 30 минут',
    speed: '1000-5000 в час',
    guarantee: '30 дней'
  },
  {
    id: 'vk-followers',
    name: 'Подписчики VK',
    description: 'Подписчики для групп и страниц',
    price: 2000,
    platform: 'vk',
    category: 'followers',
    icon: 'UserPlus',
    minQuantity: 100,
    maxQuantity: 100000,
    startTime: '0-60 минут',
    speed: '1000-10000 в день',
    guarantee: '30 дней'
  },
  {
    id: 'vk-live-viewers',
    name: 'Зрители для прямого эфира VK',
    description: 'Реальные зрители для прямых трансляций ВКонтакте',
    price: 1000,
    platform: 'vk',
    category: 'live',
    icon: 'Tv',
    minQuantity: 50,
    maxQuantity: 5000,
    startTime: '0-5 минут',
    speed: '50-200 в минуту',
    guarantee: 'На время эфира'
  },
  
  // Twitter
  {
    id: 'tw-followers',
    name: 'Подписчики Twitter',
    description: 'Качественные подписчики Twitter',
    price: 3500,
    platform: 'twitter',
    category: 'followers',
    icon: 'UserPlus',
    minQuantity: 50,
    maxQuantity: 20000,
    startTime: '0-120 минут',
    speed: '500-2000 в день',
    guarantee: '60 дней'
  },
  {
    id: 'tw-likes',
    name: 'Лайки Twitter',
    description: 'Лайки для твитов от активных пользователей',
    price: 1000,
    platform: 'twitter',
    category: 'likes',
    icon: 'Heart',
    minQuantity: 100,
    maxQuantity: 50000,
    startTime: 'в течение 30 минут',
    speed: '1000-5000 в час',
    guarantee: '30 дней'
  },
];

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'likes',
    name: 'Лайки',
    services: services.filter(s => s.category === 'likes')
  },
  {
    id: 'followers',
    name: 'Подписчики',
    services: services.filter(s => s.category === 'followers')
  },
  {
    id: 'views',
    name: 'Просмотры',
    services: services.filter(s => s.category === 'views')
  },
  {
    id: 'live',
    name: 'Прямые эфиры',
    services: services.filter(s => s.category === 'live')
  },
];