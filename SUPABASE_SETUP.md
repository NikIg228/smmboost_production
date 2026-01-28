# Инструкция по настройке Supabase Auth

Этот документ содержит инструкции по применению миграций и настройке аутентификации Supabase.

## Что было реализовано

1. ✅ Таблица `public.profiles` с автоматическим созданием при регистрации
2. ✅ Триггеры для синхронизации email между `auth.users` и `profiles`
3. ✅ RLS политики для безопасности данных
4. ✅ Страница `/reset-password` для сброса пароля
5. ✅ Страница `/auth/callback` для обработки email confirmation и password reset
6. ✅ Обновлены redirectTo URLs во всех auth функциях
7. ✅ Добавлены переводы для новых страниц

## Шаги для применения миграций

### 1. Установка Supabase CLI (если еще не установлен)

```bash
npm install -g supabase
```

Или используйте npx (без глобальной установки):
```bash
npx supabase --version
```

### 2. Логин в Supabase CLI

```bash
supabase login
```

### 3. Привязка проекта к удаленной БД

```bash
supabase link --project-ref kztyhujkgjolxkyzrtyh
```

Где `kztyhujkgjolxkyzrtyh` - это ваш project ref из `.env` файла (из URL: `https://kztyhujkgjolxkyzrtyh.supabase.co`)

### 4. Применение миграций

#### Вариант A: Применить миграцию напрямую к удаленной БД

```bash
supabase db push
```

#### Вариант B: Применить миграцию через SQL Editor в Dashboard

1. Откройте Supabase Dashboard: https://supabase.com/dashboard/project/kztyhujkgjolxkyzrtyh
2. Перейдите в SQL Editor
3. Скопируйте содержимое файла `supabase/migrations/20260128173000_auth_profiles_rls.sql`
4. Вставьте в SQL Editor и выполните

### 5. Генерация TypeScript типов

После успешного применения миграций:

```bash
npm run supabase:types
```

Или вручную:

```bash
supabase gen types typescript --project-id kztyhujkgjolxkyzrtyh > src/types/supabase.ts
```

### 6. Настройка Redirect URLs в Supabase Dashboard

Важно! Нужно добавить следующие URLs в настройках проекта:

1. Откройте Supabase Dashboard: https://supabase.com/dashboard/project/kztyhujkgjolxkyzrtyh
2. Перейдите в **Authentication** → **URL Configuration**
3. Добавьте в **Redirect URLs**:
   - `http://localhost:5173/auth/callback` (для разработки)
   - `http://localhost:5173/reset-password` (для разработки)
   - `https://smmmbooost.netlify.app/auth/callback` (для production)
   - `https://smmmbooost.netlify.app/reset-password` (для production)
   - Или ваш production домен, если отличается

4. В **Site URL** укажите правильный URL (этот URL используется для всех email confirmations):
   - Для разработки: `http://localhost:5173`
   - Для production: `https://smmmbooost.netlify.app` (или ваш домен)
   
   **Важно**: Site URL используется как базовый URL для всех email confirmations (signup, email change, password reset). 
   Supabase автоматически добавит путь `/auth/callback` к этому URL при отправке писем с подтверждением.

### 7. Настройка Email Templates (опционально)

Если нужно настроить шаблоны писем:

1. Перейдите в **Authentication** → **Email Templates**
2. Настройте шаблоны для:
   - **Confirm signup** - подтверждение регистрации
   - **Reset password** - сброс пароля
   - **Change email address** - изменение email

В шаблонах используйте переменную `{{ .ConfirmationURL }}` для ссылки подтверждения.

## Проверка работы

### Чеклист тестирования:

- [ ] Регистрация создает пользователя в `auth.users` и профиль в `public.profiles`
- [ ] Вход работает корректно
- [ ] Сброс пароля отправляет письмо и позволяет установить новый пароль
- [ ] Изменение email отправляет письмо и реально меняет email после подтверждения
- [ ] RLS не дает видеть/менять чужие профили
- [ ] Email confirmation работает (если включено в настройках)
- [ ] Google OAuth работает корректно

### Тестирование локально:

1. Запустите dev сервер:
```bash
npm run dev
```

2. Проверьте регистрацию:
   - Откройте http://localhost:5173
   - Зарегистрируйте нового пользователя
   - Проверьте в Supabase Dashboard, что создался профиль в таблице `profiles`

3. Проверьте сброс пароля:
   - Запросите сброс пароля
   - Проверьте email
   - Перейдите по ссылке из письма
   - Установите новый пароль

4. Проверьте изменение email:
   - Войдите в аккаунт
   - Измените email в профиле
   - Проверьте email и подтвердите изменение

## Структура миграции

Миграция `20260128173000_auth_profiles_rls.sql` содержит:

1. **Таблица profiles**:
   - `id` (uuid, PRIMARY KEY, ссылается на auth.users)
   - `email` (text)
   - `full_name` (text)
   - `role` (text, default 'client')
   - `created_at` (timestamptz)
   - `updated_at` (timestamptz)

2. **Триггеры**:
   - `on_auth_user_created` - создает профиль при регистрации
   - `on_auth_user_email_updated` - синхронизирует email при изменении
   - `set_updated_at` - обновляет updated_at при изменении профиля

3. **RLS политики**:
   - SELECT: пользователь видит только свой профиль
   - UPDATE: пользователь обновляет только свой профиль
   - INSERT: запрещена (только через триггер)

## Важные замечания

1. **Безопасность**: RLS политики настроены так, что пользователи могут видеть и изменять только свои профили. Никаких открытых политик нет.

2. **Email синхронизация**: Email автоматически синхронизируется между `auth.users` и `profiles` через триггеры.

3. **Redirect URLs**: Убедитесь, что все необходимые URLs добавлены в настройках проекта, иначе письма с подтверждением не будут работать.

4. **Production**: После применения миграций на production, убедитесь, что все redirect URLs настроены для production домена.

## Команды для быстрого старта

```bash
# 1. Логин в Supabase
supabase login

# 2. Привязка проекта
supabase link --project-ref kztyhujkgjolxkyzrtyh

# 3. Применение миграций
supabase db push

# 4. Генерация типов
npm run supabase:types
```

## Поддержка

Если возникли проблемы:
1. Проверьте логи в Supabase Dashboard → Logs
2. Убедитесь, что все redirect URLs настроены правильно
3. Проверьте, что миграции применены успешно (в Dashboard → Database → Migrations)
