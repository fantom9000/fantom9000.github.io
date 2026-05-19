# Project Notes For Agents

This is Roman Zhalyalov's UX/UI portfolio website. Roman is a UX/UI designer building a portfolio site from his Figma layouts. The goal is a polished static portfolio for employers, hosted on GitHub Pages and accessible without relying on Vercel.

## Model

Use **claude-sonnet-4-6** for this project. Do not ask Roman for permission before taking local actions (editing files, running builds, deleting unused assets). Confirm only before pushing to remote or other irreversible external actions.

## Current State

- First implementation pass is complete.
- Home page has gone through several visual-polish passes with Roman's feedback. It is not final pixel-perfect, but the current direction must be preserved unless Roman explicitly asks to revert it.
- The project is an Astro static site with 5 routes:
  - `/`
  - `/projects/burosfera/`
  - `/projects/quiz/`
  - `/projects/mary-trufel/`
  - `/projects/peptidy/`
- Production build has passed with `astro build` after the latest Peptid.ru page polish.
- Astro diagnostics have passed with `astro check`: 0 errors, 0 warnings, 0 hints.
- Local dev server was run at `http://127.0.0.1:4321/`.
- Git is initialized in this folder.
- GitHub remote is connected: `https://github.com/fantom9000/roman-portfolio`.
- Current branch is `main`; all work is merged here. **Always work from `main` — do not continue old worktree branches.**
- Latest known commit (на момент этой записи): `6d78583 Cases: desktop-mobile-screens fluid + phone radius scales with width`. Реальный последний — `git log --oneline -5`.
- **Сессия 2026-05-14 (Opus 4.7):** большая переборка типографики и инфраструктуры шрифтов. Закрыты пункты 3, 6, 7. Введены: правильное self-host Inter Display (Regular + Bold), font-smoothing, letter-spacing system, ui = body, мобильный хедер (контакты в строку), 3-tier градация ширин описаний, case-spacing tokens, неразрывный дефис в «AI‑инструменты». Полный список инсайтов — в разделе «Поучительные истории сессии 2026-05-14».
- **Russian typography**: `scripts/typograf.mjs` обрабатывает все `.ts` и `.astro` файлы в `src/` через npm-пакет `typograf`. Вставляет настоящие Unicode-неразрывные пробелы (U+00A0), длинные тире, кавычки-ёлочки и т.д. — **не HTML-сущности** (никаких `&nbsp;` в исходниках). Обрабатывает: строки в кавычках (атрибуты, data поля) + текст между тегами `<p>`, `<h1>-<h6>`, `<li>`. Запускать вручную через `node scripts/typograf.mjs`. DevTools Chrome визуально показывает невидимые U+00A0 как `&nbsp;` — это features DevTools, не реальный контент HTML.
- **Concepts section ≤1000px:** right column (tripadvisor + city) hidden, a separate `.concepts-mobile-row` appears under the bento. Uses CSS Grid `grid-template-columns: 256fr 395fr` so both tiles have matching height with their natural aspect ratios preserved (city `362/395` portrait, tripadvisor `362/256` landscape). At ≤768px, `grid-column` is reset to `1` to match `.side-work`'s single-column layout. HTML duplicates the two tiles (one set in `.concepts-right` for desktop, one in `.concepts-mobile-row` for mobile) — CSS toggles visibility.
- Welcome section uses 5 single-image phone PNGs (1093×2223 after alpha trim), simple grid, gap 10px, max-width 1385px. Mobile: horizontal scroll at 760px.
- Concepts section rebuilt as 7-tile flex bento grid matching Figma structure (see Figma node 351-26598). All tiles exported as PNG 2x by Roman, converted to lossless WebP.
- Project preview images (burosfera, quiz, mary-trufel, peptidy) converted to lossless WebP in `public/images/figma/high/previews/`.
- **Typography system** — all font sizes live in 5 semantic CSS variables in `:root`, fully fluid via `clamp()`:
  - `--type-lead`    → hero/lead text (59px at 1440px → 32px at ≤960px)
  - `--type-section` → section headings "Задизайнил", "Законцептил" etc (42px → 28px at ≤960px)
  - `--type-number`  → project numbers 01–04 (80px → 64px at ≤960px)
  - `--type-body`    → all descriptions, welcome, side-work text (20px → 16px at ≤960px)
  - `--type-ui`      → nav, header, footer (наследует от `--type-body` — был фиксированный 20px, изменено 2026-05-14 в commit 580cc6f, см. секцию «UI-кегль = body»)
  - **No `:root` overrides at any breakpoint** — sizes are continuous between 1440 and 960, then frozen at mobile minimums below 960. The 768 jump was eliminated 2026-05-14 because it produced a non-systematic feel.
  - Mobile minimums chosen to match industry standards (iOS HIG, Material): 16px body is the readability floor.
  - To change any role globally: edit its variable. It updates everywhere across all pages and breakpoints.
- **Spacing system** — all major paddings/gaps live in 4 CSS variables in `:root`, fluid via `clamp()`:
  - `--space-grid`           → grid gaps (20px at 1440 → 8px at ≤960). Used on `.three-d-grid`, `.concepts-mobile-row`, `.welcome-work__text` mobile gap.
  - `--space-block`          → small section paddings (40px → 30px). Used on `.project-preview`, `.side-work`, `.text-section`, footer-bottom.
  - `--space-section`        → section tops (75px → 58px). Used on `.hero-text` top, `.welcome-work` top, footer-top.
  - `--space-section-large`  → large section bottoms (115px → 85px). Used on `.hero-text` bottom, `.welcome-work` bottom.
  - All scale linearly between 1440 and 960, freeze at minimums below 960. **Always prefer these tokens over hardcoded px** for any vertical rhythm changes.
- `text-indent` on hero text fixed: uses `var(--sidebar)` percentage (was hardcoded 310px). Resets to 0 only at 760px, not at 1100px.
- **Project preview at ≤960px**: `.project-sidebar__meta` uses flex row layout. HTML has a `.project-sidebar__text` wrapper around `h2` + `p` so title and description stack tightly inside their own column, with the number as a flex sibling on the left. The number has `margin-top: -0.08em` to compensate for the natural cap-top offset, so the digit's cap-height visually aligns with the title's cap-height.
- **Welcome text at ≤960px**: `.welcome-work__text` is a 2-column grid. The `h2` spans both columns at top, paragraphs sit side by side below. Gap = `--space-block`. `max-width: 95%` leaves a small right air. At ≤585px, collapses back to 1 column with the original `margin-top: 20px` between paragraphs.
- Unused image folders deleted: `figma/optimized/`, `figma/exact/`, top-level `optimized/`, stale home/ originals.
- `.claude/` and `CLAUDE.md` added to `.gitignore` to prevent Claude internal files from polluting git.

## Remaining Work (home page)

- **3D tiles:** Converted from PNG to lossless WebP via Pillow (alpha trim + lossless). PNGs still exist in `public/images/figma/high/three-d-tiles/` and can be deleted after visual approval. Index.astro updated to reference `.webp`.
- **Welcome phones carousel** (desktop + mobile):
  - Desktop: removed `max-width: 1385px; margin: 0 auto` — phones now span full content width, edges align with all other page content.
  - Mobile (≤768px): full horizontal scroll carousel. Phone width = `calc((100vw - 32px) / 2.5)` — always exactly 2.5 phones visible. `margin-left/right: calc(-1 * var(--pad))` for full viewport bleed. `padding-left/right: var(--pad)` so first phone aligns to left силовая линия and last phone has same right margin as all content. `overscroll-behavior-x: contain` prevents page from scrolling when swiping phones. Scrollbar hidden (`scrollbar-width: none`, `::-webkit-scrollbar { display: none }`).
  - Project preview images: removed forced `aspect-ratio: 1.35` at mobile — images now display at their natural proportions.

- **Mobile layout pass complete** (session 2026-05-12, continued):
  - Project preview at ≤768px: kicker moved outside `.project-sidebar` in HTML → flex column with `order`: kicker (1) → visual (2) → sidebar/meta (3).
  - `.project-sidebar__meta` at mobile: CSS grid `auto 1fr`, number spans both rows (`grid-row: 1/3`), `font-size: 64px; line-height: 1` (approximates height of title+description block).
  - Project title and description at mobile: `font-size: 16px` (separate from side-work and welcome which stay at 20px).
  - Section headings at mobile (`.side-work__text h2`): `font-size: 28px` — same as `.project-kicker`. Applied to "Законцептил", "Натридешил" etc.
  - `.side-work__text` at mobile: `margin-bottom: 40px` (2× the ~20px gap from heading to divider above).
  - `.project-kicker` at mobile: `font-size: 28px; margin-bottom: 40px`.
  - Concepts bento grid and 3D grid: desktop layout preserved at mobile (full width, no column changes).
  - `--text-59` minimum kept at `31px` (not raised — higher values caused 5-line lead on narrow desktops with text-indent).
  - Number matching text height is approximated via fixed `font-size: 64px`. Pure CSS auto-matching is not possible without JS; SVG path for the number would enable exact matching but deferred.

- **Concepts bento grid**: gaps (`1.43vw`) and border-radius (`0.83vw`) are viewport-proportional — the whole section scales as one unit. No restructuring at different widths. Any restructuring requires a Figma design from Roman first — do NOT attempt layout changes without a reference.

- **Responsive pass complete** (session 2026-05-12):
  - Fluid typography: `--text-59` now viewport-proportional (`clamp(31px, 4.22vw - 1.69px, 59px)`) so the lead text holds 4 lines at all desktop widths. `--text-42` and `project-number` clamp updated to 768px base.
  - `--text-left: clamp(12px, calc(5px + 1.042vw), 20px)`: scales left-column body text (project titles, descriptions, side-work descriptions, welcome text) from 20px at 1440px down to ~13px at 769px. Clamp minimum is 12px but effectively never reached — formula hits ~13px at 768px (mobile breakpoint). Applied to: `.project-sidebar h2`, `.project-sidebar p`, `.side-work__text p`, `.welcome-work__text h2/p`.
  - `--text-42` changed to viewport-proportional formula (`clamp(21px, 3.2vw - 4px, 42px)`), same principle as `--text-59`. Maintains constant air between left-column headings and right column at all desktop widths.
  - Header/Footer restructured: `.brand`/`.footer-name` replaced with flat `.site-name` + `.site-role` elements. `.site-header` and `.site-footer` changed to `display: grid; grid-template-columns: var(--sidebar) 1fr auto` — "Дизайнер интерфейсов" now always sits exactly on the силовая линия at all desktop widths.
  - Mobile breakpoint changed from 760px to 768px throughout.
  - `three-d-tile img`: `height: 100%` → `height: auto`.
  - At ≤768px: `three-d-grid` → single column; `concepts-grid` → flex column with per-section `aspect-ratio`.
- **PNG source files** for concept tiles still exist alongside WebP — can be deleted once Roman approves quality.

## Case Pages — Layout System

All case pages use a shared component architecture:
- Each page = `<CasePage project={project} />` (one line)
- `CasePage.astro` iterates `project.sections` and renders typed components: `TextSection`, `BrowserFrame`, `ImagePair`, `MobileScreens`, `DesktopMobileScreens`, `wideImage`
- All content (text, images, section types) lives in `src/data/projects.ts`

**Силовые линии on case pages** — all visual elements align to `var(--sidebar)`:
- `TextSection`: `grid-template-columns: calc(var(--sidebar) - 20px) 62.43%` — left col scales with sidebar, right col = 62.43% for consistent right air
- `BrowserFrame` / `wideImage`: `width: min(1086px, calc(100% - var(--sidebar)))` — fills right column exactly
- `ImagePair` / `MobileScreens`: `flex: 0 0 calc((100% - var(--sidebar) - var(--space-grid)) / 2)` — each tile = half of right column, proportional at all widths
- `DesktopMobileScreens`: 3-column grid `calc(var(--sidebar) - var(--space-grid)) 844fr 222fr`, with browser in col 2 and phone in col 3. Sidebar lives as a real (empty) grid column so percentage resolves against own content-box, matching other sections (`text-section` etc.) — **do not move it back into padding-left**, percentage in padding resolves against the parent block and produces a different number, breaking alignment.

**Fluid behavior on case pages (introduced 2026-05-14, Sonnet 4.6 session):**
- All case-grid gaps and flex/grid formulas use `var(--space-grid)` (8–20px clamp) instead of hardcoded 20px — gap scales with viewport.
- `.desktop-mobile-screens` uses `fr` units (844fr 222fr) for proportional desktop:phone (3.8:1, same as Figma 1440) — preserved on every viewport. Phone width is no longer fixed 222px; it fills its grid column.
- Phone bezel `border-radius: 14.86% / 6.86%` — elliptical-% syntax that resolves to identical X and Y radii on phone aspect 222:481, giving a circular corner that scales with the phone (matches Figma 33px at 222px width). All other case radii stay fixed at `--case-radius: 12px` — industry norm.
- **No image cropping** on case pages: `object-fit: cover`, fixed `max-height` on images, `overflow: hidden` on containers smaller than their image, and mismatched `aspect-ratio` are all removed. Images render at their natural Figma ratio (`width: 100%; height: auto`). This is also stated as a Design Rule.
- **Breakpoints for pairs:**
  - `≤960px`: sidebar offset disappears; pairs and desktop-mobile keep flex/grid row layout but use full width.
  - `≤600px`: `case-image-pair` and `mobile-screens` flip to column (each tile becomes full width). `desktop-mobile-screens` stays in row (browser shrinks, phone keeps its fr proportion). Threshold chosen so a single tile at its natural 533px Figma width fits with normal padding.

**Pattern-based architecture (verified 2026-05-14):**
- CasePage.astro renders sections uniformly — no project-specific branches.
- All four cases (`burosfera`, `quiz`, `mary-trufel`, `peptidy`) use only the six section types: `text`, `browser`, `imagePair`, `mobilePair`, `wideImage`, `desktopMobile`.
- Project-specific selectors (`.quiz-preview`, `.peptidy-preview`, `.project-preview[data-project="burosfera"]`) exist only on the home page (project previews), not on case pages themselves.
- Consequence: any new fix to a case pattern (gap, radius, alignment, etc.) automatically applies to all four cases. New cases require only image re-export + `projects.ts` path updates, no new CSS.

**Known tech-debt (not blocking):**
- `BrowserFrame.astro` and `DesktopMobileScreens.astro` still pass inline `style={--frame-height}`, `--desktop-mobile-height`, `--desktop-phone-height`. The CSS no longer uses these variables (everything is `height: auto` now) — they're dead code and the corresponding props (`height`, `desktopHeight`, `mobileHeight`) can be removed.
- Hardcoded `width`/`height` attributes on `<img>` in components (e.g. `width="844" height="568"` in DesktopMobileScreens) are tuned to Burosfera proportions. For other cases with different ratios (e.g. Mary Trufel `task-desktop` is 844×964) this causes minor layout shift before image loads. Cleanest fix is data-driven — store real dimensions in `projects.ts` per image; can be done while converting images for remaining cases (Pillow reports real px size).

- `/projects/burosfera/` — fully re-exported and approved (2026-05-14): 9 images in `figma-sections/` (incl. main-screen, moved from project root), lossless WebP ×2 from Figma PNG, ~1.8 MB total. CSS patterns regressed-tested on all widths.
- `/projects/quiz/` — fully re-exported and approved (2026-05-20): 6 PNG ×2 from Figma → lossless WebP via Pillow, ~1.3 MB total. Orphan `solution-choices.png` (old combined version) removed.
- `/projects/mary-trufel/` — fully re-exported and approved (2026-05-20): 8 PNG ×2 from Figma → lossless WebP via Pillow, ~5.1 MB total. Existing `desktopHeight`/`mobileHeight` values already matched real export dimensions.
- `/projects/peptidy/` — structurally complete for desktop at 1440. **Pending image re-export**.

## Stack

- Astro + TypeScript + plain CSS.
- Static output for GitHub Pages.
- Do not assume Vercel as the primary hosting target.
- User is comfortable with HTML/CSS and wants the code to remain understandable.

## Fonts

- **Inter Display 4.1** (статические Regular + Bold) — единственный шрифт сайта. Self-hosted, скачан с https://github.com/rsms/inter/releases (Inter-4.1.zip, файлы `extras/woff-hinted/InterDisplay-Regular.woff2` и `InterDisplay-Bold.woff2`). Лицензия SIL OFL.
- Файлы: `public/fonts/InterDisplay-Regular.woff2` (~134 КБ) и `public/fonts/InterDisplay-Bold.woff2` (~139 КБ).
- Подключение в `src/styles/global.css` — два `@font-face` под одной family `"Inter Display"`, с разными `font-weight` (400 и 700) и `font-display: swap`.
- Preload в `src/layouts/BaseLayout.astro` только для Regular (Bold подгрузится при первой нужде):
  ```html
  <link rel="preload" href="/fonts/InterDisplay-Regular.woff2" as="font" type="font/woff2" crossorigin />
  ```
- В CSS используется `font-family: "Inter Display", Arial, sans-serif`. Это совпадает с тем что использует Figma в макете.
- **Без variable / opsz axis** — мы используем статические файлы Inter Display (а не InterVariable.woff2 с опс-осью). Причина: в Inter 4.x InterVariable содержит и Text, и Display через `opsz`, но это давало менее предсказуемый результат — иногда браузер не переключал на Display правильно. Статический Inter Display Regular гарантирует тот же визуальный рендер что и Figma.
- Font smoothing: `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;` — обязательно, иначе в Safari шрифты будут «мыльными» из-за subpixel anti-aliasing по умолчанию.
- **Историческая ошибка (исправлена 2026-05-14):** до этого шрифт вообще не подгружался — был только `font-family: "Inter Display"` без `@font-face` и без `<link>`. Браузеры пользователей фолбэчили на Arial. На Mac Романа Inter Display подхватывался системно — поэтому проблема не была видна локально. Сейчас self-hosted (commit `0c1a6b9`).

## Letter-spacing (tracking)

В Figma у Романа разные tracking'и для разных ролей текста — это типографическое решение, в Inter Display нет встроенной optical-size коррекции, поэтому tracking задаётся вручную. Используем `em` (не px), чтобы внутри одной роли tracking масштабировался вместе с кеглем по clamp.

| Роль | Селектор | letter-spacing | Источник значения |
|---|---|---|---|
| Lead (h1) | `.hero-text h1` | `-0.01em` (-1%) | -0.59px при 59px (Figma) |
| Section heading | `.project-kicker`, `.text-section h2`, `.side-work__text h2` | `-0.01em` (-1%) | Figma даёт -3%, но визуально это сильнее чем у лида и ломает иерархию (lead > section по характеру). Опущено до -1% сознательно (Роман: «выдаёт джуна»). |
| Body / Description | `.project-sidebar p`, `.text-section p`, `.side-work__text p` | `0` | Figma 0 |
| UI (хедер, футер, нав) | `.site-header`, `.site-footer` | `0` | Figma 0 |
| Project number (01, 02…) | `.project-number` | `0` | не сверено с Figma — TODO если потребуется |

Правила для будущего:
- **Tracking задавать в `em`, не `px`** — иначе на разных кеглях через clamp будет ломаться пропорция.
- **Между ролями значения разные** — это сознательное дизайнерское решение, не баг.
- **Tracking section ≤ tracking lead** — иначе section выглядит «плотнее» лида, что ломает визуальную иерархию.

## UI-кегль = body (изменено 2026-05-14)

Раньше `--type-ui` был фиксированный 20px, не зависел от ширины. На мобильном это создавало проблему: ui (20px) был **крупнее** body (16px), что концептуально неверно — служебный текст должен быть ≤ контентного.

Сейчас `--type-ui: var(--type-body)` — наследует. На десктопе оба 20px (как и было), на мобильном оба 16px. Хедер/футер плавно масштабируются вместе с body. Один токен меньше для управления.

**Старое правило в `## Стек` про «ui-кегль фиксирован 20px» отменено.**

## Мобильный хедер/футер (≤960px)

Структура — двухколонный grid, имя+роль слева в столбик, контакты справа в строку:

```
| Роман Жалялов              CV  Телеграм  Почта |
| Дизайнер интерфейсов                           |
```

Реализация:
- `grid-template-columns: 1fr auto`
- `row-gap: 0.2em` — пропорциональный отступ между именем и ролью «как интерлиньяж» (от ui-кегля)
- `.contact-links { flex-direction: row, gap: 20px }` — горизонтально (на десктопе так же)
- `.site-role { grid-column: 1; grid-row: 2 }` — явная вторая строка
- `.contact-links { grid-column: 2; grid-row: 1 }` — справа в первой строке

## Case-spacing (вертикальный ритм кейс-страниц)

Кейс-страницы имеют повторяющуюся структуру `[текст] → [картинка] → [текст] → [картинка] → ...`. По закону близости из типографики, gap **внутри пары** (text → image) должен быть **в 2-2.5 раза меньше** gap **между парами** (image → next-text), иначе глаз не считывает «пара» как одну смысловую единицу.

**Два fluid-токена в `:root`:**

| Токен | Формула | Назначение | Применён к |
|---|---|---|---|
| `--space-case-text-bottom` | `clamp(24px, calc(0.83vw + 20px), 32px)` | gap text → image (внутри пары) | `.text-section padding-bottom` |
| `--space-case-block` | `clamp(50px, calc(3.125vw + 35px), 80px)` | gap image → next-text (между парами) | `.browser-frame`, `.mobile-screens`, `.case-image-pair`, `.desktop-mobile-screens`, `.case-wide-image` (padding-bottom; для `.browser-frame` ещё в `height` — там `calc(var(--frame-height) + var(--space-case-block))`) |

**Цифры по ширинам:**

| Ширина | text→image | image→next | Соотношение | line-height (body) |
|---|---|---|---|---|
| 1440 | 32 | 80 | 2.5× | 24 |
| 1024 | 28.5 | 67 | 2.4× | 22 |
| 768 | 26 | 59 | 2.3× | 21 |
| 480 | 24 | 50 | 2.1× | 19 |
| 320 | 24 | 50 | 2.1× | 19 |

**Правила:**
- text→image **всегда ≥ 1.5× line-height body**, иначе картинка визуально «прилипает» к тексту как часть текста (не отдельный блок).
- text→image и image→next-text **никогда не задавать в px-хардкоде** — только через эти токены, чтобы система оставалась fluid.
- Если в новом case-блоке нужен `padding-bottom` снизу — использовать `var(--space-case-block)`.

## Width текстов описаний (3-уровневая градация)

| Ширина | Главная (`.project-sidebar p`, `.side-work__text p`) | Кейсы (`.text-section p`) |
|---|---|---|
| Десктоп (>960) | `max-width: 294px` | `max-width: 294px` (унаследовано из общего правила) |
| Планшет (480–960) | `max-width: 70%` | `max-width: 90%` (колонка `.text-section` шире чем sidebar, 70% даст слишком узко) |
| Телефон (≤480) | `max-width: none` | `max-width: none` |

Логика: на десктопе текст в узкой колонке (sidebar или text-section column) — 294px удобно для чтения. На планшете тоже узковато, но не критично — поджимаем процентом. На телефоне места мало, нужна вся ширина.

Заголовок проекта (`.project-sidebar h2`) на 480–960 тоже 70%, на телефоне остаётся 70% (название короткое, не нуждается в полной ширине).

## Поучительные истории сессии 2026-05-14

- **Не предполагать, что variable шрифт содержит opsz axis.** Я подключил `InterVariable.woff2` как «Inter Display» через `font-optical-sizing: auto`, считая что в нём встроена ось `opsz`. На деле — у современного Inter 4.x в variable файле opsz есть, **но визуально переключение не такое явное как у статического Inter Display**. Решение: **скачать статический `InterDisplay-Regular.woff2`** + `InterDisplay-Bold.woff2` из официального GitHub-релиза Inter (extras/woff-hinted/). Это гарантированно совпадает с тем что Figma показывает.
- **Safari Responsive Design Mode не показывает реальный рендеринг шрифтов.** Эмулятор рендерит при системном DPR Mac (@2x) и масштабирует — даёт «мыло». Реальный iPhone имеет @3x и рендерит резко. Для оценки шрифтов на iOS — реальное устройство или iOS Simulator из Xcode.
- **Cargo.site (платформа Repponen и многих других editorial-портфолио) — закрытая.** Использует custom elements (`<column-set>`, `<column-unit>`, `<media-item>`, `<bodycopy>`) и свой DSL. Многие «фишки» (scroll fade-in, optical курсор, фиксированные хедеры) — features платформы, не воспроизводимы один-в-один. Воспроизводить нужно только **принципы** (двухстрочная навигация, подписи Fig N, цвет #141414 вместо чёрного, минимум hover-состояний).
- **Прежде чем городить решение — сходить в Figma и посмотреть исходные параметры.** Так выяснили что в Figma везде `Inter Display Regular`, на лиде `letter-spacing: -0.59px`, на section `-1.26px`. Без этой проверки полагался бы на «общий вкус» — ошибся бы.
- **Прогрессивный tracking через `em` работает автоматически.** Внутри одной роли (например section с clamp 28-42px) tracking меняется пропорционально без дополнительного кода. Между ролями — разные проценты, это сознательное решение.
- **×3 экспорт картинок из Figma — избыточен для веба.** Слот макета 1086px на десктопе → ×2 (2172px) хватает для всех retina-MacBook и retina-iPhone. ×3 нужен только для iPhone Pro/Pro Max (~5% устройств), остальные качают +50% веса впустую. Правило: экспорт ×2 от **реального** слотового размера.
- **Pillow lossless WebP на фотореалистичных текстурах (3D-сцены, шум, градиенты) даёт 5+ MB на файл — не использовать.** Lossless подходит только для UI/icons/flat illustrations. Для фоторе-листичных картинок: Figma JPG ×2 → Pillow WebP `quality=85, method=6`. Результат: ~10× сжатие vs lossless, визуально неотличимо. На 7 3D-тайлах: 10 MB lossless → 810 KB lossy.
- **Photoshop WebP — есть только в Export As (с версии 23.2, Feb 2022), не в Save for Web Legacy.** Save for Web до сих пор только JPEG/PNG/GIF. В новом Export As WebP появляется в Format dropdown — но в некоторых билдах Photoshop отсутствует (баг или урезанный SKU). В таких случаях проще: экспорт JPG из Figma → Pillow → WebP, чем разбираться с Photoshop.
- **Двойная компрессия JPG → WebP даёт ≤5% потери, визуально неразличимо.** Боялся что JPG q=85 + WebP q=85 даст visible degradation — на практике нет: JPEG и WebP используют похожие частотные преобразования, поэтому второй проход вычищает только то что уже было сжато. Для фотореалистичного контента это надёжный путь.

## Гарантии и ограничения тестирования

- **Safari Responsive Design Mode не показывает реальный рендеринг шрифтов** — это эмулятор, который рендерит при системном DPR Mac (@2x) и масштабирует, поэтому шрифты выглядят «мыльно». Для оценки шрифтов на iOS использовать: реальный iPhone (Safari → Develop → твой iPhone), iOS Simulator из Xcode, или открыть `localhost:4321` на iPhone в той же Wi-Fi (требует `--host 0.0.0.0` для dev-сервера).
- Chrome DevTools Responsive Mode — та же история, но обычно чуть честнее.
- Адаптивный layout (раскладку) проверять можно везде. Качество рендеринга — только реальное устройство.

## Important Local Commands

This machine did not have system `npm`, `pnpm`, or `yarn`. A local pnpm copy was unpacked into `.tools/pnpm`, and `.tools/` is gitignored.

Use this Node binary:

```bash
/Users/Roman/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node
```

Useful commands:

```bash
env ASTRO_TELEMETRY_DISABLED=1 /Users/Roman/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node .tools/pnpm/bin/pnpm.cjs run build
env ASTRO_TELEMETRY_DISABLED=1 /Users/Roman/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node .tools/pnpm/bin/pnpm.cjs exec astro check
env ASTRO_TELEMETRY_DISABLED=1 /Users/Roman/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/astro/astro.js dev --host 127.0.0.1 --port 4321
```

Astro telemetry must stay disabled in sandboxed runs, otherwise Astro tries to write to `~/Library/Preferences/astro`.

Rollup native module had macOS code-signature issues in this environment. `package.json` includes a pnpm override to use `@rollup/wasm-node@4.60.3`. If build ever fails with `@rollup/rollup-darwin-arm64`, reinstall dependencies and make sure Vite resolves Rollup to the WASM package.

## Figma Source

- Main page: `https://www.figma.com/design/SKQ1C6VplMtF9IJjDELfSr/Портфолио?node-id=351-26568`
- UI-kit: `https://www.figma.com/design/SKQ1C6VplMtF9IJjDELfSr/Портфолио?node-id=365-26027`
- File key: `SKQ1C6VplMtF9IJjDELfSr`
- Main Figma routes/pages discovered:
  - `Main`
  - `Бюросфера`
  - `Квиз`
  - `Мэри Трюфель`
  - `Пептиды`
- For Figma work, use `get_design_context` and `get_metadata` when needed, but be economical with context. Roman prefers to provide page screenshots and downloaded assets himself when possible. Ask Roman for screenshots/assets instead of generating screenshots automatically unless a screenshot is essential to resolve ambiguity.

## Layout System — Силовые линии

This principle applies to ALL pages of the site. Never break it.

The layout is built on two vertical power lines (силовые линии):
- **Left line**: 20px from the left edge of the page. Everything in the left column starts here: "Роман Жалялов", project numbers, side-work headings.
- **Right line**: `--sidebar = 22.428571%` from the container. Everything in the right column starts here: "Дизайнер интерфейсов" in the header, the paragraph indent on the lead text, project visuals, concept/3D grids. This is a proportional value — it shifts left as the viewport narrows, and all content follows it.

**Scaling rules (desktop, 768px–1440px+):**
- The layout stays two-column at all desktop widths. Right column content scales proportionally.
- Left column font sizes scale DOWN as the viewport narrows (see `--text-left` variable). This is mandatory to prevent left column text from overflowing into the right column — long Russian words will break the layout otherwise.
- The lead text (лид, hero h1) should always occupy exactly 4 lines. Font size must scale proportionally with the available text-area width so line count stays constant.
- Right-column large headings (`--text-42`, `--text-59`) scale via `clamp()`.
- The sidebar percentage stays constant at all desktop widths. No fixed-pixel sidebar at any desktop breakpoint.
- There must always be visual air between left column text and the right column. `padding-right: 20px` on `.project-sidebar` and `.side-work__text` is the minimum gap.

**Breakpoints:**
- ≤960px → single-column mobile layout (the main breakpoint, moved from 768 to 960 on 2026-05-14 because the 2-column sidebar layout doesn't work below ~960 — sidebar gets too narrow for readable text).
- ≤1000px → concepts grid: right column hidden, replaced by `.concepts-mobile-row` (independent of main breakpoint, related to bento composition).
- ≤1100px → `--pad` and `--gap` shrink to 16px (horizontal breathing).
- ≤585px → `.welcome-work__text` collapses from 2-column to 1-column with restored `margin-top: 20px` between paragraphs.
- >960px → two-column desktop layout with proportional scaling.
- All typography and spacing tokens scale fluidly between 960 and 1440, freeze at mobile minimums below 960. No jumps at any breakpoint.

**Reference site**: https://www.erno.works/ — same editorial grid logic. Font sizes and layout scale proportionally as viewport narrows. No abrupt jumps.

**Quality standard**: This is Roman's professional portfolio. It must display perfectly at all widths, all devices, and all browsers. Visual quality is non-negotiable.

## Design Rules

- **Никаких обрезов картинок на кейс-страницах.** На всех страницах кейсов (`/projects/burosfera/`, `/quiz/`, `/mary-trufel/`, `/peptidy/`) и на всех ширинах viewport картинки **сохраняют натуральные пропорции от Figma**. Запрещено:
  - `object-fit: cover` на `<img>` внутри case-классов — обрезает картинку чтобы заполнить контейнер фиксированной пропорции.
  - Жёсткие `aspect-ratio` на контейнере, если они не совпадают с натуральной пропорцией картинки из Figma — приведёт к letterbox-полям или обрезу.
  - Фиксированные `height` или `max-height` на `<img>` (например `max-height: 620px`) — может растянуть/сжать вертикально.
  - `overflow: hidden` на контейнере, который меньше картинки.
  - Что разрешено: `width: 100%; height: auto` на `<img>` (natural ratio), контейнер подстраивается под высоту картинки. Если контейнеру нужен фон/радиус — он применяется к самому контейнеру, не к обрезу.
  - **Правило для будущих контейнеров:** если поставил `aspect-ratio` — он **должен совпадать** с natural ratio картинки (т.е. ratio=width/height из Figma). Иначе картинка не влезет.
- **Закон близости и em-отступы (типографика).** На страницах кейсов (и в любых аналогичных «микро-блоках» heading + body + image) расстояния **внутри группы** должны быть в 2–3 раза меньше расстояний **между группами**. Иначе глаз не считывает заголовок, текст и картинку как одну смысловую единицу. Конкретно:
  - Отступ heading → body задавать в `em` от кегля заголовка (например `margin-bottom: 0.3em` на h2). Так отступ автоматически масштабируется с шрифтом — это профессиональный editorial-подход (Tailwind Typography, Medium, Substack, книжная типографика).
  - Не использовать `gap: 20px` или другой фиксированный px для расстояния между смысловыми частями группы — он не масштабируется с кеглем и ломается на брейкпойнтах.
  - На главной странице h2 — это **section heading** (стоит особняком как метка раздела), там фиксированные отступы оправданы. В кейсах h2 — это **caption** для группы, поведение другое.
- **Неразрывный дефис в составных словах.** Если слово с дефисом не должно разрываться на конце строки (например «AI-инструменты», «3D-моделирование», «UX/UI-дизайнер»), использовать в исходнике **символ U+2011** (`‑`), а не обычный дефис `-`. Применять для коротких сложных слов где разрыв читается как ошибка вёрстки. Для брендов и устойчивых сочетаний — обязательно. Скрипт типографа `scripts/typograf.mjs` это не делает автоматически — править вручную при добавлении/правке текста.
- The site is an editorial UX/UI portfolio, not a marketing landing page.
- Preserve the strict grid, large visuals, restrained typography, and sparse black/white/gray palette.
- Current home-page text at 20px uses `line-height: 1.2` after Roman asked to restore Inter Display and adjust line height. Do not silently change it back.
- Do not scale font size with viewport width.
- Letter spacing should stay `0`; avoid negative tracking in CSS even if Figma export included it.
- On the home page, preserve the agreed custom sidebar treatment rather than blindly reverting to the original Figma factoids:
  - large two-digit number (`01`, `02`, etc.), currently 80px on desktop;
  - project title;
  - short description.
- Project title and description should read like one text block: title is 20px bold, description is 20px regular, with only a small line-gap-like distance between them.
- Descriptions in project preview sidebars should align visually to the lower area of the image/sidebar.
- Keep underlines only for project titles and navigation/contact elements. Do not underline descriptions or entire cards.
- Do not use the old Figma factoid treatment with logo beside a huge number unless Roman explicitly asks to restore it.
- Do not place descriptive beige text labels over project preview images on the home page.
- Browser-window chrome above screenshots is decorative and should be CSS, not a downloaded Figma asset.
- On case pages, the current approved direction removes browser-window chrome from desktop screenshots. Desktop screenshots use 12px rounded corners and a subtle shadow instead of a visible browser bar or border. Phone-background tiles and mobile screenshot tiles also use 12px corners. Do not change the rounded shape of standalone phone mockups unless Roman asks. The shared tile/screenshot CSS value is `--case-radius: 12px`.
- Some home-page choices intentionally differ from Figma:
  - no beige/gray label overlays over project preview images;
  - custom left project sidebar remains;
  - project visuals may use Figma-composition crops, but text labels inside the images should be removed/cropped rather than covered with obvious patches.
- Welcome delivery should show phone mockups, not just flat screen images.
- The 3D section should not have one big external background plate around the whole block. Use individual tiles/images so the page background remains white around the section.
- For visual assets, do not over-compress. Portfolio visuals, especially 3D, must stay vivid and sharp. Prefer high-quality PNG while polishing; optimize to high-quality WebP/AVIF later only after visual approval.

## Assets

- Figma assets are saved locally under `public/images`.
- Runtime pages must not depend on Figma API asset URLs.
- Active Figma-derived assets are under `public/images/figma/high/`:
  - `previews/` — project preview images for home page
  - `welcome/` — 5 phone mockup PNGs (single flat export per phone, transparent bg)
  - `concepts/` — concepts collage
  - `three-d-tiles/` — 3D work tiles
- `public/images/home/` contains only `quiz-1.png`, `quiz-2.png`, `quiz-3.png` (used in ProjectPreview for the quiz tile).
- Figma-derived assets for the polished Quiz case are under:
  - `public/images/projects/quiz/figma-sections`
- Quiz is approved for now. Its first and third visual rows are intentionally rendered as separate `imagePair` tiles, not single flattened wide images, so each gray tile receives the shared 12px radius from CSS.
- Figma-derived assets for the polished Mary Trufel case are under:
  - `public/images/projects/mary-trufel/figma-sections`
- Mary Trufel is approved for now. Its final two-phone row should stay a standard `imagePair` using two ready-made 533×714 Figma tile exports, not a hand-built phone mockup from separate screen/frame layers.
- Figma-derived assets for the Peptid.ru case are under:
  - `public/images/projects/peptidy/figma-sections`
- Peptid.ru desktop at 1440 is structurally approved for now. Its image quality still needs a later source/optimization pass, and responsive issues should be handled with the other pages in a shared responsive pass.
- `public/images/figma/optimized/` and `public/images/figma/exact/` have been deleted — do not reference them.

## Pipeline для оптимизации картинок (установлен 2026-05-14)

Стандартный поток для любых новых картинок на сайте:

1. **Экспорт из Figma** — формат **JPG**, scale **×2** от слотового размера (не ×3).
   - Слот в макете 1086px → экспорт 2172px (для wide-тайлов)
   - Слот в макете 533px → экспорт 1066px (для regular-тайлов)
   - **×3 избыточен** — только iPhone Pro имеет @3x, большинство экранов @2x. ×3 даёт +50% веса при невидимой разнице.
2. **Конвертация в WebP** — Pillow, `quality=85, method=6`. Удалить .jpg исходник.
   - Пример скрипта: см. `scripts/jpg_to_webp.py` (если будет создан) или inline python.
3. **Имена файлов и пути не меняются** — WebP кладётся поверх существующего .webp с тем же именем.

**Цифры:** на 7 3D-тайлах ×2 WebP q=85 = ~810 KB суммарно. Lossless WebP давал >10 MB (12× больше). Визуально неотличимо.

**Что НЕ работает:**
- **Photoshop Save for Web (Legacy) НЕ умеет WebP** — только JPEG/PNG/GIF.
- **Photoshop Export As умеет WebP с версии 23.2 (Feb 2022)** — но не всегда виден (зависит от билда).
- **Pillow lossless WebP** на фотореалистичных текстурах (3D-сцены, шум, градиенты) даёт файлы 5+ MB — не использовать. Lossless подходит только для UI/icons/flat illustrations.

**Зачем JPG-промежуток, а не PNG?** PNG не теряет качества, но и не сжимает фотореалистичный контент. JPG q=85 из Figma уже достаточно сжат (~1-3 MB), и Pillow → WebP q=85 даёт ещё −90%. Двойная компрессия теряет ≤5%, визуально неразличимо.

## Code Organization

- `src/pages` contains routes.
- `src/components` contains reusable layout and portfolio components.
- `src/data` contains project copy, links, image references, and placeholder contacts.
- `src/styles/global.css` contains global CSS, grid, type, components, and responsive behavior.
- `src/data/site.ts` contains name, role, and placeholder contact links.
- `src/data/projects.ts` contains all project metadata, preview copy, page copy, routes, and image references.
- Home page layout is in `src/pages/index.astro`.
- Project preview markup is in `src/components/ProjectPreview.astro`.
- Case pages currently share data from `src/data/projects.ts`; when polishing project pages, first check whether the needed content/assets already exist there.

## Session Start Rule

When Roman brings tasks at the start of a session, **ask which task to start with** before doing anything. Do not auto-execute all tasks in sequence. Some tasks (like image replacement) have a prerequisite step on Roman's side (exporting from Figma, dropping files). Starting without confirmation means processing the wrong assets or making changes without a visual basis.

Specific mistake to never repeat: Roman described a workflow "Roman exports PNG → drops files → agent processes". There were already old PNG files in the target folder from a previous session. Instead of waiting for confirmation that fresh files had been dropped, the agent silently processed the old files. Always ask "have you dropped the new files?" before processing assets.

## Working Rules (established 2026-05-14)

Roman is a designer learning the tooling. He cannot easily read code or recover from broken state. Follow these rules strictly:

1. **One change at a time.** Don't batch multiple unrelated changes. Wait for visual approval before the next step.
2. **Explain the plan in plain language before touching code.** Say what files you'll change and what the result will look like. Wait for "ok" / "делай" before editing.
3. **Commit immediately after each approved change.** Roman judging "good" = `git add && git commit` right away. This keeps the rollback point exactly one step back.
4. **When reverting, revert ALL related files together.** Reverting only CSS while HTML still references new classes leaves broken intermediate state.
5. **Worktrees:** check `git worktree list` at session start. If there are old branches with commits not in main, surface this to Roman before working. Never assume the current worktree has the latest work.
6. **Server check:** if Roman says "nothing changed", verify which port/directory the running dev server points to (`lsof -p <pid> | grep cwd`) before assuming the change is broken. A stale server from another worktree shows stale code.
7. **Aspect ratios:** when placing tiles side by side that must align in height but preserve natural proportions, use CSS Grid with `grid-template-columns: <a>fr <b>fr` where the fr ratio matches the inverse height ratio. Don't use `flex: 1` with different `aspect-ratio` — heights will differ.
8. **Model:** for this project Roman uses **opus-4-7 high** by default — design work involves many spatial/proportional calculations where opus is noticeably more reliable. Sonnet may be appropriate for plain text edits or asset shuffles but should not be the default for layout work.
9. **Cap-height alignment:** to align a large number's caps with a smaller heading's caps in a flex row, use `align-items: flex-start` on the flex container and `margin-top: -0.08em` (approximately) on the number with `line-height: 1`. The negative margin compensates for the natural ascender-to-cap-top offset of Inter Display at the larger size. Value can be fine-tuned ±0.02em visually.
10. **Duplicate media-query rules:** when working inside a long media-query block, grep for the property/selector you're adding before adding it — there may already be a rule lower in the block overriding yours. This caused at least two visible bugs in one session.

## Editing Guidance

- Prefer changing project names, descriptions, order, and image refs in `src/data/projects.ts`.
- Prefer changing Telegram/email/CV in `src/data/site.ts`.
- Keep `.astro` components readable for a designer who knows HTML/CSS.
- Do not blindly paste Figma-generated React/Tailwind code. Adapt it to Astro + CSS.
- Do not add Tailwind unless Roman explicitly asks.
- Do not delete existing GitHub Pages files or remote content without inspecting them first.
- Do not overwrite Roman-approved custom changes just because Figma differs. Ask or preserve the latest agreed direction.
- For page-polish tasks, compare, while minimizing context use:
  - Figma screenshot/metadata;
  - local browser screenshot at 1440px;
  - actual asset quality in `public/images`.
- Prefer asking Roman to provide screenshots for visual comparison. Do not generate your own browser/Figma screenshots unless explicitly needed or requested.
- If an image looks bad, inspect whether it is a low-resolution export, over-compressed WebP, or a broken transparent/black Figma asset before changing layout.
- Before claiming completion, run:

```bash
env ASTRO_TELEMETRY_DISABLED=1 /Users/Roman/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node .tools/pnpm/bin/pnpm.cjs run build
env ASTRO_TELEMETRY_DISABLED=1 /Users/Roman/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node .tools/pnpm/bin/pnpm.cjs exec astro check
```

## Next Session Plan (составлен 2026-05-14, Opus 4.7 high)

Roman сформулировал 8 задач. План для следующего сеанса (предполагается Sonnet). **Выполнять строго по одному пункту: план шага → подтверждение визуально → коммит → следующий пункт.** Не объединять пункты в один коммит. При сомнениях спрашивать Романа.

### 1. Замена картинок концептов и 3D-тайлов
- Roman пере-экспортирует 14 PNG 2x в существующие папки: `public/images/figma/high/concepts/` (7 файлов) и `public/images/figma/high/three-d-tiles/` (7 файлов).
- Имена файлов в `src/pages/index.astro`: concept-widgets, concept-ar, concept-bereal, concept-outdoor, concept-finance, concept-tripadvisor, concept-city; santa, heart, paper, bereal, f1-car, sber, icecream.
- **ВАЖНО:** спросить Романа «все 14 PNG выгружены?» перед обработкой — нельзя обрабатывать старые файлы.
- Pillow: alpha-trim + lossless WebP конверсия. Заменить старые .webp. Удалить PNG только после approval.

### 2. ~~Серые плашки в 3D вынести из картинок в HTML~~ ✅ ЗАКРЫТО (2026-05-14, решение: вообще без подписей)
- **Что было:** в Figma `santa` и `bereal` имели запечённые серые плашки-стикеры с текстом («Иллюстрация для концепции…», «Шот для концепции редизайна…»). На сайте они смотрелись как часть картинки и были небезопасны для адаптива (на мобильных бэкграунд плашки обрезался).
- **Что попробовали в сессии 2026-05-14 (Sonnet 4.6):**
  1. `<figcaption>` под картинкой с `--type-body` (20px). Вердикт Романа: «выглядит как текст, не как кэпшон».
  2. `<figcaption>` под картинкой с `font-size: 14px; line-height: 1.35; color: #555`. Вердикт: «фигня, и цвет не трогать».
  3. Overlay-плашка строго по Figma: `position: absolute; bottom:0; left:0; background:#eaeaea; padding:5px 8px 8px; white-space: nowrap`. Вердикт: «на маленьких размерах херня» — текст вылезает за края картинки.
- **Финальное решение Романа:** убрать плашки полностью, ни на картинках, ни в HTML. **«Пусть будет чистый этаж из классных картинок».** 3D-секция — иллюстративная, не кейс; описание секции в `.side-work__text` («Эксперименты с 3D…») уже даёт контекст; подписи к отдельным тайлам = избыточная вложенность. Editorial-стандарт: «let the work speak».
- **Новые `santa.webp` и `bereal.webp` (commit 4909dc8) уже без плашек** в исходниках — Роман пере-экспортировал чистые версии. Запечённых артефактов больше нет.
- **Урок:** прежде чем переносить элемент макета в HTML, проверять что он работает на всех брейкпойнтах. `white-space: nowrap` плашки несовместим с узкими viewport — это не баг реализации, это ограничение макета. Когда макет ломается на адаптиве, варианты: (а) переделать макет, (б) убрать элемент. Здесь выбрали (б).

### 3. ~~Тексты описания в кейсах: ширина + отступ заголовок-текст~~ ✅ ВЫПОЛНЕНО (2026-05-14, commit ac3cd55)
- `.text-section p` на мобильном: `max-width: 90%` (компромисс между 70 и 100, выбран Романом визуально).
- `.text-section h2` на мобильном: `margin-bottom: 0.3em` — em-based, масштабируется с кеглем заголовка. На 28px кегле даёт ≈8px.
- `.text-section` на мобильном: `row-gap: 0; padding-bottom: 16px` — убран grid-gap (заменён на em-margin у h2), укорочено расстояние до картинки ниже.
- **Принцип, заложенный в это решение:** см. Design Rules → «Закон близости и em-отступы».

### 4. Замена картинок в кейсах + починить обрезку — В РАБОТЕ
- **Бюросфера ✅ DONE** (2026-05-14, commits `6d8a45e`, `ae75932`, `6d78583`): 9 PNG ×2 → lossless WebP, paths updated, all crops removed in CSS, pairs fluid, desktop-mobile-screens fluid (844fr 222fr), sidebar fixed via 3-col grid. Old `main-screen.png` in project root removed — main-screen now lives in `figma-sections/`.
- **Quiz ✅ DONE** (2026-05-20, commit `6be6fbf`): 6 PNG ×2 → lossless WebP via Pillow, paths updated in `projects.ts`, orphan `solution-choices.png` (old склейка двух экранов одной картинкой, ныне разбита на `solution-character.webp` + `solution-game.webp`) удалён. Никаких CSS-правок не потребовалось — общие паттерны отработали из коробки, что подтверждает Pattern-based architecture.
- **Mary Trufel ✅ DONE** (2026-05-20): 8 PNG ×2 → lossless WebP, paths updated. Существующие `desktopHeight`/`mobileHeight` (964/954/481) уже совпали с реальными размерами экспортов — менять не пришлось.
- **Peptid.ru** — pending image re-export. Same pipeline:
  1. Roman exports PNG ×2 (no border/effects baked into Figma frame!) into `public/images/projects/<slug>/figma-sections/`. Important: Figma «Effects» (drop shadow) and «Stroke» must be **off** — radius+shadow are applied by CSS (`--case-radius: 12px`, `box-shadow`). Past mistake: Roman exported one batch with baked borders, had to redo.
  2. Pillow: `quality=100, method=6, lossless=True`. Save with same names as `.webp`. Remove source `.png` after conversion.
  3. Update `src/data/projects.ts` extensions `.png` → `.webp`.
  4. Optional: collect real `width × height` from Pillow per image, populate into `projects.ts` data so HTML width/height attrs on `<img>` match real ratios (removes layout shift). Worth doing while images are being processed.
- **CSS уже починен глобально** — re-export других кейсов не требует CSS-правок. Все 6 паттернов работают через общие классы (см. секцию «Pattern-based architecture»).
- **Не делать**: pre-emptive CSS changes per project. Если конкретный кейс выглядит странно — диагностировать сначала (DevTools, реальные размеры картинок), потом править общий класс если проблема в нём, или данные если в кейсе.

### 5. Хедер и футер на мобильном (требует обсуждения с Романом)
- Сейчас на ≤960: 1fr auto grid, контакты в столбик справа. Выглядит слабо.
- **Опус рекомендует вариант A (Editorial):** имя сверху на всю ширину, роль ниже, контакты горизонтально в одну строку с разделителями.
  ```css
  @media (max-width: 960px) {
    .site-header,
    .site-footer {
      grid-template-columns: 1fr;
      row-gap: 8px;
    }
    .contact-links {
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 20px;
    }
  }
  ```
- Альтернативы: B (всё в столбик по правому краю), C (бургер-меню — требует JS, не рекомендую для editorial).
- Показать Роману вариант A в браузере. Не нравится — спросить какой делать.

### 6. ~~Лиды на узких ширинах~~ ✅ ПЕРЕСМОТРЕНО (2026-05-14, commits 49fa461 + 3219ead)
- Прошлая итерация (commit 4e785db) опустила min до 24px — ломала иерархию (lead < section на ≤800px). **Отменено.**
- Текущее состояние:
  - `--type-lead: clamp(36px, calc(5.625vw - 22px), 59px)` — min поднят до 36px
  - На ≤480px вторая ступень: `.hero-text h1 { font-size: clamp(28px, calc(5vw + 12px), 36px) }` — плавный спуск 36→28 в диапазоне 480→320, чтобы лид не превращался в «список слов» на смартфонах
  - На ≤500px остаётся `line-height: 1.1` (плотность, не кегль)
  - В тексте лида использован неразрывный дефис U+2011 в «AI‑инструменты», чтобы слово не разрывалось
- **Ограничение, которое нельзя починить настройками clamp:** текст лида 165 символов длинный для смартфонов 320–480 — даёт 7–9 строк. Реальные опции улучшить: (B) сократить текст, (D) гибрид «короткий лид + body-параграф». Не сделано — Роман пока оставил длинный текст.

### 7. ~~Тексты в кейсах далеко от своих картинок~~ ✅ ВЫПОЛНЕНО (2026-05-14, commit 30676ce)
Ввели **два токена** для case-spacing (см. раздел «Case-spacing» ниже):
- `--space-case-text-bottom: clamp(24px, calc(0.83vw + 20px), 32px)` — gap text → image (внутри пары)
- `--space-case-block: clamp(50px, calc(3.125vw + 35px), 80px)` — gap image → next-text (между темами)

Заменили хардкод 80px в: `.browser-frame`, `.mobile-screens`, `.case-image-pair`, `.desktop-mobile-screens`, `.case-wide-image`.
Заменили `var(--space-block)` на `var(--space-case-text-bottom)` в `.text-section padding`.
Удалили мобильный override `padding-bottom: 16px` (теперь токен сам справляется).

### 8. ~~Skill для типографа~~ ✅ ВЫПОЛНЕНО (2026-05-14, commit 0c5f529)
- `pnpm typograf` и `pnpm build` (через prebuild хук) запускают скрипт
- `.claude/skills/typograf/SKILL.md` создан, теперь .claude/skills/ трекается git'ом

### 9. Meta-теги (favicon, OG image, title, description)
Нужно для нормального шеринга в Telegram/WhatsApp/Twitter/LinkedIn и для иконки в табе браузера.

**Что добавить в `src/layouts/BaseLayout.astro`:**
- `<link rel="icon" href="/favicon.ico">` — иконка таба (.ico или .png)
- `<link rel="apple-touch-icon" href="/apple-touch-icon.png">` — 180×180 для iOS home screen
- `<meta property="og:title" content="...">` — заголовок при шеринге
- `<meta property="og:description" content="...">` — описание при шеринге
- `<meta property="og:image" content="https://.../og-image.png">` — превью 1200×630 (абсолютный URL!)
- `<meta property="og:url" content="https://...">` — каноничный URL
- `<meta property="og:type" content="website">`
- `<meta name="twitter:card" content="summary_large_image">`
- `<meta name="twitter:title" content="...">`, `twitter:description`, `twitter:image`

**Что нужно от Романа:**
- **Favicon** — PNG 512×512 (символ/инициал/логотип). Без идеи — сделать простой «РЖ» в Inter Display Bold на чёрном/белом.
- **OG image** — 1200×630, превью-карточка. Обычно: имя, профессия, на тёмном/светлом фоне. Можно сделать в Figma вручную, или сгенерировать CSS-картинку под задачу.
- **Финальные title и description** (сейчас в BaseLayout: «Роман Жалялов — Дизайнер интерфейсов» / «Портфолио UX/UI-дизайнера Романа Жалялова»). Можно переформулировать под SEO/звучнее.

**Файлы кладутся в `public/`** (для прямого доступа), на каноничный URL после deploy указывают через `og:image` (нужен абсолютный URL домена).

### 10. Адаптивы кейс-страниц
**Делать ПОСЛЕ замены картинок (пункт 4)** — потому что новая верстка должна тестироваться на финальных ассетах, не на текущих.

Что нужно:
- Прогон всех 4 кейсов (`/projects/burosfera/`, `/quiz/`, `/mary-trufel/`, `/peptidy/`) на ширинах 1440 / 1024 / 768 / 480 / 375.
- Проверить что блоки правильно ужимаются: `BrowserFrame`, `ImagePair`, `MobileScreens`, `DesktopMobileScreens`, `wideImage`.
- Проверить что текст кейсов не плывёт (после исправления `--space-case-text-bottom` отступы должны быть аккуратными).
- Возможные проблемы (известные на момент сессии 2026-05-14):
  - `peptid.ru` — структурно готова на 1440, но «responsive issues should be handled» (упоминалось ещё в Known Follow-Ups).
  - `.desktop-mobile-screens` использует фикс 222px для phone — может выглядеть непропорционально на узких ширинах.
  - Картинки могут обрезаться (`object-fit: cover`) — если так, поменять на `contain` (это тоже было в плане п.4).

### 11. Tech debt cleanup (по итогам аудита 2026-05-14)
**Делать ПОСЛЕ деплоя** — это технический долг для поддерживаемости, не баги. Пользователь не заметит, разработчику будет проще менять.

🟠 **Важное:**
- `.quiz-preview` и `.peptidy-preview` дублируют `height: 724px` ([global.css ~269, ~285](src/styles/global.css)). Ввести `--preview-height: 724px` в `:root`, переиспользовать.
- `.project-sidebar h2`, `.project-sidebar p`, `.text-section p` дублируют базовое `max-width: 294px`. Сейчас это в одном правиле, но через 3-tier градацию переопределяется в @media — можно ввести `--text-column-max: 294px`.
- **Бенто-грид концептов** использует `gap: 1.43vw`, `border-radius: 0.83vw` — несогласованно с остальной системой (которая на токенах). **Уточнить с Романом:** это сознательное решение «масштабируется как единый блок», или техдолг? Если техдолг — ввести `--bento-gap` и `--bento-radius` токены.
- `BrowserFrame.astro` и `DesktopMobileScreens.astro` используют `style={...--frame-height: ${height}px}` — inline-стиль. Перенести в `data-height` атрибут + CSS calc, или принять как сознательное решение для динамической высоты.
- `ProjectPreview.astro` для quiz-карусели имеет пустой `alt=""`. Добавить `role="presentation"` или осмысленные alt'ы.

🟡 **Опционально:**
- Размеры изображений (`width="844" height="568"` и пр.) хардкодятся в .astro компонентах. Вынести в `projects.ts` как часть данных секции.
- Нет `srcset` для крупных изображений — добавить @1x / @2x варианты для high-DPI экранов после деплоя если перформанс будет проседать.
- `BaseLayout.astro` preload-ит только `InterDisplay-Regular.woff2`, Bold лениво. Если на названиях проектов будет заметный FOUT на медленной сети — добавить preload Bold.
- `width: min(23%, 232px)` в `.quiz-preview img`, `width: min(724px, 82%)` в `.browser-shell--in-card` — рабочие, но жёсткие. Можно вынести в токены если эти числа будут менять.

### После всех пунктов
1. `pnpm build` и `pnpm exec astro check` — 0 ошибок
2. Approval Романа
3. `git push origin main`
4. Обновить AGENTS.md: новые токены, паттерны, правила

## Known Follow-Ups

- Continue visual review with Roman in the browser.
- Main page still needs final visual review, especially exact vertical rhythm and responsive behavior, but current custom direction should be preserved.
- Peptid.ru page polish is structurally complete for desktop at 1440. Do not reopen its structure unless Roman asks.
- Later, revisit image quality across the site. Roman may export higher-quality final images from Figma; prefer approved sharp source assets before final optimization.
- Before final publishing, do a typography pass for non-breaking spaces, hanging prepositions, punctuation, ruble signs, and responsive line breaks.
- Check responsive layouts at 1440, 1024, 768, and 390 px.
- Add real Telegram, email, and CV links later.
- Inspect Roman's existing `fantom9000.github.io` setup before publishing if the desired URL is `https://fantom9000.github.io/` without a repository subfolder.
