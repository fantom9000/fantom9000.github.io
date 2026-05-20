# CV Handoff

Last updated: 2026-05-20.

This file documents the Figma CV/resume work for Roman Zhalyalov. Read this before touching the CV in future Codex or Claude sessions.

## Figma Target

- File: https://www.figma.com/design/SKQ1C6VplMtF9IJjDELfSr/Портфолио?node-id=484-1197
- File key: `SKQ1C6VplMtF9IJjDELfSr`
- Page: `Резюме`
- Page node id: `484:1197`
- Current A4 frames:
  - `CV / Roman Zhalyalov / 01` (`489:1196`)
  - `CV / Roman Zhalyalov / 02` (`489:1197`)

## Working Rules

- Work in small atomic steps: one visual/system change per turn.
- Do not rewrite CV text unless Roman explicitly asks.
- Before risky changes, duplicate both A4 frames as a backup on the same Figma page.
- After every visual change, inspect a screenshot. Do not continue by inference from API data only.
- Do not mix visual changes with cleanup/system changes in the same step.
- If Roman says the result is broken, revert only the last step, not the whole CV.
- Important lesson: avoid broad "make it more like the site" batches. They are hard to evaluate and hard to revert.

## Current Confirmed State

The last confirmed Figma change was limited to dividers:

- Divider rectangles on the CV use `cv/color/border`.
- `CV/color/border` is `rgba(0, 0, 0, 0.45)`, matching the website divider color.
- Divider visual height is `0.5px`, matching the website hairline behavior.
- No typography, grid, text, header, or sidebar change was intentionally made in that step.

The previous large experiment was reverted:

- Do not reapply `leadingTrim: CAP_HEIGHT` globally without a separate small test.
- Do not remove the mini header from page 2 without Roman confirming that exact step.
- Do not make side labels bold/larger in the same step as other changes.
- Do not change the main name heading weight together with divider/layout changes.

## Current CV System In Figma

Local styles are intentionally isolated under `cv/...`.

Text styles:

- `cv/type/01-name`
- `cv/type/02-role`
- `cv/type/03-heading`
- `cv/type/04-subheading`
- `cv/type/05-body`
- `cv/type/06-body-small`
- `cv/type/07-label`

Color styles:

- `cv/color/page`
- `cv/color/ink`
- `cv/color/ink-strong`
- `cv/color/secondary`
- `cv/color/muted`
- `cv/color/border`

Variable collection:

- Collection name: `CV`
- Includes `color/...`, `type/...`, `space/...`, and `size/...` variables.
- `type/font-family` currently uses `Inter`.
- Roman may manually change `type/font-family` to `Inter Display` in Figma. The API may not reliably load `Inter Display`, even when Roman sees it in the Figma UI.

## Typography And Visual Direction

The CV should be related to the portfolio website, but not a blind copy.

Website references:

- Site: https://fantom9000.github.io/
- Font on site: self-hosted `Inter Display`.
- Links on site are black and inherit text color.
- Website divider CSS:
  - `background: rgba(0, 0, 0, 0.45)`
  - `height: 1px`
  - `transform: scaleY(0.5)`
- The site uses mostly black-and-white editorial typography.
- Bold on the website is used selectively for project names / compact emphasis at body scale.
- Large section headings on the website are regular weight, tight line-height, and slight negative tracking.

Current CV design intent:

- Hiring-manager-friendly PDF resume.
- Clean editorial A4 layout, not a decorative poster.
- Use the site's black-and-white discipline and grid feeling.
- But keep CV conventions where they help scanability.

## CV Text And Links

Confirmed public links:

- Email: `roman@zhalyalov.ru`
- Telegram: `https://t.me/fantom9000`
- Portfolio: `https://fantom9000.github.io/`

Role wording:

- Use `Дизайнер интерфейсов`.

Language:

- Russian only.

Important content decision:

- Keep "UX/UI дизайнер с 2023 года" in the summary. Roman said this was suggested by his mentor.

## Known Tool Limitation

Figma API/MCP may list only `Inter`, even when Roman can see `Inter Display` in the Figma desktop UI. If the API fails with an unloaded `Inter Display` font:

1. Do not fight the API by broad style reassignment.
2. Keep `type/font-family` as `Inter` while making API edits.
3. Let Roman manually switch the variable to `Inter Display` after structural edits are finished.

## Next Suggested Steps

Proceed one step at a time. Good next candidates:

1. Decide whether the main name heading should be regular or bold.
2. Decide whether page 2 should keep or remove the mini header.
3. Tune sidebar labels, using Artem Milovanov's CV as reference only for side-label presence/weight, not as a full style copy.
4. Test `leadingTrim` on one duplicated frame only, not on the live CV.

## When PDF is ready: place on the portfolio site

When the CV is exported to PDF, host it directly on the portfolio:

1. Export final PDF from Figma. Reasonable filename: `cv.pdf`.
2. Place it at `public/cv.pdf` in this repo. After deploy it will be available at `https://fantom9000.github.io/cv.pdf`.
3. Update `src/data/site.ts`: replace `cv: "#cv-later"` with `cv: "/cv.pdf"`. The Header and Footer "CV" link will start working immediately.
4. Optional: open in a new tab with `target="_blank"` if Roman prefers that over inline navigation. Currently the Header/Footer use the default behavior.
5. Optional: add `<meta name="robots" content="noindex">` headers via `_headers` (Cloudflare) or `robots.txt` rule `Disallow: /cv.pdf` if Roman does not want the PDF indexed by Google.
6. Optional: keep older CV versions in `public/cv-archive/` if Roman wants to preserve revisions; not strictly needed.

Re-export workflow:
- Replace `public/cv.pdf` with the new file, commit, push. Live PDF updates within ~35 sec via GitHub Actions.

