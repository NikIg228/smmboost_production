# Команды для выполнения

Выполните следующие команды по порядку для применения всех изменений:

## 1. Установка Supabase CLI (если еще не установлен)

```bash
npm install -g supabase
```

Или используйте npx (без глобальной установки):
```bash
npx supabase --version
```

## 2. Логин в Supabase CLI

```bash
supabase login
```

Следуйте инструкциям в терминале для авторизации.

## 3. Привязка проекта к удаленной БД

```bash
supabase link --project-ref kztyhujkgjolxkyzrtyh
```

Где `kztyhujkgjolxkyzrtyh` - это ваш project ref из `.env` файла.

## 4. Применение миграций

```bash
supabase db push
```

Эта команда применит миграцию `supabase/migrations/20260128173000_auth_profiles_rls.sql` к вашей удаленной БД.

**Альтернатива**: Если команда не работает, скопируйте содержимое файла `supabase/migrations/20260128173000_auth_profiles_rls.sql` и выполните его вручную через SQL Editor в Supabase Dashboard.

## 5. Генерация TypeScript типов

```bash
npm run supabase:types
```

Или вручную:

```bash
supabase gen types typescript --project-id kztyhujkgjolxkyzrtyh > src/types/supabase.ts
```

## 6. Настройка Redirect URLs в Supabase Dashboard

**ВАЖНО!** Выполните вручную через веб-интерфейс:

1. Откройте: https://supabase.com/dashboard/project/kztyhujkgjolxkyzrtyh
2. Перейдите в **Authentication** → **URL Configuration**
3. Добавьте в **Redirect URLs**:
   - `http://localhost:5173/auth/callback`
   - `http://localhost:5173/reset-password`
   - `https://smmmbooost.netlify.app/auth/callback` (или ваш production домен)
   - `https://smmmbooost.netlify.app/reset-password` (или ваш production домен)
4. В **Site URL** укажите: `https://smmmbooost.netlify.app` (или ваш production домен)

## Готово!

После выполнения всех команд:
- ✅ Таблица `profiles` создана
- ✅ Триггеры настроены
- ✅ RLS политики применены
- ✅ Страницы для reset password и auth callback готовы
- ✅ Типы TypeScript сгенерированы

Теперь можно тестировать:
- Регистрацию пользователей
- Сброс пароля
- Изменение email
- Email confirmation (если включено)

Подробная документация в файле `SUPABASE_SETUP.md`.
