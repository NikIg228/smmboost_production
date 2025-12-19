# Инструкция по исправлению ошибки деплоя Netlify

## Проблема
Netlify не может найти репозиторий, потому что в настройках указан неправильный URL репозитория.

**Ошибка:** `Failed to prepare repo`
**Причина:** Несоответствие имени репозитория в настройках Netlify

**Текущая настройка Netlify:** `github.com/Niklg228/smmboost_production`  
**Фактический репозиторий:** `https://github.com/NikIg228/smm_boost_prod_08.09.git`

## Решение

### Шаг 1: Проверьте текущий репозиторий
Фактический репозиторий: `https://github.com/NikIg228/smm_boost_prod_08.09.git`  
Ветка: `main`  
Пользователь GitHub: `NikIg228` (обратите внимание на большую букву I)

### Шаг 2: Обновите настройки репозитория в Netlify

1. Войдите в панель управления Netlify: https://app.netlify.com
2. Выберите ваш сайт **smm-boost**
3. Нажмите кнопку **"Deploy settings"** (с иконкой шестеренки) внизу страницы
4. В разделе **Repository** нажмите **"Change repository"** или **"Edit settings"**
5. Выберите правильный репозиторий: `NikIg228/smm_boost_prod_08.09`
   - ⚠️ **Важно:** Убедитесь, что имя пользователя `NikIg228` (с большой буквой I), а не `Niklg228`
6. Убедитесь, что выбрана ветка `main`
7. Сохраните изменения

### Шаг 3: Проверьте авторизацию Netlify

Если репозиторий приватный или авторизация была отозвана:

1. В настройках репозитория нажмите **Reconnect repository**
2. Авторизуйте Netlify GitHub App для доступа к репозиторию
3. Убедитесь, что приложение имеет доступ к репозиторию `smm_boost_prod_08.09`

### Шаг 4: Запустите новый деплой

1. После обновления настроек перейдите в раздел **Deploys**
2. Нажмите **Trigger deploy** → **Deploy site**
3. Дождитесь завершения сборки

### Шаг 5: Проверка (если проблема сохраняется)

Если ошибка все еще возникает:

1. Откройте полные логи деплоя в Netlify UI
2. Найдите строки с ошибками git/clone/permission
3. Убедитесь, что:
   - Репозиторий существует и доступен
   - Ветка `main` существует и содержит коммиты
   - Netlify GitHub App имеет необходимые разрешения

## Альтернативное решение (если репозиторий был переименован)

Если вы хотите использовать имя `smmboost_production` вместо `smm_boost_prod_08.09`:

1. Переименуйте репозиторий на GitHub в `smmboost_production`
2. Обновите remote URL локально:
   ```bash
   git remote set-url origin https://github.com/NikIg228/smmboost_production.git
   ```
3. Обновите настройки в Netlify на новое имя репозитория

## Дополнительная информация

- **Текущий remote:** `https://github.com/NikIg228/smm_boost_prod_08.09.git`
- **Настройка Netlify (неправильная):** `github.com/Niklg228/smmboost_production`
- **Ветка:** `main`
- **Node версия:** 18 (указана в netlify.toml)
- **Build команда:** `npm run build`
- **Publish директория:** `dist`
- **Домен:** `smmboost.space`

## Вариант решения: Переименовать репозиторий на GitHub

Если вы хотите использовать имя `smmboost_production` (как указано в Netlify), вы можете:

1. Переименовать репозиторий на GitHub из `smm_boost_prod_08.09` в `smmboost_production`
2. Обновить remote URL локально:
   ```bash
   git remote set-url origin https://github.com/NikIg228/smmboost_production.git
   ```
3. Запушить изменения:
   ```bash
   git push -u origin main
   ```
4. Затем в Netlify просто переподключить репозиторий с правильным именем

