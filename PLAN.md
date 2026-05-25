# Архитектурный план — Portfolio Site

## 1. Общая архитектура

Проект — Next.js 16 (App Router) статический сайт-портфолио с одной API-точкой для формы контакта. Терминальный стиль (тёмная тема, monospace, зелёный акцент `#4ade80`).

**Изменения:**
- Метаданные, SEO, JSON-LD → `app/layout.tsx`
- 404 страница → `app/not-found.tsx`
- Форма контакта: клиент → `app/page.tsx` (модификация) + сервер → `app/api/contact/route.ts`
- Анимации скролла → хук `hooks/useInView.ts` + CSS-классы
- Валидация → `lib/contact.ts` (shared types + validation)
- Тесты → `__tests__/*.test.tsx` + `vitest.config.ts`
- PWA → `public/manifest.json`
- Конфигурация → `.env.example`, `next.config.ts`

**Структура после изменений:**
```
app/
  api/contact/route.ts        # NEW
  not-found.tsx               # NEW
  layout.tsx                  # MODIFIED
  page.tsx                    # MODIFIED
  globals.css                 # MODIFIED
hooks/
  useInView.ts                # NEW
lib/
  contact.ts                  # NEW
components/
  CodeResume.tsx              # MODIFIED
  ScrollProgress.tsx          # MODIFIED
  ScrollToTop.tsx             # MODIFIED
public/
  favicon.ico                 # NEW
  icon.png                    # NEW
  apple-icon.png              # NEW
  manifest.json               # NEW
  (старые SVG заменены)
__tests__/                     # NEW
  ScrollProgress.test.tsx
  ScrollToTop.test.tsx
  not-found.test.tsx
  contact.test.tsx
.env.example                  # NEW
vitest.config.ts              # NEW
next.config.ts                # MODIFIED
package.json                  # MODIFIED
```

---

## 2. Список шагов реализации

### Шаг 1: Обновление метаданных (layout.tsx)

**Что делать:** Обновить `app/layout.tsx` — добавить полные metadata (title, description, openGraph, twitter, robots, icons), JSON-LD structured data (Person + WebSite schema), подключить favicon/иконки.

**Файлы:** `app/layout.tsx`, `public/favicon.ico`, `public/icon.png`, `public/apple-icon.png`

**Проверка:** `npm run build` без ошибок; DevTools → `<head>` содержит og:title, og:description, twitter:card, JSON-LD script

**Независимость:** Да, не требует других шагов.

### Шаг 2: Создание 404 страницы

**Что делать:** Создать `app/not-found.tsx` — тёмный терминальный стиль, ASCII "404: NOT_FOUND", анимированный вывод "Error: page not found", кнопка `cd ~` на главную. Next.js 16 `not-found.tsx` автоматически возвращает HTTP 404.

**Файлы:** `app/not-found.tsx`

**Проверка:** Перейти на `/nonexistent` — видеть кастомную страницу; curl возвращает 404

**Независимость:** Да, не требует других шагов.

### Шаг 3: Конфигурация и env

**Что делать:** Создать `.env.example` с `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID`. Обновить `next.config.ts`: настроить images (remotePatterns если нужно), добавить заголовки кэша. Убрать хардкод email/ссылок из `page.tsx` — вынести в конфиг-объект или `.env`.

**Файлы:** `.env.example`, `next.config.ts`, `app/page.tsx`

**Проверка:** `.env.example` существует; `next.config.ts` компилируется

**Независимость:** Да, но Шаг 4 и Шаг 5 зависят от `.env.example`

### Шаг 4: Валидация формы (lib/contact.ts)

**Что делать:** Создать `lib/contact.ts` — типы `ContactFormData`, `ContactFormErrors`, функцию валидации (name, email, message) без zod (ручная, чтобы не добавлять зависимость). Использовать на клиенте и сервере.

**Файлы:** `lib/contact.ts`

**Проверка:** Импорт и вызов валидации возвращает правильные ошибки для пустых полей, невалидного email

**Независимость:** Да, чистая утилита

### Шаг 5: Функциональная форма контакта (Telegram Bot API)

**Что делать:**
- Сервер: `app/api/contact/route.ts` — POST handler, принимает `{name, email, message}`, валидирует через `lib/contact.ts`, отправляет через `fetch` к Telegram Bot API (`https://api.telegram.org/bot${TOKEN}/sendMessage`), возвращает JSON `{success: true/false, error?: string}`
- Клиент: модифицировать `ContactSection` в `app/page.tsx` — заменить `handleSubmit` на асинхронный fetch к `/api/contact`, добавить spinner (терминальный `[█]`), ошибку (красный текст), успех (зелёный текст), кнопку "SEND_ANOTHER"

**Файлы:** `app/api/contact/route.ts`, `app/page.tsx`, `lib/contact.ts`

**Проверка:** С валидным `.env` форма отправляет сообщение в Telegram; без `.env` возвращает ошибку; spinner отображается во время отправки

**Зависимости:** Шаг 3 (env), Шаг 4 (validation)

### Шаг 6: Создание хука useInView

**Что делать:** Создать `hooks/useInView.ts` — IntersectionObserver-based хук с options (`threshold`, `triggerOnce`, `rootMargin`). Возвращает `{ ref, inView }`.

**Файлы:** `hooks/useInView.ts`

**Проверка:** Импорт без ошибок; использование в тестовом компоненте срабатывает при входе во вьюпорт

**Независимость:** Да, но Шаг 7 и Шаг 8 от него зависят

### Шаг 7: Анимации при скролле (IntersectionObserver)

**Что делать:**
- Применить `useInView` ко всем секциям (about, projects, resume, contact) — добавлять CSS-класс `in-view` при входе во вьюпорт
- Stagger для карточек проектов (100ms delay между карточками)
- `prefers-reduced-motion` отключает анимации
- Сохранить существующие CSS-анимации как fallback

**Файлы:** `app/page.tsx`, `app/globals.css`, `hooks/useInView.ts`

**Проверка:** При скролле секции появляются с fade-in; карточки проектов — с stagger; `prefers-reduced-motion: reduce` отключает анимации

**Зависимости:** Шаг 6 (useInView)

### Шаг 8: Lazy load CodeResume

**Что делать:** Модифицировать `CodeResume.tsx` — запускать typing-анимацию только когда секция в поле зрения (использовать `useInView`). В `page.tsx` — динамический импорт `CodeResume` через `next/dynamic`.

**Файлы:** `app/page.tsx`, `components/CodeResume.tsx`, `hooks/useInView.ts`

**Проверка:** CodeResume не загружает JS до скролла до секции about; typing начинается когда секция видна

**Зависимости:** Шаг 6 (useInView), Шаг 7 (IntersectionObserver setup)

### Шаг 9: Accessibility (aria, focus, reduced-motion)

**Что делать:**
- Добавить `aria-current="page"` на активную кнопку навигации
- Добавить `aria-label` на поля формы, `aria-required` на обязательные
- Добавить `aria-label` на ссылки проектов ("Source code of {project}")
- Убедиться что нет `outline: none` без замены (в `globals.css` input:focus имеет `outline: none` с box-shadow — это ок, но добавить fallback focus-стиль для всех интерактивных)
- `prefers-reduced-motion` в `globals.css` отключает scanline, cursor blink, glitch, fade-анимации

**Файлы:** `app/page.tsx`, `app/globals.css`

**Проверка:** Tab-навигация по всем элементам; видимый focus ring; активная секция имеет `aria-current`; `prefers-reduced-motion` отключает анимации

**Зависимости:** Шаг 7 (чтобы не конфликтовать с анимациями)

### Шаг 10: Оптимизация производительности (throttle, lazy video)

**Что делать:**
- `ScrollProgress.tsx` — добавить throttle для scroll handler (requestAnimationFrame)
- `ScrollToTop.tsx` — добавить throttle; анимация скрытия (fade-out вместо `if (!visible) return null`)
- Видео-превью — добавить `loading="lazy"` через IntersectionObserver; `preload="none"` уже есть
- Заменить дефолтные SVG в `public` на свои (или удалить)
- Обновить год в футере на `new Date().getFullYear()`

**Файлы:** `components/ScrollProgress.tsx`, `components/ScrollToTop.tsx`, `app/page.tsx`, `public/*.svg`

**Проверка:** Scroll-обработчики throttled; ScrollToTop скрывается с анимацией; видео грузятся только при скролле; год динамический

**Зависимости:** Нет прямых зависимостей

### Шаг 11: Тесты (Vitest + RTL)

**Что делать:**
- Установить `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
- Создать `vitest.config.ts`
- Написать тесты:
  1. `ScrollProgress.test.tsx` — рендер, структура
  2. `ScrollToTop.test.tsx` — не виден в начале, виден после скролла
  3. `not-found.test.tsx` — содержит "404" и ссылку на главную
  4. `contact.test.tsx` — ошибки при пустых полях
- Добавить скрипт `test` в `package.json`

**Файлы:** `vitest.config.ts`, `package.json`, `__tests__/ScrollProgress.test.tsx`, `__tests__/ScrollToTop.test.tsx`, `__tests__/not-found.test.tsx`, `__tests__/contact.test.tsx`

**Проверка:** `npm test` запускает тесты и они проходят

**Зависимости:** Шаг 2 (not-found), Шаг 5 (contact form), Шаг 10 (ScrollProgress, ScrollToTop)

### Шаг 12: PWA (manifest)

**Что делать:** Создать `public/manifest.json` — name, short_name, start_url, display, background_color, theme_color, icons 192x192 и 512x512. Обновить `layout.tsx` — добавить `<link rel="manifest">` (Next.js 16 автоматически подхватывает `manifest.json` из `public/`).

**Файлы:** `public/manifest.json`, `app/layout.tsx`

**Проверка:** DevTools → Application → Manifest показывает корректные данные

**Независимость:** Да, но лучше после Шага 1 (layout уже модифицирован)

---

## 3. Компонентная диаграмма

```
app/layout.tsx (Server Component)
├── metadata + JSON-LD
├── <html> + <body>
└── children
    └── app/page.tsx ("use client")
        ├── ScrollProgress           — throttled scroll bar
        ├── <header>                 — nav with aria-current
        ├── <main>
        │   ├── AboutSection
        │   │   └── CodeResume       — lazy loaded, useInView
        │   ├── ProjectsSection
        │   │   └── VideoPreview × N — lazy video via IntersectionObserver
        │   ├── ResumeSection
        │   └── ContactSection       — async form → API route
        ├── ScrollToTop              — throttled, animated hide
        └── <footer>                 — dynamic year

Новые:
  hooks/useInView.ts                 — IntersectionObserver hook
  lib/contact.ts                     — types + validation (shared)
  app/api/contact/route.ts           — Telegram Bot API endpoint
  app/not-found.tsx                  — 404 page
  public/manifest.json               — PWA manifest
```

---

## 4. Data flow — форма контакта

```
[Клиент]                              [Сервер Next.js]              [Telegram]
   │                                        │                           │
   │ POST /api/contact                      │                           │
   │ { name, email, message }               │                           │
   │───────────────────────────────────────>│                           │
   │                                        │ validate(name, email,     │
   │                                        │   message) via lib/contact │
   │                                        │                           │
   │                                        │ If invalid:                │
   │ <── { success: false, errors } ────────│ return 400                │
   │                                        │                           │
   │                                        │ fetch(telegram API)       │
   │                                        │──────────────────────────>│
   │                                        │                           │
   │                                        │ <── { ok: true } ────────│
   │                                        │                           │
   │ <── { success: true } ────────────────│ return 200                │
   │                                        │                           │
   │ Show spinner while loading             │                           │
   │ Show error/success message             │                           │
```

---

## 5. Зависимости между шагами

```
Шаг 1 (metadata)         — нет зависимостей
Шаг 2 (404)              — нет зависимостей
Шаг 3 (config/env)       — нет зависимостей
Шаг 4 (validation)       — нет зависимостей
Шаг 5 (contact form)     ← Шаг 3 (env), Шаг 4 (validation)
Шаг 6 (useInView)        — нет зависимостей
Шаг 7 (scroll anim)      ← Шаг 6 (useInView)
Шаг 8 (lazy CodeResume)  ← Шаг 6 (useInView), Шаг 7 (scroll setup)
Шаг 9 (a11y)             ← Шаг 7 (не конфликтовать с анимациями)
Шаг 10 (perf)            — нет зависимостей (можно параллельно с 6-9)
Шаг 11 (tests)           ← Шаг 2 (404), Шаг 5 (contact), Шаг 10 (components)
Шаг 12 (PWA)             ← Шаг 1 (layout уже модифицирован)
```

Оптимальный порядок выполнения:

```
1 → 2 → 3 → 4 → 6
                ↓
          ┌──── 5 ────┐
          │           │
          7           10
          ↓
          8
          ↓
          9
          ↓
          11
          ↓
          12
```

Шаги 4, 6, 10 можно делать параллельно (независимы). Шаг 5 ждёт 3+4. Шаг 7 ждёт 6. Шаг 11 ждёт 2+5+10.

---

## 6. Конфигурация

### Переменные окружения (`.env.example`):
```
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

### Пакеты для установки:

| Пакет | Версия | Зачем | Шаг |
|-------|--------|-------|-----|
| `vitest` | latest | Test runner | 11 |
| `@testing-library/react` | latest | Component testing | 11 |
| `@testing-library/jest-dom` | latest | DOM matchers | 11 |
| `jsdom` | latest | DOM environment | 11 |

Решение **не** устанавливать `zod` (ручная валидация — достаточно для 3 полей) и `@serwist/next` (PWA — только manifest, SW — опционально P2).

### Изменения в `package.json`:
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "vitest": "^x.y.z",
    "@testing-library/react": "^x.y.z",
    "@testing-library/jest-dom": "^x.y.z",
    "jsdom": "^x.y.z"
  }
}
```

### Изменения в `next.config.ts`:
```ts
const nextConfig: NextConfig = {
  images: {
    // remotePatterns если нужно
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        // CSP headers if needed (P2)
      ],
    },
  ],
};
```

### CSS Custom Properties (уже есть в `globals.css`):
```
--background: #0a0a0a
--foreground: #e5e5e5
--accent: #4ade80
--accent-dim: #22c55e
--card-bg: #121212
```

Дополнить `globals.css`:
- `.in-view` класс для IntersectionObserver (fade-in + translateY)
- `@media (prefers-reduced-motion: reduce)` отключает scanline, cursor, glitch, fade-анимации
- Focus-стили для всех интерактивных элементов (outline: 2px solid accent)
