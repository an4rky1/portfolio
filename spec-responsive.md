# Спецификация: Responsive Design — Mobile-First Адаптация

## Цель
Улучшить адаптивность портфолио-сайта на мобильных устройствах (320px+). Текущая версия использует только `md:` брейкпоинт (768px) и не имеет плавных переходов между размерами экрана. На малых экранах элементы выглядят слишком крупными, расположение контента не оптимизировано под вертикальный просмотр.

**Задачи:**
1. Добавить `sm:` (640px) брейкпоинты для более плавной адаптации
2. Уменьшить размеры элементов на мобильных (< 640px)
3. CodeResume — вертикальное расположение панелей на мобильных
4. Навигация — компактнее, без переносов
5. Уменьшить паддинги секций, карточек, кнопок на мобильных
6. Убедиться, что всё выглядит хорошо на 320px ширине

---

## Пользовательские истории

1. **Как посетитель с мобильного телефона**, я хочу видеть навигацию компактной и без переносов на новую строку, чтобы быстро переключаться между секциями.
2. **Как посетитель с мобильного**, я хочу, чтобы панели в CodeResume шли друг под другом, а не рядом, чтобы читать их без горизонтального скролла.
3. **Как посетитель с мобильного**, я хочу, чтобы карточки проектов и секции не занимали слишком много места по высоте с огромными паддингами.
4. **Как владелец портфолио**, я хочу корректное отображение на устройствах от 320px до 1024px без горизонтального скролла и наложений.

---

## Функциональные требования

### F1. Добавить `sm:` (640px) и `lg:` (1024px) брейкпоинты

Сейчас используется только `md:` (768px) — добавить `sm:` для мобильных устройств и `lg:` для планшетов/промежуточных размеров.

**Какие классы изменить в Tailwind:**
- Везде, где стоит `md:` — добавить/обновить с учётом `sm:` для более ранней адаптации
- Там, где есть `flex-col md:flex-row` — оставить, но проверить, нужно ли также на `sm:` менять поведение

### F2. Header / Навигация (P0)

**Файл: `app/page.tsx`**

**Текущий код (строка 131–153):**
```tsx
<header className="fixed top-0 left-0 right-0 border-b border-white/20 bg-background/95 backdrop-blur z-40 px-6 py-4">
  <div className="max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="text-accent text-xl"><span className="glitch">&lt;&gt;</span></span>
        <h1 className="text-2xl font-bold text-white">Roman Ivanov</h1>
        <span className="cursor"></span>
      </div>
      <nav className="flex flex-wrap gap-2">
        {(["about", "projects", "resume", "contact"] as Section[]).map((section) => (
          <button key={section} ... className={`btn-nav ...`}>
            [{section.toUpperCase()}]
          </button>
        ))}
      </nav>
    </div>
  </div>
</header>
```

**Изменения:**
1. Уменьшить `padding` хедера: `px-6 py-4` → `px-4 py-3 sm:px-6 sm:py-4`
2. Уменьшить gap: `gap-4` → `gap-2 sm:gap-4`
3. Уменьшить заголовок: `text-2xl` → `text-xl sm:text-2xl`
4. Навигация: `flex-wrap gap-2` → `flex-nowrap gap-1 sm:gap-2` + добавить `overflow-x-auto` для скролла, если кнопки не помещаются. Либо оставить flex-wrap, но уменьшить размер самих кнопок (см. F5)

### F3. CodeResume — вертикальное расположение на мобильных (P0)

**Файл: `components/CodeResume.tsx`**

**Текущий код (строка 277):**
```tsx
<div className="flex min-h-[450px]">
```

**Текущий код (строка 279):**
```tsx
<div className={`flex-1 p-4 border-r border-green-900/30 transition-all duration-500 ${showSkills ? "w-1/2" : "w-full"}`}>
```

**Текущий код (строка 301):**
```tsx
<div className="w-1/2 p-4 animate-fade-in">
```

**Изменения:**
1. `flex min-h-[450px]` → `flex flex-col md:flex-row min-h-[250px] md:min-h-[450px]`
2. About panel: `flex-1 p-4` → `flex-1 p-3 sm:p-4`
3. Skills panel: `w-1/2 p-4` → `w-full md:w-1/2 p-3 sm:p-4`
4. Убрать `border-r` на мобильных у About panel, добавить `border-b md:border-b-0 md:border-r`

### F4. Project cards — уменьшить padding и tech tags на мобильных (P0)

**Файл: `app/globals.css`**

**Текущий код (строка 166–172):**
```css
.card {
  border: 1px solid var(--border);
  background: var(--card-bg);
  padding: 1.5rem;
  ...
}
```

**Изменения:**
1. Уменьшить `padding` карточки: `1.5rem` → `1rem` на мобильных (`@media (max-width: 639px)`)
2. `card-header`: margin от padding карточки: `margin: -1.5rem -1.5rem 1rem -1.5rem` → адаптировать под новый padding

**Файл: `app/page.tsx`** — tech stack теги (строка 383):
```tsx
<span className="relative border border-white/20 bg-transparent px-2 py-0.5 text-base text-accent font-mono uppercase tracking-wider ...">
```

**Изменения:**
3. Tech stack теги: `text-base` → `text-xs sm:text-sm lg:text-base`
4. И для in-progress тегов (строка 446): `text-base` → `text-xs sm:text-sm lg:text-base`

### F5. Section titles — уменьшить font-size на мобильных (P0)

**Файл: `app/globals.css`**

**Текущий код (строка 155–163):**
```css
.section-title {
  font-size: 2rem;
  ...
}
```

**Изменения:**
1. `font-size: 2rem` → `font-size: 1.5rem` на мобильных
2. На `sm:` и выше — вернуть `2rem`
3. `margin-bottom: 1rem` → `0.75rem` на мобильных

Можно сделать через медиа-запрос:
```css
.section-title {
  font-size: 1.5rem;
}
@media (min-width: 640px) {
  .section-title {
    font-size: 2rem;
  }
}
```

### F6. Global buttons — уменьшить padding на мобильных (P0)

**Файл: `app/globals.css`**

**Текущий код (строка 54–68):**
```css
.btn {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  ...
}
```

**Текущий код (строка 116–127):**
```css
.btn-nav {
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  ...
}
```

**Изменения:**
1. `.btn`: `padding: 0.6rem 1.2rem` → `padding: 0.4rem 0.8rem` на мобильных, `font-size: 1rem` → `0.85rem`
2. `.btn-nav`: `padding: 0.6rem 1.2rem` → `padding: 0.35rem 0.7rem` на мобильных, `font-size: 1rem` → `0.8rem`
3. На sm+ — вернуть текущие значения

### F7. Footer — уменьшить отступы на мобильных (P1)

**Файл: `app/page.tsx`**

**Текущий код (строка 171–178):**
```tsx
<footer className="border-t border-white/20 mt-16 px-6 py-4">
  <div className="max-w-6xl mx-auto text-center text-base text-gray-500">
    <p>© {new Date().getFullYear()} Roman Ivanov. All rights reserved.</p>
    ...
  </div>
</footer>
```

**Изменения:**
1. `mt-16` → `mt-8 sm:mt-16`
2. `px-6 py-4` → `px-4 py-3 sm:px-6 sm:py-4`
3. `text-base` → `text-sm sm:text-base`

### F8. Contact links — уменьшить иконки и паддинги на мобильных (P1)

**Файл: `app/page.tsx`**

**Текущий код (строка 651–699):** контактные ссылки с `w-10 h-10` иконками и `p-4` паддингами.

**Изменения:**
1. Контейнер ссылки: `p-4` → `p-3 sm:p-4`
2. Иконка: `w-10 h-10` → `w-8 h-8 sm:w-10 sm:h-10`
3. SVG внутри: `w-5 h-5` → `w-4 h-4 sm:w-5 sm:h-5`
4. Текст подписи: `text-xs` → оставить `text-xs`, но `text-sm` для значений → `text-xs sm:text-sm`

### F9. ScrollToTop — скорректировать отступы от краёв (P1)

**Файл: `components/ScrollToTop.tsx`**

**Текущий код (строка 26):**
```tsx
className={`fixed bottom-6 right-6 w-10 h-10 ...`}
```

**Изменения:**
1. `bottom-6 right-6` → `bottom-4 right-4 sm:bottom-6 sm:right-6`
2. `w-10 h-10` оставить (touch target minimum — хорошо)
3. Убедиться, что кнопка не перекрывает контент на 320px (проверить z-index и позиционирование)

### F10. Секции — padding top/bottom (P1)

**Файл: `app/page.tsx` и `app/globals.css`**

**Текущий код в `globals.css` (строка 421–423):**
```css
section {
  padding: 2rem 0;
}
```

**Изменения:**
1. `section`: `padding: 2rem 0` → `padding: 1.5rem 0` (базовое)
2. В `page.tsx` инлайн-классы `px-6 py-8` → `px-4 py-6 sm:px-6 sm:py-8`

### F11. Responsive gap для сетки проектов (P1)

**Файл: `app/page.tsx`**

**Текущий код (строка 364, 416):**
```tsx
<div className="grid md:grid-cols-2 gap-6">
```

**Изменения:**
1. `gap-6` → `gap-4 sm:gap-6`
2. Добавить `lg:grid-cols-2` (уже есть `md:grid-cols-2` — достаточно, но при возможности добавить `lg:`)

### F12. Видео-превью и placeholder (P1)

**Файл: `app/page.tsx`**

VideoPreview компонент (строка 48–70) с `aspect-video` — на мобильных всё ок.

Work in progress placeholder (строка 433–440):
```tsx
<div className="aspect-video bg-gradient-to-br ...">
  <div className="text-4xl mb-2">⚙️</div>
  <span className="text-yellow-400/60 text-base">WORK_IN_PROGRESS</span>
</div>
```

**Изменения:**
1. `text-4xl` → `text-2xl sm:text-4xl`
2. `text-base` → `text-xs sm:text-base`

### F13. Форма контакта — поля ввода (P1)

**Файл: `app/page.tsx`**

**Текущий код (строка 735, 755, 775):**
```tsx
className="... px-4 py-3 ..."
```

**Изменения:**
1. `px-4 py-3` → `px-3 py-2.5 sm:px-4 sm:py-3`
2. Кнопка отправки (строка 787): `px-8 py-3 text-base` → `px-6 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base`

### F14. Card-header адаптация под новый padding (P1)

**Файл: `app/globals.css`**

**Текущий код (строка 207–215):**
```css
.card-header {
  ...
  padding: 0.5rem 1rem;
  margin: -1.5rem -1.5rem 1rem -1.5rem;
}
```

**Изменения:**
1. На мобильных: `margin: -1rem -1rem 1rem -1rem` (если padding карточки будет 1rem)
2. На sm+: вернуть `margin: -1.5rem -1.5rem 1rem -1.5rem`

### F15. Resume секция — отзывчивость (P1)

**Файл: `app/page.tsx`**

Строка 484–572 — карточки опыта и образования. Текущие отступы в `py-2`, `px-6` — должны адаптироваться.

**Изменения:**
1. Карточки внутри Resume: padding стандартизировать через классы `.card`, которые уже будут адаптивны
2. `text-base` в описаниях → `text-sm sm:text-base`
3. `text-lg` в заголовках → `text-base sm:text-lg`

### F16. Tailwind Config — добавить кастомные брейкпоинты (если нужно)

Проверить, достаточно ли стандартных `sm` (640px), `md` (768px), `lg` (1024px). Если нет — добавить кастомные.

В Tailwind CSS 4 (`@theme inline {}` в `globals.css`) можно добавить:
```css
@theme inline {
  --breakpoint-xs: 480px;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
}
```

Скорее всего, стандартных брейкпоинтов достаточно.

---

## Нефункциональные требования

### Производительность
- Изменения не должны увеличивать размер CSS/JS бандла (используем только Tailwind utility-классы, без новых зависимостей)
- Избегать `@media` в CSS там, где можно обойтись Tailwind-классами (но для кастомных CSS-классов `.btn`, `.card` медиа-запросы допустимы)

### Совместимость
- Mobile-first: минимальная ширина 320px (iPhone SE)
- Поддержка планшетов (768px–1024px) через `md:` и `lg:` брейкпоинты
- Горизонтальная ориентация на мобильных не должна ломать layout

### Доступность
- Touch targets: минимальный размер 44x44 CSS-пикселя (WCAG 2.5.8). Убедиться, что все интерактивные элементы на мобильных не меньше 44px
- ScrollToTop (w-10 h-10 = 40x40px) — минимально допустимо, не уменьшать
- Навигационные кнопки на мобильных не должны становиться меньше 44px по высоте

### Консистентность
- Все изменения должны сохранять существующую терминальную эстетику (тёмная тема, monospace, зелёный акцент #4ade80)
- Не менять desktop-вид (на md+ всё должно выглядеть как сейчас)

---

## Критерии приёмки (Acceptance Criteria)

### AC1 — Header / Навигация
- [ ] На мобильных (< 640px) кнопки навигации не переносятся на новую строку (flex-nowrap или компактнее)
- [ ] Padding навигационных кнопок уменьшен на мобильных (< 640px)
- [ ] Заголовок "Roman Ivanov" уменьшен на мобильных
- [ ] Header занимает меньше вертикального пространства на мобильных

### AC2 — CodeResume
- [ ] На мобильных (< 768px) панели About и Skills расположены друг под другом (flex-col)
- [ ] На десктопе (>= 768px) панели расположены рядом (flex-row)
- [ ] `min-h` уменьшен на мобильных (250px вместо 450px)
- [ ] Разделитель между панелями меняется с `border-r` на `border-b` на мобильных

### AC3 — Project Cards
- [ ] Padding карточек уменьшен на мобильных (1rem вместо 1.5rem)
- [ ] Tech stack теги имеют меньший font-size на мобильных (text-xs)
- [ ] Card-header margin адаптирован под новый padding

### AC4 — Section Titles
- [ ] font-size секционных заголовков уменьшен на мобильных (1.5rem вместо 2rem)
- [ ] margin-bottom заголовков уменьшен на мобильных

### AC5 — Global Buttons (.btn, .btn-nav)
- [ ] padding уменьшен на мобильных (< 640px)
- [ ] font-size уменьшен на мобильных (< 640px)
- [ ] Touch target размер не меньше 44px по высоте

### AC6 — Footer
- [ ] `mt-16` уменьшен до `mt-8` на мобильных
- [ ] Padding футера уменьшен на мобильных
- [ ] font-size уменьшен на мобильных

### AC7 — Contact Links
- [ ] Иконки уменьшены на мобильных (w-8 h-8 вместо w-10 h-10)
- [ ] Padding контактных ссылок уменьшен (p-3 вместо p-4)
- [ ] font-size текста в контактах уменьшен на мобильных

### AC8 — ScrollToTop
- [ ] Отступы от краёв уменьшены на мобильных (bottom-4 right-4 вместо bottom-6 right-6)
- [ ] Размер кнопки не изменён (w-10 h-10 — минимальный touch target)

### AC9 — Общая адаптация
- [ ] Сайт корректно отображается на 320px ширине (iPhone SE)
- [ ] Сайт корректно отображается на 375px (iPhone)
- [ ] Сайт корректно отображается на 768px (iPad вертикально)
- [ ] Нет горизонтального скролла на всех указанных разрешениях
- [ ] Все интерактивные элементы доступны для тапа

### AC10 — Регрессия
- [ ] На десктопе (>= 1024px) внешний вид не изменён
- [ ] Все существующие анимации и эффекты (fade-in, glitch, cursor blink) работают
- [ ] `prefers-reduced-motion` не затронут изменениями

---

## UI/UX (изменения относительно текущего)

**До/После — только на мобильных устройствах (< 640px):**

| Элемент | Сейчас | Станет |
|---------|--------|--------|
| Header padding | `px-6 py-4` | `px-4 py-3` |
| Имя в хедере | `text-2xl` | `text-xl` |
| Nav кнопки padding | `0.6rem 1.2rem` | `0.35rem 0.7rem` |
| Nav кнопки font-size | `1rem` | `0.8rem` |
| Section titles | `2rem` | `1.5rem` |
| Card padding | `1.5rem` | `1rem` |
| Card-header margin | `-1.5rem` | `-1rem` |
| Tech stack tags | `text-base` | `text-xs` |
| .btn padding | `0.6rem 1.2rem` | `0.4rem 0.8rem` |
| .btn-nav padding | `0.6rem 1.2rem` | `0.35rem 0.7rem` |
| Footer mt | `mt-16` | `mt-8` |
| Footer padding | `px-6 py-4` | `px-4 py-3` |
| Contact icon wrapper | `w-10 h-10` | `w-8 h-8` |
| Contact link padding | `p-4` | `p-3` |
| ScrollToTop offset | `bottom-6 right-6` | `bottom-4 right-4` |
| CodeResume layout | `flex-row` | `flex-col` |
| CodeResume min-height | `450px` | `250px` |

---

## Список изменений с приоритетами

| # | Компонент | Файл | Изменение | Приоритет |
|---|-----------|------|-----------|-----------|
| 1 | CodeResume layout | `CodeResume.tsx` | `flex-col` на мобильных, `flex-row` на md+ | P0 |
| 2 | CodeResume min-h | `CodeResume.tsx` | `250px` на моб, `450px` на md+ | P0 |
| 3 | Nav кнопки padding | `globals.css` | `.btn-nav` padding уменьшен на моб | P0 |
| 4 | Header padding | `page.tsx` | `px-4 py-3 sm:px-6 sm:py-4` | P0 |
| 5 | Section titles | `globals.css` | `font-size: 1.5rem` на моб, `2rem` на sm+ | P0 |
| 6 | Card padding | `globals.css` | `1rem` на моб, `1.5rem` на sm+ | P0 |
| 7 | Card-header margin | `globals.css` | Адаптация под padding карточки | P0 |
| 8 | Tech stack tags | `page.tsx` | `text-xs` на моб, `text-base` на lg+ | P1 |
| 9 | Global .btn padding | `globals.css` | padding/font-size уменьшен на моб | P1 |
| 10 | Footer отступы | `page.tsx` | `mt-8 px-4 py-3` на моб | P1 |
| 11 | Contact icon size | `page.tsx` | `w-8 h-8` на моб | P1 |
| 12 | Contact link padding | `page.tsx` | `p-3` на моб | P1 |
| 13 | ScrollToTop offset | `ScrollToTop.tsx` | `bottom-4 right-4` на моб | P1 |
| 14 | Section padding | `globals.css` + `page.tsx` | `py-6 px-4` на моб | P1 |
| 15 | Resume text sizes | `page.tsx` | `text-sm` на моб | P1 |
| 16 | Grid gap | `page.tsx` | `gap-4` на моб, `gap-6` на sm+ | P1 |
| 17 | WIP placeholder | `page.tsx` | `text-2xl` на моб | P1 |
| 18 | Form inputs | `page.tsx` | `px-3 py-2.5` на моб | P1 |
| 19 | Submit button | `page.tsx` | `px-6 py-2.5 text-sm` на моб | P1 |
| 20 | CodeResume разделитель | `CodeResume.tsx` | `border-b` на моб, `border-r` на md+ | P1 |
| 21 | Header gap | `page.tsx` | `gap-2` на моб, `gap-4` на sm+ | P1 |
| 22 | Nav wrapping | `page.tsx` | `flex-nowrap` или `overflow-x-auto` | P1 |

---

## Затрагиваемые файлы

| Файл | Характер изменений |
|------|-------------------|
| `app/globals.css` | Медиа-запросы для `.btn`, `.btn-nav`, `.card`, `.card-header`, `.section-title` |
| `app/page.tsx` | Tailwind-классы в Header, Projects, Resume, Contact, Footer |
| `components/CodeResume.tsx` | Layout-классы (`flex-col md:flex-row`, min-h, разделители) |
| `components/ScrollToTop.tsx` | Отступы от краёв |

---

## Оценка сложности

| Область | Сложность | Примерное время |
|---------|-----------|-----------------|
| CodeResume адаптация | Низкая | 0.5–1 час |
| CSS-классы (.btn, .card, .section-title) | Низкая | 0.5–1 час |
| Header & навигация | Низкая | 0.5 часа |
| Projects секция (теги, gap) | Низкая | 0.5 часа |
| Contact & Footer | Низкая | 0.5 часа |
| ScrollToTop & мелочи | Низкая | 0.25 часа |
| Тестирование на разных разрешениях | Средняя | 1–2 часа |

**Общая сложность: низкая**
**Ориентировочное время: 4–6 часов**

---

## Детальные изменения по файлам

### 1. `app/globals.css`

Добавить медиа-запросы в конец файла (перед `@media (prefers-reduced-motion)`):

```css
/* === Responsive: Mobile (< 640px) === */
@media (max-width: 639px) {
  .btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }

  .btn-nav {
    padding: 0.35rem 0.7rem;
    font-size: 0.8rem;
  }

  .card {
    padding: 1rem;
  }

  .card-header {
    margin: -1rem -1rem 1rem -1rem;
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }
}

/* Tablet+ (> 639px) — возвращаем десктопные значения */
@media (min-width: 640px) {
  .section-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
}
```

### 2. `app/page.tsx`

#### Header (строка 131):
```
px-6 py-4 → px-4 py-3 sm:px-6 sm:py-4
text-2xl font-bold → text-xl font-bold sm:text-2xl
gap-4 → gap-2 sm:gap-4
```

#### Nav (строка 139):
```
flex-wrap gap-2 → flex-nowrap gap-1 sm:gap-2 (или overflow-x-auto)
```

#### Sections (строки 189, 346, 474, 643):
```
px-6 py-8 → px-4 py-6 sm:px-6 sm:py-8
```

#### Projects grid (строка 364, 416):
```
gap-6 → gap-4 sm:gap-6
```

#### Tech stack теги (строка 383, 446):
```
text-base → text-xs sm:text-sm lg:text-base
```

#### Project buttons (строка 389–402, 452–457):
Проверить, что кнопки не слишком мелкие — оставить как есть или добавить sm-адаптацию.

#### Contact links (строка 652–698):
```
p-4 → p-3 sm:p-4
w-10 h-10 → w-8 h-8 sm:w-10 sm:h-10
w-5 h-5 → w-4 h-4 sm:w-5 sm:h-5
text-sm → text-xs sm:text-sm (для значений)
```

#### Contact form (строка 735, 755, 775):
```
px-4 py-3 → px-3 py-2.5 sm:px-4 sm:py-3
```

#### Submit button (строка 787):
```
px-8 py-3 text-base → px-6 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base
```

#### Footer (строка 171):
```
mt-16 → mt-8 sm:mt-16
px-6 py-4 → px-4 py-3 sm:px-6 sm:py-4
text-base → text-sm sm:text-base
```

#### Resume section (строки 488–571):
Проверить `text-base` → `text-sm sm:text-base` для описаний.
Проверить заголовки `text-lg` → `text-base sm:text-lg`.

#### WIP placeholder (строка 437–438):
```
text-4xl → text-2xl sm:text-4xl
text-base → text-xs sm:text-base
```

### 3. `components/CodeResume.tsx`

#### Контейнер (строка 277):
```
<div className="flex min-h-[450px]">
→ <div className="flex flex-col md:flex-row min-h-[250px] md:min-h-[450px]">
```

#### About panel (строка 279):
```
<div className={`flex-1 p-4 border-r border-green-900/30 ...`}>
→ <div className={`flex-1 p-3 sm:p-4 border-b md:border-b-0 md:border-r border-green-900/30 ...`}>
```

#### Skills panel (строка 301):
```
<div className="w-1/2 p-4 animate-fade-in">
→ <div className="w-full md:w-1/2 p-3 sm:p-4 animate-fade-in">
```

### 4. `components/ScrollToTop.tsx`

#### Кнопка (строка 26):
```
bottom-6 right-6 → bottom-4 right-4 sm:bottom-6 sm:right-6
```

---

## Проверка touch targets

**Минимальный размер для тач-целей (WCAG 2.5.8): 44x44 CSS-пикселя.**

| Элемент | Размер на моб (после изменений) | OK? |
|---------|--------------------------------|-----|
| Nav кнопки | ~0.35rem*2 + font ≈ 30px высота | ⚠️ Меньше 44px — но кнопки имеют border и padding, нужно проверить итоговую высоту. Если < 44px — добавить `min-h-[44px]` или `py-2` |
| .btn | ~0.4rem*2 + 0.85rem ≈ 30px | ⚠️ Аналогично — добавить `min-h-[44px]` при необходимости |
| Contact icon | w-8 h-8 = 32x32px | ❌ Меньше 44px. Но вся ссылка имеет padding, итоговый размер кликабельной области будет w-8 + p-3*2 ≈ 32+24 = 56px — OK |
| ScrollToTop | w-10 h-10 = 40x40px | ⚠️ Меньше 44px. Рассмотреть увеличение до 44x44 (`w-11 h-11`) или убедиться, что padding вокруг даёт достаточный кликабельный регион. Оставить как есть (40px — близко к требованию, padding не добавляется) |
| Project card buttons | Зависит от padding | Нужно проверить — если кнопки с `py-2` на мобильных, то высота ≈ 0.5rem*2 + font ≈ 30px — может быть мало |

**Рекомендация:** для навигационных кнопок и `.btn` на мобильных установить `min-h-[44px]` если текущий padding + font-size дают меньше 44px.

---

## Структура проекта (после изменений)

Файловая структура **не изменится** — правки только в существующих файлах:

```
portfolio/
├── app/
│   ├── globals.css               # MODIFIED — добавлены медиа-запросы для mobile
│   ├── page.tsx                   # MODIFIED — Tailwind-классы адаптации
│   └── ...
├── components/
│   ├── CodeResume.tsx             # MODIFIED — flex-col/md:flex-row, min-h
│   └── ScrollToTop.tsx            # MODIFIED — bottom/right offsets
└── ...
```
