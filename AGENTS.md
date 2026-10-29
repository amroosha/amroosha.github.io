# Portfolio — Omar Ez-Eldin Abdullah

Personal portfolio site. Vite 7 + React 19 + TypeScript + Tailwind v3 + shadcn/ui.
Single static page, anchor navigation, no routing. Deployed to GitHub Pages from `amroosha.github.io`.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — `tsc -b && vite build` → emits `dist/`
- `npm run lint` — ESLint
- `npm run preview` — serve the production build locally (use this to check a deploy)

## Content and structure

- **All copy lives in `src/data/portfolio.ts`** as typed exports (`projects`, `skillGroups`).
  Never hardcode project titles, metrics, stack lists, or descriptions in JSX. Add to the data
  file and render from it. A section that needs new content usually needs a new field on an
  interface there, not a new literal.
- Sections are one component each in `src/components/`, composed in `src/App.tsx` in this order:
  `Hero` → `About` → `ProjectTree` → `Experience` → `Education`, with `Contact` outside `<main>`.
  `Header` is the nav; `Reveal` is the shared scroll-in animation wrapper; `ProjectDialog` is the
  project detail modal.
- shadcn/ui primitives live in `src/components/ui/`. They are CLI-generated — prefer regenerating
  or adding via the shadcn MCP over hand-editing, unless the change should apply app-wide.
- Import alias `@/` → `src/`. Use `@/components/ui/button`, `@/lib/utils`.

## Styling

- Theme palette is **OKLCH** custom properties in `src/index.css` (`--midnight`, `--violet`,
  `--indigo`, `--periwinkle`, `--lilac`), exposed as Tailwind colors of the same name. Use
  `bg-midnight`, `text-lilac`, `text-periwinkle`, `border-lilac/12`.
- The shadcn semantic tokens (`--background`, `--primary`, `--muted`, …) are **HSL**, so shadcn
  components keep working. Two color systems coexist on purpose — do not convert one to the other,
  and use the OKLCH palette for bespoke sections.
- Fonts: `font-sans` = Inter (body), `font-display` = Cormorant Garamond (headings),
  `font-mono` = IBM Plex Mono (labels, metrics, code). Weights are loaded via `@fontsource` in
  `src/main.tsx`; add a weight there rather than adding a `<link>`.
- `--radius: 0.25rem`. The design is deliberately sharp-cornered — don't introduce big rounded
  cards or pill buttons.
- Tailwind utilities plus the `@layer base` rules in `index.css`. No CSS modules, no
  styled-components, no new global CSS files.

## Motion

- Wrap section entrances in `Reveal`, not ad-hoc `motion.div`, so timing and easing stay
  consistent across the page. `Reveal` already respects `useReducedMotion`.
- Any new animation must degrade gracefully under `prefers-reduced-motion`.

## Accessibility — non-negotiable

- Keep the `skip-link` and its `#main-content` target in `App.tsx`.
- Icon-only controls need an `aria-label`. Decorative SVG needs `aria-hidden`.
- Preserve the global `:focus-visible` ring. Never `outline: none` without a visible replacement.
- Dialogs (`ProjectDialog`) must trap focus and close on `Escape` — Radix Dialog already does
  this; don't replace it with a hand-rolled overlay.

## Do not

- Don't add a router. `BrowserRouter` in `src/main.tsx` is leftover scaffold — remove it rather
  than build on it.
- `src/pages/Home.tsx` and `src/App.css` are unused Vite boilerplate. Delete them if you touch
  them; don't extend them.
- Don't commit `dist/`. It is *not* in `.gitignore` yet, so check `git status` before staging.
- Don't change `base` in `vite.config.ts` without checking the deploy skill — it drives whether
  asset URLs resolve on GitHub Pages.

## Before claiming a change is done

Run `npm run build` and `npm run lint`, then follow `.opencode/skills/design-review`.
