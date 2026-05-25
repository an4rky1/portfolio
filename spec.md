# Спецификация: Portfolio Site — Performance, UX & DX Improvements

## Цель
Превратить существующее портфолио разработчика из статической демонстрации в production-ready сайт с высокой производительностью, доступностью, SEO-оптимизацией и полноценным пользовательским опытом.

Текущий сайт имеет терминальный/кодовый стиль (тёмная тема, monospace, зелёный акцент #4ade80), анимацию печати кода, секции About/Projects/Resume/Contact и базовую навигацию. Однако метаданные дефолтные, форма контакта не отправляет данные, анимации не привязаны к скроллу, нет тестов, нет PWA, отсутствует страница 404.

Цель — устранить все эти пробелы, сохранив и улучшив визуальный стиль.

---

## Пользовательские истории

1. **Как рекрутер**, я хочу видеть правильные Open Graph-теги при отправке ссылки в мессенджер, чтобы сразу понять, что это портфолио разработчика.
2. **Как посетитель с мобильного**, я хочу быстро загрузить сайт и плавно взаимодействовать с ним, чтобы не ждать долгой загрузки на слабом интернете.
3. **Как посетитель**, я хочу видеть анимации появления секций при скролле, чтобы сайт ощущался живым и современным.
4. **Как посетитель**, я хочу отправить сообщение через форму контакта и получить подтверждение, что оно ушло, чтобы связаться с разработчиком.
5. **Как пользователь скринридера**, я хочу получать осмысленные aria-метки и семантическую структуру, чтобы навигировать по сайту.
6. **Как посетитель с клавиатурой**, я хочу обходить все интерактивные элементы через Tab с видимым фокусом, чтобы пользоваться сайтом без мыши.
7. **Как разработчик портфолио**, я хочу получать 90+ по Lighthouse Performance и Accessibility, чтобы сайт выглядел профессионально.
8. **Как разработчик портфолио**, я хочу базовые тесты для ключевых компонентов, чтобы избежать регрессий.
9. **Как пользователь**, я хочу видеть кастомную страницу 404 при переходе на несуществующий URL, чтобы не уйти с сайта.
10. **Как пользователь**, я хочу установить сайт как PWA на телефон, чтобы быстро открывать портфолио.

---

## Функциональные требования

### F1. Метаданные и SEO (P0)
- Обновить `metadata` в `app/layout.tsx`:
  - `title`: "Roman Ivanov — Fullstack Developer"
  - `description`: краткое описание портфолио
  - `metadataBase`: указать домен
  - `openGraph`: title, description, url, siteName, locale, type: "website"
  - `twitter`: card, title, description
  - `robots`: index, follow
  - `icons`: favicon, apple-touch-icon, shortcut icon
- Создать `/public/favicon.ico`, `/public/icon.png`, `/public/apple-icon.png` на основе существующего фото или нового SVG
- Добавить JSON-LD structured data (Person + WebSite schema) в layout

### F2. Страница 404 (P0)
- Создать `app/not-found.tsx`:
  - Сохранить общий стиль (тёмная тема, monospace, зелёный акцент)
  - Крупный ASCII-арт или текст "404: NOT_FOUND"
  - Кнопка "cd ~" для возврата на главную
  - Анимированный терминальный вывод: "Error: page not found"
  - Ссылка на главную страницу

### F3. Функциональная форма контакта (P0)
- Реализовать отправку формы через **Telegram Bot API** (простейший вариант без доп. зависимостей):
  - Создать API route `app/api/contact/route.ts`
  - Принимает POST с { name, email, message }
  - Отправляет сообщение через `fetch` к Telegram Bot API
  - Возвращает JSON-ответ об успехе/ошибке
- На клиенте:
  - Заменить текущий `handleSubmit` (просто `setFormSubmitted(true)`) на асинхронный fetch к `/api/contact`
  - Показать индикатор загрузки (терминальный spinner)
  - Показать ошибку, если отправка не удалась
  - Валидация полей (name, email, message) на клиенте и сервере
- Переменные окружения: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
- **Альтернатива**: если Telegram Bot API нежелателен — использовать EmailJS (client-side) или Resend (server-side)

### F4. Анимации появления при скролле (P0)
- Заменить текущие CSS-анимации `animate-fade-in-delay-*` (которые срабатывают при загрузке страницы) на Intersection Observer:
  - Создать хук `useInView` (или React Intersection Observer)
  - Анимировать каждую секцию (about, projects, resume, contact) при входе во вьюпорт
  - Анимировать карточки проектов по отдельности с задержкой (stagger)
  - Анимация: fade-in + translateY (как сейчас)
- Микро-анимации:
  - При ховере на проект — подсветка границ (уже частично есть)
  - Появление элементов с typing-эффектом только когда секция в поле зрения (сейчас CodeResume запускается сразу)

### F5. Accessibility (A11y) (P1)
- Семантический HTML:
  - `<header>` с `<nav>` — уже есть
  - `<main>` — уже есть
  - Добавить `<section>` с `aria-labelledby` для каждой секции
- aria-метки:
  - Кнопки навигации: `aria-current="page"` для активной
  - Форма: `aria-label` на поля, `aria-required` на обязательные
  - ScrollToTop: `aria-label` уже есть
  - Видео-превью: `aria-label` с именем проекта
  - Ссылки в проектах: `aria-label="Source code of {project name}"`
- Клавиатурная навигация:
  - Все интерактивные элементы доступны через Tab
  - Визуальный focus ring (не `outline: none` без замены)
  - Скрывать scanline-эффект при `prefers-reduced-motion`
- Цветовой контраст: проверить текущие цвета (текст #e5e5e5 на #0a0a0a — должно быть хорошо)

### F6. Оптимизация производительности (P1)
- Настроить `next.config.ts`:
  - Добавить `images` для next/image (remotePatterns если нужны)
- Видео-превью:
  - Добавить `poster` кадры для видео
  - Использовать `<video preload="none">` или lazy load через Intersection Observer
  - Конвертировать .mp4 в WebM для экономии трафика
- Вынести тяжёлые компоненты в lazy loading:
  - CodeResume — загружать только когда секция about видна
- Добавить `loading="lazy"` для изображений, если появятся
- Оптимизировать шрифты: Google Fonts через next/font (уже используется Geist, но убедиться что subset 'latin' достаточен)
- Удалить неиспользуемые CSS-классы и анимации
- Рассмотреть использование React Compiler (если доступен в Next.js 16)

### F7. Тесты (P1)
- Установить Vitest + React Testing Library (или Playwright для e2e)
- Написать базовые тесты:
  - `ScrollProgress` — рендерится, имеет правильную структуру
  - `ScrollToTop` — не показывается в начале, показывается после скролла
  - `CodeResume` — рендерится, показывает терминальный заголовок
  - Страница 404 — содержит "404" и ссылку на главную
  - Контактная форма — показывает ошибки при пустых полях
- Smoke-тест: главная страница рендерится без ошибок (render)

### F8. PWA / Service Worker (P2)
- Создать манифест `app/manifest.ts` или `public/manifest.json`:
  - name: "Roman Ivanov — Fullstack Developer"
  - short_name: "Portfolio"
  - start_url: "/"
  - display: "standalone"
  - background_color: "#0a0a0a"
  - theme_color: "#4ade80"
  - icons: 192x192, 512x512
- Service Worker через `next-pwa` или `serwist`:
  - Кэширование статики (шрифты, CSS, JS)
  - Офлайн-страница (можно реюзнуть 404)
- Для Next.js 16 — проверить совместимость, возможно использовать `@serwist/next`

### F9. Оптимизация изображений и статики (P1)
- Заменить SVG в `/public` (file.svg, globe.svg, next.svg, vercel.svg, window.svg) на свои:
  - Favicon/icon/apple-icon
  - Логотип для PWA
- Если фото (`photo_2026-05-19_15-58-59.jpg`) используется — добавить через `next/image` с оптимизацией
- Настроить кэширование статических файлов

### F10. Улучшение существующих компонентов (P1)
- `ScrollProgress`: мемоизировать через `useCallback` для scroll handler, добавить throttle
- `ScrollToTop`: скрывать с анимацией (не просто `if (!visible) return null`)
- `CodeResume`: запускать анимацию только когда секция в поле зрения (IntersectionObserver)
- Исправить хардкод email в контактных ссылках на переменные окружения или конфиг
- Обновить год в футере на динамический: `new Date().getFullYear()`
- Убрать "use client" из page.tsx где возможно, вынести клиентские компоненты в отдельные файлы

---

## Нефункциональные требования

### Производительность
- Lighthouse Performance ≥ 90 (desktop), ≥ 70 (mobile)
- First Contentful Paint (FCP) ≤ 1.5s
- Largest Contentful Paint (LCP) ≤ 2.5s
- Cumulative Layout Shift (CLS) ≤ 0.1
- Bundle size: минимизировать, не добавлять тяжёлых библиотек
- Размер первой загрузки JS ≤ 150KB (gzip)

### Доступность
- Lighthouse Accessibility ≥ 95
- Все интерактивные элементы доступны с клавиатуры
- Визуальный focus-индикатор (2px outline, достаточно контрастный)
- Соблюдение WCAG 2.1 AA (цветовой контраст, aria-метки)

### SEO
- Lighthouse SEO = 100
- Правильные метаданные на всех страницах
- Open Graph + Twitter Card работают корректно
- JSON-LD присутствует на главной
- Страница 404 возвращает HTTP 404

### Безопасность
- API route для контакта: валидация входных данных (zod или ручная)
- Telegram Bot Token только на сервере (env variables)
- Защита от спама: простой rate limiting (например, через headers или in-memory map)
- Content Security Policy (CSP) заголовки

### Совместимость
- Поддержка последних 2 версий Chrome, Firefox, Safari, Edge
- Адаптивность: mobile-first (320px+), планшеты, десктоп
- `prefers-reduced-motion` отключает декоративные анимации
- `prefers-color-scheme` учитывать (сайт всегда тёмный, но не ломаться на светлой теме)

---

## Список изменений с приоритетами

| # | Задача | Приоритет | Категория | Затрагиваемые файлы |
|---|--------|-----------|-----------|---------------------|
| 1 | Обновить metadata в layout + Open Graph + JSON-LD | P0 | SEO | `app/layout.tsx` |
| 2 | Создать фавикон и иконки (favicon.ico, icon.png, apple-icon.png) | P0 | SEO | `public/` |
| 3 | Создать страницу 404 | P0 | UX | `app/not-found.tsx` |
| 4 | Реализовать отправку формы контакта (Telegram Bot API) | P0 | Feature | `app/api/contact/route.ts`, `app/page.tsx`, `.env` |
| 5 | Валидация полей формы (клиент + сервер) | P0 | Feature | `app/page.tsx`, `app/api/contact/route.ts` |
| 6 | Intersection Observer анимации при скролле | P0 | UX | Новый хук `useInView`, `app/page.tsx`, компоненты |
| 7 | Lazy load CodeResume (только когда виден) | P1 | Performance | `app/page.tsx`, `CodeResume.tsx` |
| 8 | Accessibility: aria-метки, семантика, focus-стили | P1 | A11y | `app/page.tsx`, все компоненты |
| 9 | Keyboard navigation + visible focus ring | P1 | A11y | `app/globals.css`, компоненты |
| 10 | `prefers-reduced-motion` поддержка | P1 | A11y | `app/globals.css` |
| 11 | Lazy load видео (IntersectionObserver + preload=none) | P1 | Performance | `app/page.tsx` (VideoPreview) |
| 12 | Настроить next.config.ts (изображения, заголовки кэша) | P1 | Performance | `next.config.ts` |
| 13 | Установить Vitest + RTL, написать базовые тесты | P1 | Testing | Конфигурация + `__tests__/` |
| 14 | Мемоизация scroll-обработчиков (throttle/debounce) | P1 | Performance | `ScrollProgress.tsx`, `ScrollToTop.tsx`, `app/page.tsx` |
| 15 | Динамический год в футере | P1 | DX | `app/page.tsx` |
| 16 | Email/ссылки в контактах вынести в конфиг/env | P1 | DX | `app/page.tsx` |
| 17 | Заменить дефолтные SVG в public на свои | P1 | Branding | `public/*.svg` |
| 18 | PWA manifest + Service Worker | P2 | PWA | `public/manifest.json`, `sw.ts` |
| 19 | Poster для видео + WebM альтернативы | P2 | Performance | `public/projects/*.{webm,jpg}` |
| 20 | CSP заголовки | P2 | Security | `next.config.ts` |

---

## Критерии приёмки (Acceptance Criteria)

### AC1 — Метаданные и SEO
- [ ] `<title>` на главной — "Roman Ivanov — Fullstack Developer" (или аналогично)
- [ ] `<meta name="description">` содержит осмысленное описание
- [ ] Open Graph теги (og:title, og:description, og:image, og:url, og:type) присутствуют в `<head>`
- [ ] Twitter Card теги присутствуют
- [ ] JSON-LD schema (Person + WebSite) присутствует
- [ ] `/favicon.ico`, `/icon.png`, `/apple-icon.png` существуют и корректно подключаются
- [ ] Lighthouse SEO = 100

### AC2 — Страница 404
- [ ] При переходе на `/nonexistent` отдаётся кастомная страница в стиле портфолио
- [ ] Кнопка "на главную" работает
- [ ] HTTP статус ответа = 404

### AC3 — Форма контакта
- [ ] При отправке валидных данных показывается spinner, затем confirmation message
- [ ] При ошибке отправки показывается сообщение об ошибке
- [ ] Валидация: пустые поля подсвечиваются, форма не отправляется
- [ ] После успешной отправки можно нажать "SEND_ANOTHER" и отправить ещё одно сообщение
- [ ] Telegram сообщение приходит с именем, email и текстом

### AC4 — Анимации при скролле
- [ ] Секция "About" появляется с fade-in при скролле до неё
- [ ] Карточки проектов появляются по одной с задержкой при скролле
- [ ] Если повторно проскроллить к секции, анимация повторяется (или не повторяется — по решению)
- [ ] CodeResume запускает typing-анимацию только когда секция видна
- [ ] `prefers-reduced-motion` отключает анимации появления

### AC5 — Accessibility
- [ ] Навигационные кнопки имеют `aria-current="page"` для активной секции
- [ ] Форма: каждый input имеет label или aria-label, обязательные поля помечены
- [ ] Все ссылки и кнопки имеют осмысленные aria-метки
- [ ] Все интерактивные элементы фокусируются через Tab
- [ ] Focus-стиль видим (не `outline: none`)
- [ ] Lighthouse Accessibility ≥ 95

### AC6 — Производительность
- [ ] Lighthouse Performance ≥ 90 (desktop)
- [ ] Размер JS бандла главной страницы не увеличился более чем на 10% (без учёта тестовых зависимостей)
- [ ] Scroll-обработчики не вызывают лишних ререндеров (throttle/debounce)

### AC7 — Тесты
- [ ] `npm test` (или `pnpm test`) запускает тесты
- [ ] Есть хотя бы 4 тест-кейса: ScrollProgress рендер, ScrollToTop видимость, 404 страница, контактная форма
- [ ] Тесты проходят в CI

### AC8 — PWA (если реализовано)
- [ ] Манифест загружается (проверить через DevTools → Application → Manifest)
- [ ] Иконки 192x192 и 512x512 присутствуют
- [ ] Service Worker зарегистрирован (опционально: работает offline)

### AC9 — Code Quality
- [ ] `pnpm lint` (или `npm run lint`) проходит без ошибок
- [ ] Нет `"use client"` в layout.tsx (кроме случаев, где это необходимо)
- [ ] Все переменные окружения перечислены в `.env.example`
- [ ] Хардкод (email, ссылки, год) заменён на переменные

---

## UI/UX (изменения относительно текущего)

Дизайн-система **сохраняется**: тёмная тема (#0a0a0a фон, #4ade80 акцент, monospace, терминальный стиль).

### 404 страница
- Терминальный чёрный экран
- Зелёный текст: `Error 404: NOT_FOUND`
- Анимированный курсор
- Кнопка `$ cd ~ && ./go_home.sh` которая ведёт на `/`

### Форма контакта (дополнения)
- Spinner: анимированный символ `[  █  ]` или `[ / ]` как в терминале
- Ошибка: красный текст `$ ./send_message.sh: error: [причина]`
- Успех: зелёный текст `$ ./send_message.sh: success`

### Анимации
- Сохранить текущие CSS-анимации как fallback
- Intersection Observer добавляет класс `in-view` на элемент
- Stagger-delay для карточек: 100ms между карточками
- `prefers-reduced-motion`: `transition-duration: 0 !important` или класс `no-animations`

---

## Оценка сложности

| Область | Сложность | Примерное время |
|---------|-----------|-----------------|
| Метаданные, SEO, JSON-LD | Низкая | 1-2 часа |
| Страница 404 | Низкая | 30 мин — 1 час |
| Форма контакта (Telegram API) | Средняя | 2-4 часа |
| Intersection Observer анимации | Средняя | 3-5 часов |
| Accessibility (все пункты) | Средняя | 3-5 часов |
| Производительность (lazy loading, throttle) | Средняя | 2-4 часа |
| Тесты (Vitest + RTL setup + кейсы) | Средняя | 3-5 часов |
| PWA (manifest + SW) | Высокая | 3-6 часов |
| Изображения, постеры, кэширование | Низкая | 1-2 часа |

**Общая сложность проекта: средняя**
**Ориентировочное время: 20-35 часов**

---

## Структура проекта (после изменений)

```
portfolio/
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts          # NEW — Telegram Bot API endpoint
│   │   └── resume/
│   │       └── route.ts          # unchanged
│   ├── resume/
│   │   └── page.tsx              # unchanged
│   ├── globals.css               # MODIFIED — focus styles, reduced-motion
│   ├── layout.tsx                # MODIFIED — metadata, JSON-LD, icons, manifest
│   ├── not-found.tsx             # NEW — 404 page
│   └── page.tsx                  # MODIFIED — contact form, IntersectionObserver
├── components/
│   ├── CodeResume.tsx            # MODIFIED — IntersectionObserver запуск
│   ├── ScrollProgress.tsx        # MODIFIED — throttle
│   └── ScrollToTop.tsx           # MODIFIED — анимация скрытия
├── hooks/
│   └── useInView.ts              # NEW — IntersectionObserver hook
├── lib/
│   └── contact.ts                # NEW — валидация, типы
├── public/
│   ├── projects/                 # UNCHANGED
│   ├── favicon.ico               # NEW
│   ├── icon.png                  # NEW
│   ├── apple-icon.png            # NEW
│   └── manifest.json             # NEW
├── __tests__/                    # NEW
│   ├── ScrollProgress.test.tsx
│   ├── ScrollToTop.test.tsx
│   ├── not-found.test.tsx
│   └── contact.test.tsx
├── .env.example                  # NEW
├── next.config.ts                # MODIFIED
├── vitest.config.ts              # NEW
└── package.json                  # MODIFIED
```

---

## Зависимости (которые потребуются)

| Пакет | Зачем | Приоритет |
|-------|-------|-----------|
| `zod` | Валидация формы на клиенте и сервере | P0 (альтернатива — ручная валидация) |
| `vitest` + `@testing-library/react` + `jsdom` | Тесты | P1 |
| `@serwist/next` (или `next-pwa`) | PWA Service Worker | P2 |
| `@vercel/analytics` | Базовая аналитика (опционально) | P2 |

**Анти-паттерны (чего НЕ делать):**
- Не добавлять тяжелые библиотеки (Framer Motion, GSAP) — достаточно CSS + IntersectionObserver
- Не переписывать существующий стиль — сохранить терминальную эстетику
- Не мигрировать на App Router pages — всё уже в App Router
- Не добавлять CMS или базу данных — сайт остаётся статическим с одной API точкой
