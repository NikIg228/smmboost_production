## Supabase Auth — мастер‑файл SQL для проекта

Этот файл собирает **все необходимые SQL‑команды**, которые нужны для корректной работы всех использующих Supabase функций аутентификации в этом проекте:

- **Регистрация** (signUp)
- **Вход** (signIn)
- **Изменение пароля в ЛК** (updateUser password)
- **Изменение почты в ЛК** (updateUser email)
- **Восстановление пароля** (resetPasswordForEmail)

Важно понимать:

- Встроенные функции Supabase Auth (`auth.signUp`, `auth.signInWithPassword`, `auth.updateUser`, `auth.resetPasswordForEmail`) **работают на системной схеме `auth`**, которую Supabase создает и поддерживает автоматически.
- Нам нужно **дописать только свою часть**:
  - таблица `public.profiles`;
  - триггеры, чтобы профили создавались и обновлялись автоматически;
  - RLS‑политики безопасности.

Ниже — полный набор SQL, который нужен для всех этих сценариев в рамках этого проекта.

---

## 1. База: таблица `public.profiles` + индекс

Эта часть обеспечивает хранение публичного профиля пользователя, связанного с `auth.users`.

```sql
-- 1. Таблица profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  role text DEFAULT 'client',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Индекс по role (для возможной фильтрации по ролям)
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
```

Используется при:

- регистрации (создается профиль после появления строки в `auth.users`);
- входе / работе в ЛК (чтение/обновление информации профиля);
- смене email (синхронизация email между `auth.users` и `profiles`).

---

## 2. Общая инфраструктура: `updated_at` (для всех обновлений профиля)

```sql
-- Функция для автоматического обновления updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер для автоматического обновления updated_at
DROP TRIGGER IF EXISTS set_updated_at ON public.profiles;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
```

Используется при:

- любом обновлении профиля (например, изменение имени, роли и т.д.).

---

## 3. Регистрация: автосоздание профиля при вставке в `auth.users`

При регистрации через `supabase.auth.signUp(...)` Supabase создает запись в `auth.users`.  
Нам нужно автоматически создать соответствующую запись в `public.profiles`.

```sql
-- Функция для автоматического создания профиля при регистрации пользователя
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', '')
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Триггер для создания профиля при регистрации (AFTER INSERT ON auth.users)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

Используется при:

- **регистрации** (`signUp`): создается строка в `profiles` с `id = auth.users.id`, `email = auth.users.email`, `full_name` из `raw_user_meta_data.name`.

---

## 4. Изменение почты: синхронизация `auth.users.email → public.profiles.email`

При смене email через `supabase.auth.updateUser({ email: newEmail })` Supabase обновляет `auth.users.email`.  
Нам нужно синхронизировать поле `email` в таблице `profiles`.

```sql
-- Функция для синхронизации email при изменении в auth.users
CREATE OR REPLACE FUNCTION public.handle_user_email_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET email = NEW.email
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Триггер для синхронизации email при изменении в auth.users
DROP TRIGGER IF EXISTS on_auth_user_email_updated ON auth.users;
CREATE TRIGGER on_auth_user_email_updated
  AFTER UPDATE OF email ON auth.users
  FOR EACH ROW
  WHEN (OLD.email IS DISTINCT FROM NEW.email)
  EXECUTE FUNCTION public.handle_user_email_update();
```

Используется при:

- **изменении почты в ЛК** (EmailChangeModal → `updateUserEmail` → `supabase.auth.updateUser({ email: newEmail })`);
- возможном изменении email админом через Supabase Dashboard.

---

## 5. RLS: безопасность для таблицы `public.profiles`

Нужно, чтобы:

- пользователь **видел только свой** профиль;
- пользователь **мог обновлять только свой** профиль;
- профили **нельзя было создавать напрямую** извне (только через триггер на `auth.users`).

```sql
-- Включаем RLS на таблице profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Политика SELECT: пользователь может видеть только свой профиль
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Политика UPDATE: пользователь может обновлять только свой профиль
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Политика INSERT: запрещаем прямую вставку (только через триггер)
DROP POLICY IF EXISTS "Users cannot insert profiles" ON public.profiles;
CREATE POLICY "Users cannot insert profiles"
  ON public.profiles
  FOR INSERT
  WITH CHECK (false);
```

Используется при:

- **регистрации** — профиль создается только через триггер, а не через прямые INSERT;
- **просмотре/редактировании профиля** в /profile — фронт/бэкенд видит/меняет только свою строку;
- защите от утечки данных между пользователями.

---

## 6. Как это связано с функциями Supabase в коде

Ниже — связь между **JS/TS функциями** и **SQL** из этого мастер‑файла.

### 6.1. Регистрация (signUp)

JS/TS (упрощённо):

```ts
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      name,
    },
    emailRedirectTo: `${window.location.origin}/auth/callback?type=signup`,
  }
});
```

SQL из этого файла:

- `public.handle_new_user` + триггер `on_auth_user_created` — создают профиль в `public.profiles`;
- RLS — гарантирует, что пользователь видит только свой профиль.

### 6.2. Вход (signIn)

JS/TS:

```ts
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

Дополнительный SQL **не требуется**:

- используется внутренняя схема `auth` Supabase;
- RLS влияет только на `public.profiles`, а не на логин.

### 6.3. Изменение пароля в ЛК (PasswordChangeModal)

JS/TS (упрощённо):

```ts
const { error } = await supabase.auth.updateUser({
  password: newPassword
});
```

Дополнительный SQL **не требуется**:

- пароль хранится и обрабатывается Supabase внутри `auth.users`;
- наша таблица `profiles` не содержит пароля и не требует изменений.

### 6.4. Изменение почты в ЛК (EmailChangeModal)

JS/TS:

```ts
const { data, error } = await supabase.auth.updateUser({
  email: newEmail
});
```

SQL из этого файла:

- `public.handle_user_email_update` + триггер `on_auth_user_email_updated` — синхронизируют `profiles.email` с `auth.users.email`;
- RLS по‑прежнему защищает доступ к строкам `profiles`.

Важно:

- redirect URL для подтверждения смены email настраивается **в Dashboard** (Site URL / Redirect URLs), а не через SQL.

### 6.5. Восстановление пароля (resetPasswordForEmail)

JS/TS:

```ts
const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: `${window.location.origin}/auth/callback?type=recovery`,
});
```

SQL:

- дополнительных SQL‑команд **не требуется** — это встроенная функция Supabase Auth, работающая с `auth.users`;
- наша таблица `profiles` не затрагивается, но при входе после смены пароля всё продолжает работать благодаря RLS и триггерам.

---

## 7. Итог: один мастер‑блок SQL

Если нужно «запустить всё разом», можно выполнить **единый скрипт** ниже — это просто объединение всех предыдущих блоков:

```sql
-- ==============================
-- МАСТЕР-СКРИПТ ДЛЯ SUPABASE AUTH / PROFILES
-- ==============================

-- 1. Таблица profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  full_name text,
  role text DEFAULT 'client',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- 2. Функция updated_at + триггер
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.profiles;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 3. Регистрация: создание профиля
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', '')
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 4. Смена email: синхронизация email
CREATE OR REPLACE FUNCTION public.handle_user_email_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET email = NEW.email
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_email_updated ON auth.users;
CREATE TRIGGER on_auth_user_email_updated
  AFTER UPDATE OF email ON auth.users
  FOR EACH ROW
  WHEN (OLD.email IS DISTINCT FROM NEW.email)
  EXECUTE FUNCTION public.handle_user_email_update();

-- 5. RLS‑политики для profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users cannot insert profiles" ON public.profiles;
CREATE POLICY "Users cannot insert profiles"
  ON public.profiles
  FOR INSERT
  WITH CHECK (false);
```

Этого SQL‑набора **достаточно для корректной работы**:

- регистрации,
- входа,
- смены пароля в ЛК,
- смены email в ЛК,
- восстановления пароля

с точки зрения базы данных и безопасности. Остальное (redirect URLs, email‑шаблоны, callback‑страницы) настраивается в коде и в Supabase Dashboard.

