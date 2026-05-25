# План: Responsive Design — Mobile-First Адаптация

**Цель:** Добавить `sm:` (640px) брейкпоинты, уменьшить элементы на мобильных (<640px), вертикальный layout CodeResume.

---

## Шаг 1. `app/globals.css` — медиа-запросы

Добавить в конец файла `@media (max-width: 639px) { }`:

- `.btn` — `padding: 0.4rem 0.8rem; font-size: 0.85rem;`
- `.btn-nav` — `padding: 0.35rem 0.7rem; font-size: 0.8rem;`
- `.card` — `padding: 1rem;`
- `.card-header` — `margin: -1rem -1rem 1rem -1rem;`
- `.section-title` — `font-size: 1.5rem; margin-bottom: 0.75rem;`

Добавить `@media (min-width: 640px) { .section-title { font-size: 2rem; margin-bottom: 1rem; } }`

---

## Шаг 2. `components/CodeResume.tsx` — flex-col, min-h, border

- Контейнер: `flex` → `flex flex-col md:flex-row min-h-[250px] md:min-h-[450px]`
- About panel: `flex-1 p-4 border-r` → `flex-1 p-3 sm:p-4 border-b md:border-b-0 md:border-r`
- Skills panel: `w-1/2 p-4` → `w-full md:w-1/2 p-3 sm:p-4`

---

## Шаг 3. `app/page.tsx` — Tailwind-классы

**Header:**
- `px-6 py-4` → `px-4 py-3 sm:px-6 sm:py-4`
- `text-2xl` → `text-xl sm:text-2xl`
- `gap-4` → `gap-2 sm:gap-4`
- nav: `flex-wrap gap-2` → `flex-nowrap gap-1 sm:gap-2`

**Sections (About, Projects, Resume, Contact):** `px-6 py-8` → `px-4 py-6 sm:px-6 sm:py-8`

**Projects:**
- grid: `gap-6` → `gap-4 sm:gap-6`
- tech tags: `text-base` → `text-xs sm:text-sm lg:text-base`

**Contact:**
- link: `p-4` → `p-3 sm:p-4`; icon: `w-10 h-10` → `w-8 h-8 sm:w-10 sm:h-10`; SVG: `w-5 h-5` → `w-4 h-4 sm:w-5 sm:h-5`
- form inputs: `px-4 py-3` → `px-3 py-2.5 sm:px-4 sm:py-3`
- submit: `px-8 py-3 text-base` → `px-6 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base`

**Footer:** `mt-16 px-6 py-4 text-base` → `mt-8 sm:mt-16 px-4 py-3 sm:px-6 sm:py-4 text-sm sm:text-base`

**Resume:** `text-base` → `text-sm sm:text-base`; `text-lg` → `text-base sm:text-lg`

**WIP placeholder:** `text-4xl` → `text-2xl sm:text-4xl`; `text-base` → `text-xs sm:text-base`

---

## Шаг 4. `components/ScrollToTop.tsx` — отступы от краёв

- `bottom-6 right-6` → `bottom-4 right-4 sm:bottom-6 sm:right-6`
