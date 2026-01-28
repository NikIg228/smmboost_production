# ЗАДАЧА: Supabase Auth — полностью рабочая логика (signup/login/reset/change email) + SQL через Supabase CLI

Ты — senior fullstack engineer (Supabase + Postgres + RLS + JS/TS). 
Нужно ПРОСМОТРЕТЬ ВЕСЬ КОД ПРОЕКТА и сделать так, чтобы аутентификация Supabase работала полностью корректно:
- Регистрация (email+password) + подтверждение email (если включено)
- Вход (email+password)
- Восстановление пароля (reset password) по письму
- Изменение email (change email) + подтверждение (если включено)
- Корректные redirect URLs
- Профиль пользователя в public таблице profiles
- Политики RLS так, чтобы:
  - пользователь видит/изменяет только свой профиль
  - сервис-роль может работать в админских задачах (если есть)
- Триггеры: создание профиля при регистрации в auth.users

ВАЖНО:
- Не ломать текущую архитектуру.
- Всё делай через Supabase CLI: миграции + применение SQL.
- Предпочти "миграции" (supabase/migrations/*.sql), а не ручное выполнение в Dashboard.
- После SQL — обнови типы (supabase gen types typescript).

## 0) СКАН ПРОЕКТА (обязательно)
1) Найди и изучи:
- .env, .env.local, .env.production (все где есть SUPABASE_URL, SUPABASE_ANON_KEY, site URL, redirect)
- файлы где используется supabase client (createClient / supabase.ts / lib/supabase.ts)
- всю логику auth: signUp, signInWithPassword, resetPasswordForEmail, updateUser, verifyOtp, exchangeCodeForSession и т.д.
- роуты/страницы: /login, /register, /reset-password, /update-password, /confirm, /auth/callback (или аналоги)
- настройки писем (если есть шаблоны) и ссылки в письмах
2) Составь краткую карту:
- какие страницы и URL участвуют в auth flow
- какие redirectTo сейчас передаются
- какие проблемы вероятны (не меняется email, приходят не те письма, редирект не туда)

## 1) ЦЕЛЕВАЯ СХЕМА БД (profiles)
Нужно иметь таблицу public.profiles:
- id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE
- email text (опционально, можно хранить как копию)
- full_name text (nullable)
- role text (например 'client'/'coach' или другое, посмотри проект)
- created_at timestamptz default now()
- updated_at timestamptz default now()

Добавь:
- индекс по role (если нужно)
- триггер updated_at (если используете)

## 2) ТРИГГЕР НА СОЗДАНИЕ ПРОФИЛЯ
Создай функцию + триггер:
- AFTER INSERT ON auth.users
- вставляет строку в public.profiles (id = new.id, email = new.email)
- НЕ падает при повторных вставках (используй ON CONFLICT DO NOTHING)

## 3) RLS ПОЛИТИКИ
Включи RLS на public.profiles и сделай политики:
- SELECT: auth.uid() = id
- UPDATE: auth.uid() = id
- INSERT: auth.uid() = id (или запрети, если insert только через trigger)
ВАЖНО: не открывай таблицу всем (никаких "true").

Если в проекте есть другие таблицы, связанные с пользователем (orders, chats, payments и т.п.), 
проверь их и добавь/исправь RLS аналогично.

## 4) AUTH FLOW ДЛЯ EMAIL CHANGE / PASSWORD RESET
Проверь, что в коде корректно обрабатываются кейсы:

### Reset password:
- При запросе resetPasswordForEmail(email, { redirectTo: <SITE_URL>/update-password })
- На странице /update-password:
  - если это PKCE flow или code flow, нужно exchangeCodeForSession
  - далее updateUser({ password: newPassword })
  - после обновления — logout/redirect

### Change email:
- updateUser({ email: newEmail }) (и Supabase отправляет confirm link)
- Нужна страница, куда ведёт подтверждение (например /auth/callback или /confirm)
- На callback странице: exchangeCodeForSession (если требуется) и показываем "Email подтвержден"
- Убедись, что email в profiles синхронизируется (через отдельный trigger на auth.users update ИЛИ через код после успешной сессии)

### Confirm signup:
- если включено подтверждение почты, ensure callback handler корректен

Сопоставь это с текущим кодом проекта и выбери корректный вариант под используемый supabase-js (v2).

## 5) SQL МИГРАЦИИ ЧЕРЕЗ SUPABASE CLI
Сделай миграцию:
- supabase migration new auth_profiles_rls
- заполни SQL (создание таблицы, триггеры, rls, policies)
- затем:
  - supabase db push (или supabase db reset если локально)
  - если проект привязан: убедись что применилось к удаленной БД

## 6) ГЕНЕРАЦИЯ ТИПОВ
После успешного применения миграций:
- supabase gen types typescript --project-id <ref> > src/types/supabase.ts (или куда у вас принято)

## 7) ПРОВЕРКА (ЧЕКЛИСТ)
Добавь внутри отчёта (в конце):
- ✅ signup создает auth.user и profiles row
- ✅ login работает
- ✅ reset password отправляет письмо и позволяет установить новый пароль
- ✅ change email отправляет правильное письмо и реально меняет email
- ✅ RLS не дает видеть/менять чужие профили
- ✅ ошибки/edge-cases обработаны (нет сессии, истекший токен, неверный link)

## 8) ВЫХОДНЫЕ АРТЕФАКТЫ (обязательно)
Ты должен:
1) Создать/обновить миграцию SQL в supabase/migrations (с полным SQL).
2) При необходимости создать/обновить callback страницы/роуты в коде.
3) Исправить supabase client init и redirectTo.
4) Сгенерировать типы.
5) Дать список команд, которые я должен запустить в терминале (Cursor) по порядку.

## ОГРАНИЧЕНИЯ
- Никаких опасных открытых политик.
- Не включай сторонние провайдеры (Google/Apple) без запроса.
- Не ломай существующие таблицы — только добавляй недостающее и исправляй RLS/триггеры.
- Если обнаружишь, что проект использует разные SITE_URL для dev/prod — внеси правильную схему, чтобы всё работало и локально, и на https://fitforma.kz.

НАЧНИ С АНАЛИЗА КОДА, потом предложи план, затем внеси изменения и создай миграции.
