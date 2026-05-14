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
- Latest commit: `Lead text: lower clamp min to 24px, looser line-height at <=500px`
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
  - `--type-ui`      → nav, header, footer (fixed 20px)
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
- `ImagePair` / `MobileScreens`: `flex: 0 0 calc((100% - var(--sidebar) - 20px) / 2)` — each tile = half of right column, proportional at all widths
- `DesktopMobileScreens`: `grid-template-columns: calc(100% - var(--sidebar) - 242px) 222px` — desktop fills right column minus phone (222px) and gap (20px)

Previously: `case-image-tile`, `mobile-screen`, and `desktop-mobile-screens` used fixed pixel widths (533px, 844px) — at viewports narrower than 1440px they drifted left past the силовая линия.

- `/projects/burosfera/` has been expanded against Figma and visually approved.
- `/projects/quiz/` uses correct Figma-derived SayGames blocks, visually approved.
- `/projects/mary-trufel/` uses correct Figma-derived blocks, visually approved.
- `/projects/peptidy/` structurally complete for desktop at 1440. Responsive and image quality deferred.

## Stack

- Astro + TypeScript + plain CSS.
- Static output for GitHub Pages.
- Do not assume Vercel as the primary hosting target.
- User is comfortable with HTML/CSS and wants the code to remain understandable.

## Fonts

- **Inter 4.0 Variable** — единственный шрифт сайта. Self-hosted: `public/fonts/InterVariable.woff2` (~344 КБ, скачан с rsms.me, лицензия SIL OFL). Содержит все веса 100–900 + ось `opsz` (optical sizing 14–32) — то есть и обычный Inter (для UI/body), и Inter Display (для крупных кеглей) в одном файле.
- Подключение в `src/styles/global.css` через `@font-face` с `format("woff2-variations")` и `font-display: swap`.
- Preload в `src/layouts/BaseLayout.astro`:
  ```html
  <link rel="preload" href="/fonts/InterVariable.woff2" as="font" type="font/woff2" crossorigin />
  ```
- В CSS используется `font-family: "Inter", Arial, sans-serif`. **НЕ писать `"Inter Display"`** — variable file сам выбирает оптику через `opsz` axis в зависимости от размера. Активируется глобально `font-optical-sizing: auto` в body.
- Font smoothing: `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;` — обязательно, иначе в Safari шрифты будут «мыльными» из-за subpixel anti-aliasing по умолчанию.
- **Историческая ошибка (исправлена 2026-05-14, commit 973e4a6):** до этого шрифт вообще не подгружался — был только `font-family: "Inter Display"` без `@font-face` и без `<link>`. Браузеры пользователей фолбэчили на Arial. На Mac Романа Inter Display подхватывался системно — поэтому проблема не была видна локально. Теперь self-hosted.

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
- Future improvement: generate high-quality WebP/AVIF variants from approved PNG/source assets when the dependency environment is stable.

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

### 2. Серые плашки в 3D вынести из картинок в HTML
- `santa.webp` и `bereal.webp` сейчас имеют запечённые серые плашки с текстом. Это неправильно — текст должен быть в HTML.
- Спросить Романа точные тексты на плашках + попросить экспортировать эти PNG **без плашек**.
- Изменить структуру в `src/pages/index.astro`:
  ```astro
  <figure class="three-d-tile three-d-tile--with-caption">
    <img src="..." alt="..." loading="lazy" />
    <figcaption>{текст плашки}</figcaption>
  </figure>
  ```
- CSS:
  ```css
  .three-d-tile--with-caption {
    display: flex;
    flex-direction: column;
  }
  .three-d-tile--with-caption img {
    border-radius: 12px 12px 0 0;
  }
  .three-d-tile figcaption {
    background: var(--color-surface);
    padding: var(--space-grid) var(--space-block);
    font-size: var(--type-body);
    line-height: 1.2;
    font-family: var(--font-text);
    border-radius: 0 0 12px 12px;
  }
  ```

### 3. ~~Тексты описания в кейсах: ширина + отступ заголовок-текст~~ ✅ ВЫПОЛНЕНО (2026-05-14, commit ac3cd55)
- `.text-section p` на мобильном: `max-width: 90%` (компромисс между 70 и 100, выбран Романом визуально).
- `.text-section h2` на мобильном: `margin-bottom: 0.3em` — em-based, масштабируется с кеглем заголовка. На 28px кегле даёт ≈8px.
- `.text-section` на мобильном: `row-gap: 0; padding-bottom: 16px` — убран grid-gap (заменён на em-margin у h2), укорочено расстояние до картинки ниже.
- **Принцип, заложенный в это решение:** см. Design Rules → «Закон близости и em-отступы».

### 4. Замена картинок в кейсах + починить обрезку
- Roman экспортирует все картинки кейсов в `public/images/projects/<slug>/figma-sections/` (4 папки).
- Список картинок в `src/data/projects.ts`.
- Спросить «выгружены?», затем PNG → lossless WebP. Обновить пути в projects.ts.
- **Параллельно:** найти и убрать обрезку. В global.css в классах `.mobile-screens img`, `.case-image-pair img`, `.desktop-mobile-image`, `.browser-image`, `.case-wide-image` — заменить `object-fit: cover` на `object-fit: contain` (или убрать). Убрать жёсткие `aspect-ratio` если они не совпадают с натуральными пропорциями картинок. Правило: **картинки скейлятся, не обрезаются**.

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

### 7. Тексты в кейсах далеко от своих картинок
- `.text-section` имеет padding-bottom `var(--space-block)` (30-40), а `.browser-frame` и др. — хардкод 80px. Неравномерно.
- Ввести новый токен:
  ```css
  --space-case-block: clamp(40px, calc(2.78vw + 20px), 80px);
  ```
- Заменить `80px` на `var(--space-case-block)` в: `.browser-frame`, `.mobile-screens`, `.case-image-pair`, `.desktop-mobile-screens`, `.case-wide-image`.
- Если визуальная связь всё ещё слабая — можно `.text-section { padding-bottom: 0 }` чтобы текст «прилип» к своей картинке.

### 8. ~~Skill для типографа~~ ✅ ВЫПОЛНЕНО (2026-05-14, commit 0c5f529)
- `pnpm typograf` и `pnpm build` (через prebuild хук) запускают скрипт
- `.claude/skills/typograf/SKILL.md` создан, теперь .claude/skills/ трекается git'ом

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
