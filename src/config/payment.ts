/**
 * Payment Configuration
 * Конфигурация для платежной системы
 */

export const PAYMENT_CONFIG = {
  // API Configuration
  API: {
    BASE_URL: 'http://api.box:5001',
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 second
  },

  // Authentication
  AUTH: {
    LOGIN: 'project',
    PASSWORD: 'password',
    BASIC_TOKEN: 'cHJvamVjdDpwYXNzd29yZA==', // Base64: project:password
  },

  // Test Card Data
  TEST_CARD: {
    NUMBER: '4111111111111111',
    CVV: '123',
    EXPIRY: '12/2025',
    HOLDER: 'TEST CARDHOLDER',
  },

  // Currency Settings
  CURRENCY: {
    DEFAULT: 'KZT',
    SUPPORTED: ['KZT', 'USD', 'EUR'],
  },

  // URLs
  URLS: {
    SUCCESS: '/payment-success',
    CANCEL: '/payment-cancel',
    WEBHOOK: '/.netlify/functions/payment-webhook',
  },

  // Status Mapping
  STATUS: {
    PENDING: 'pending',
    AUTHORIZED: 'authorized',
    CHARGED: 'charged',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
    CANCELLED: 'cancelled',
  },

  // Error Messages
  ERRORS: {
    NETWORK: 'Ошибка соединения с платежной системой',
    TIMEOUT: 'Превышено время ожидания ответа',
    INVALID_CARD: 'Неверные данные карты',
    INSUFFICIENT_FUNDS: 'Недостаточно средств на карте',
    CARD_BLOCKED: 'Карта заблокирована',
    LIMIT_EXCEEDED: 'Превышен лимит операций',
    BANK_ERROR: 'Ошибка банка',
    UNKNOWN: 'Неизвестная ошибка',
  },

  // Success Messages
  SUCCESS: {
    ORDER_CREATED: 'Заказ успешно создан',
    PAYMENT_AUTHORIZED: 'Платеж авторизован',
    PAYMENT_CHARGED: 'Платеж успешно обработан',
    PAYMENT_REFUNDED: 'Возврат успешно обработан',
  },
} as const;

export type PaymentStatus = typeof PAYMENT_CONFIG.STATUS[keyof typeof PAYMENT_CONFIG.STATUS];
export type PaymentCurrency = typeof PAYMENT_CONFIG.CURRENCY.SUPPORTED[number];