# Настройка Email для регистрации в Supabase

Если письма с подтверждением не приходят при регистрации, выполните следующие шаги:

## 1. Проверка настроек Email в Supabase Dashboard

### Шаг 1: Откройте настройки проекта
1. Перейдите в Supabase Dashboard: https://supabase.com/dashboard/project/kztyhujkgjolxkyzrtyh
2. Откройте **Authentication** → **Providers**
3. Убедитесь, что **Email** провайдер включен

### Шаг 2: Настройка Email Confirmation
1. Перейдите в **Authentication** → **Settings**
2. Найдите раздел **Email Auth**
3. Проверьте настройки:

   **Вариант A: Email confirmation ВКЛЮЧЕН (рекомендуется для production)**
   - ✅ **Enable email confirmations** - должен быть включен
   - При регистрации пользователь получит письмо с подтверждением
   - Пользователь не сможет войти, пока не подтвердит email

   **Вариант B: Email confirmation ОТКЛЮЧЕН (для разработки)**
   - ❌ **Enable email confirmations** - отключен
   - Пользователь может сразу войти после регистрации
   - Письма не отправляются

### Шаг 3: Настройка Redirect URLs
1. Перейдите в **Authentication** → **URL Configuration**
2. Убедитесь, что настроены следующие URLs:

   **Site URL** (базовый URL для всех email confirmations):
   - Для разработки: `http://localhost:5173`
   - Для production: `https://smmmbooost.netlify.app` (или ваш домен)

   **Redirect URLs** (добавьте все необходимые):
   ```
   http://localhost:5173/auth/callback
   http://localhost:5173/reset-password
   https://smmmbooost.netlify.app/auth/callback
   https://smmmbooost.netlify.app/reset-password
   ```

## 2. Настройка Email Provider (SMTP)

По умолчанию Supabase использует встроенный email сервис, но он имеет ограничения:
- До 3 писем в час на бесплатном плане
- Письма могут попадать в спам
- Медленная доставка

### Рекомендуется настроить собственный SMTP:

1. Перейдите в **Project Settings** → **Auth** → **SMTP Settings**
2. Настройте SMTP провайдер (Gmail, SendGrid, Mailgun, AWS SES и т.д.)

   **Пример для Gmail:**
   ```
   Host: smtp.gmail.com
   Port: 587
   Username: your-email@gmail.com
   Password: your-app-password (не обычный пароль!)
   Sender email: your-email@gmail.com
   Sender name: SMM Boost
   ```

   **Важно для Gmail:**
   - Нужно включить "2-Step Verification"
   - Создать "App Password" в настройках Google аккаунта
   - Использовать App Password, а не обычный пароль

## 3. Проверка Email Templates

1. Перейдите в **Authentication** → **Email Templates**
2. Проверьте шаблон **Confirm signup**
3. Убедитесь, что в шаблоне используется переменная `{{ .ConfirmationURL }}`

   Пример шаблона:
   ```
   Subject: Подтвердите регистрацию
   
   Нажмите на ссылку для подтверждения регистрации:
   {{ .ConfirmationURL }}
   ```

## 4. Проверка логов

Если письма все еще не приходят:

1. Перейдите в **Logs** → **Auth Logs**
2. Проверьте, есть ли ошибки при отправке email
3. Проверьте, создается ли пользователь в **Authentication** → **Users**

## 5. Быстрое решение для разработки

Если нужно быстро протестировать регистрацию без email:

1. В **Authentication** → **Settings** отключите **Enable email confirmations**
2. Пользователи смогут сразу входить после регистрации
3. **Внимание**: Не используйте это в production!

## 6. Альтернатива: Проверка через Supabase Dashboard

Если письма не приходят, можно вручную подтвердить email:

1. Перейдите в **Authentication** → **Users**
2. Найдите пользователя
3. Нажмите на пользователя
4. В разделе **Email** нажмите **Confirm email** (если доступно)

## 7. Проверка спама

- Проверьте папку "Спам" в почтовом ящике
- Проверьте папку "Промоакции" (для Gmail)
- Добавьте `noreply@mail.app.supabase.io` в белый список

## 8. Тестирование

После настройки:

1. Зарегистрируйте нового пользователя
2. Проверьте почту (включая спам)
3. Проверьте логи в Supabase Dashboard
4. Если письмо пришло, перейдите по ссылке и проверьте, что пользователь подтвержден

## Частые проблемы и решения

### Проблема: Письма не приходят вообще
**Решение:**
- Проверьте, включен ли Email провайдер
- Проверьте настройки SMTP (если используете свой)
- Проверьте логи в Supabase Dashboard

### Проблема: Письма приходят, но ссылка не работает
**Решение:**
- Проверьте Redirect URLs в настройках
- Убедитесь, что Site URL правильный
- Проверьте, что страница `/auth/callback` существует

### Проблема: Письма попадают в спам
**Решение:**
- Настройте собственный SMTP с правильным доменом
- Добавьте SPF/DKIM записи для домена
- Используйте сервисы типа SendGrid, Mailgun (лучшая доставляемость)

### Проблема: Ограничение на количество писем
**Решение:**
- На бесплатном плане Supabase: максимум 3 письма в час
- Настройте собственный SMTP для большего лимита
- Или перейдите на платный план Supabase

## Дополнительная информация

- [Документация Supabase Auth](https://supabase.com/docs/guides/auth)
- [Настройка SMTP](https://supabase.com/docs/guides/auth/auth-smtp)
- [Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
