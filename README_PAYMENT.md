# Интеграция платежной системы

## Обзор

Полная интеграция тестовой платежной системы для обработки платежей в приложении SMM Boost.

## Архитектура

```
src/
├── lib/
│   └── paymentApi.ts          # Основной API сервис
├── config/
│   └── payment.ts             # Конфигурация платежной системы
├── pages/
│   ├── PaymentSuccess.tsx     # Страница успешной оплаты
│   └── PaymentCancel.tsx      # Страница отмененной оплаты
└── types/
    └── payment.ts             # TypeScript типы

netlify/_functions/
├── payment-create.js          # Создание платежа
├── payment-status.js          # Проверка статуса
├── payment-refund.js          # Возврат средств
└── payment-webhook.js         # Обработка уведомлений
```

## API Endpoints

### 1. Создание платежа
```
POST /.netlify/functions/payment-create
```

**Запрос:**
```json
{
  "amount": 1000,
  "service": "Лайки Instagram",
  "quantity": 1000,
  "url": "https://instagram.com/profile",
  "userData": {
    "name": "Иван Иванов",
    "email": "ivan@example.com"
  },
  "paymentMethod": "card"
}
```

**Ответ:**
```json
{
  "success": true,
  "message": "Заказ создан, перенаправление на оплату",
  "transaction_id": "TXN_1234567890_abc123",
  "payment_url": "http://api.box:5001/pay/xyz789",
  "status": "pending"
}
```

### 2. Проверка статуса
```
GET /.netlify/functions/payment-status?order_id=TXN_1234567890_abc123
```

**Ответ:**
```json
{
  "success": true,
  "data": {
    "order_id": "TXN_1234567890_abc123",
    "status": "charged",
    "amount": 1000,
    "currency": "KZT",
    "created_at": "2025-01-21T10:00:00Z",
    "updated_at": "2025-01-21T10:05:00Z"
  }
}
```

### 3. Возврат средств
```
POST /.netlify/functions/payment-refund
```

**Запрос:**
```json
{
  "order_id": "TXN_1234567890_abc123",
  "amount": 500,
  "reason": "Частичный возврат"
}
```

### 4. Webhook уведомления
```
POST /.netlify/functions/payment-webhook
```

**Запрос от платежной системы:**
```json
{
  "order_id": "TXN_1234567890_abc123",
  "status": "charged",
  "amount": 1000,
  "currency": "KZT",
  "payment_method": "card",
  "timestamp": "2025-01-21T10:05:00Z",
  "transaction_id": "pay_xyz789"
}
```

## Использование

### 1. Инициализация API сервиса

```typescript
import { paymentApi } from '../lib/paymentApi';

// Проверка соединения
const isConnected = await paymentApi.ping();

// Создание заказа
const result = await paymentApi.createOrder({
  amount: 1000,
  currency: 'KZT',
  description: 'Лайки Instagram - 1000',
  order_id: 'TXN_123',
  return_url: 'https://site.com/success',
  cancel_url: 'https://site.com/cancel',
  customer: {
    name: 'Иван Иванов',
    email: 'ivan@example.com'
  }
});
```

### 2. Обработка платежа в компоненте

```typescript
const handlePayment = async () => {
  try {
    const response = await fetch('/.netlify/functions/payment-create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    });

    const result = await response.json();
    
    if (result.success && result.payment_url) {
      // Перенаправление на страницу оплаты
      window.location.href = result.payment_url;
    }
  } catch (error) {
    console.error('Payment error:', error);
  }
};
```

## Конфигурация

Все настройки находятся в `src/config/payment.ts`:

```typescript
export const PAYMENT_CONFIG = {
  API: {
    BASE_URL: 'http://api.box:5001',
    TIMEOUT: 30000,
  },
  AUTH: {
    BASIC_TOKEN: 'cHJvamVjdDpwYXNzd29yZA==',
  },
  TEST_CARD: {
    NUMBER: '4111111111111111',
    CVV: '123',
    EXPIRY: '12/2025',
  }
};
```

## Тестирование

### 1. Тестовые данные карты
- **Номер:** 4111111111111111
- **CVV:** 123
- **Срок действия:** 12/2025
- **Держатель:** TEST CARDHOLDER

### 2. Проверка API
```bash
# Проверка соединения
curl -X GET http://api.box:5001/ping \
  -H "Authorization: Basic cHJvamVjdDpwYXNzd29yZA=="

# Создание тестового заказа
curl -X POST http://api.box:5001/orders/create \
  -H "Authorization: Basic cHJvamVjdDpwYXNzd29yZA==" \
  -H "Content-Type: application/json" \
  -d '{"amount": 100, "currency": "KZT"}'
```

### 3. Тестирование функций
```bash
# Локальное тестирование с Netlify CLI
netlify dev

# Тестирование создания платежа
curl -X POST http://localhost:8888/.netlify/functions/payment-create \
  -H "Content-Type: application/json" \
  -d '{"amount": 1000, "service": "Test", "userData": {"name": "Test", "email": "test@test.com"}, "paymentMethod": "card"}'
```

## Безопасность

1. **Авторизация:** Все запросы к API используют Basic Auth
2. **HTTPS:** В продакшене все соединения должны быть защищены SSL
3. **Валидация:** Все входящие данные проверяются на корректность
4. **Логирование:** Все операции логируются для аудита
5. **Таймауты:** Установлены разумные таймауты для всех запросов

## Обработка ошибок

Система включает комплексную обработку ошибок:

- **Сетевые ошибки:** Автоматические повторные попытки
- **Таймауты:** Graceful handling с информативными сообщениями
- **API ошибки:** Детальная обработка HTTP статусов
- **Fallback:** Переключение на mock-режим при недоступности API

## Мониторинг

Для мониторинга работы платежной системы:

1. Проверяйте логи Netlify Functions
2. Мониторьте статусы транзакций
3. Отслеживайте webhook уведомления
4. Анализируйте метрики успешности платежей

## Развертывание

1. Убедитесь, что все переменные окружения настроены
2. Проверьте доступность API платежной системы
3. Протестируйте все эндпоинты
4. Настройте мониторинг и алерты
5. Задокументируйте процедуры восстановления

## Поддержка

При возникновении проблем:

1. Проверьте логи функций в Netlify Dashboard
2. Убедитесь в доступности API платежной системы
3. Проверьте корректность авторизационных данных
4. Обратитесь к документации API платежной системы