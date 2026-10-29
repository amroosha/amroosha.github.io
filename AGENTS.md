# Portfolio — Omar Ez-Eldin Abdullah

Personal portfolio site. Vite 7 + React 19 + TypeScript + Tailwind v3 + shadcn/ui.
Single static page, anchor navigation, no routing. Deployed to GitHub Pages from `amroosha.github.io`.

The design is a digital tree: a tapered trunk and branches in SVG, five project "leaves" growing
from them, and a leaf that unfolds into a fullscreen case study. Light and dark themes, both
first-class.

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — `tsc -b && vite build` → emits `dist/`
- `npm run lint` — ESLint
- `npm run preview` — serve the production build locally (use this to check a deploy)
- `npm run icons:sync` — regenerate `src/lib/brand-icons.ts` from `simple-icons`

## Content and structure

- **All copy lives in `src/data/portfolio.ts`** as typed exports (`projects`, `skillGroups`,
  `roles`, `certificates`, `languages`, `cv`, `email`, `socials`). Never hardcode project titles,
  metrics, stack lists, or descriptions in JSX. Add to the data file and render from it. A section
  that needs new content usually needs a new field on an interface there, not a new literal.
- Project order is not array order: `displayOrder` maps ids to a fixed sequence (local research
  agent → voice gender classifier → Advanced RAG → Rock Loyalty → Seed Bank). Reorder there.
- Sections are one component each in `src/components/`, composed in `src/App.tsx` in this order:
  `Hero` → `About` → `ProjectTree` → `Experience` → `Education`, with `Contact` outside `<main>`.
  `Header` is the nav and holds `ThemeToggle`; `Reveal` is the shared scroll-in wrapper.
- `ProjectTree` draws the SVG and positions the leaf cards; `ProjectSheet` is the fullscreen case
  study that a leaf zooms into. They share geometry through the `slots` map in `ProjectTree.tsx`.
- `About` renders the narrative and then `<Skills />`, the capability wall. `skillGroups` holds
  `SkillName[]`, and `SkillName` is derived from the icon map, so a skill without a glyph is a
  compile error. Brand marks live in the generated `src/lib/brand-icons.ts`; skills with no
  upstream mark are hand-drawn in `SkillIcon.tsx`.
- `Hero` is a centred masthead: name, then `AI ENGINEER` between rules, then the tagline. The iris
  diagram is a translucent backdrop behind the type, not a second column — don't split it back out.
- shadcn/ui primitives live in `src/components/ui/`. They are CLI-generated — prefer regenerating
  or adding via the shadcn MCP over hand-editing, unless the change should apply app-wide.
- Import alias `@/` → `src/`. Use `@/components/ui/button`, `@/lib/utils`.

## Styling

- **One colour system: OKLCH custom properties** in `src/index.css`. `:root` is light, `.dark`
  overrides the same names. Every token is a bare channel triple (`--ink: 0.285 0.042 288`), so
  consumers must wrap it: `oklch(var(--ink))`, or in Tailwind `text-ink`.
- Semantic tokens, exposed as Tailwind colours: `page`, `surface`, `raised`, `ink` (with `muted` /
  `faint`), `line`, `brand`, `brand-deep`, plus the tree palette (`bark`, `leaf-surface`,
  `leaf-edge`) and the shadcn set (`background`, `primary`, `muted`, …). Use `bg-page`,
  `text-ink-muted`, `border-line/40`.
- **Never use alpha text for hierarchy.** `text-ink/40` passes in dark and fails in light. Use
  `text-ink-muted` for body/secondary and `text-ink-faint` for labels and metadata; both are tuned
  to clear 4.5:1 in each theme. Alpha is fine for borders, fills and decorative SVG.
- Inline SVG `style` values must be `oklch(var(--token))`. A raw `var(--token)` in a `stopColor`
  or `fill` resolves to an invalid colour and silently renders black.
- Fonts: `font-sans` = Inter (body), `font-display` = Cormorant Garamond (headings),
  `font-mono` = IBM Plex Mono (labels, metrics, code). Weights are loaded via `@fontsource` in
  `src/main.tsx`; add a weight there rather than adding a `<link>`.
- `--radius: 0.25rem`. The design is deliberately sharp-cornered — don't introduce big rounded
  cards or pill buttons.
- The capability wall is styled by the `.skill-tile*` rules in `index.css`. Its halo strength is
  the `--tile-glow` token (0.22 light / 0.5 dark) applied to a `brand` radial gradient, so tune
  the glow per theme there rather than at the call site.
- Tailwind utilities plus the `@layer base` rules in `index.css`. No CSS modules, no
  styled-components, no new global CSS files.

## Theming

- Theme lives on `<html class="dark">`. `src/lib/theme.ts` owns persistence (`localStorage`
  `oea-theme`), the `theme-color` meta update, and cross-tab sync via `useTheme`.
- The inline script in `index.html` applies the stored theme before first paint. Don't remove it or
  the page flashes light before switching to dark.
- Dark is the default (`<html class="dark">`). Any new colour must be defined in **both** blocks —
  a token only in `:root` will be missing in dark, and vice versa.

## The tree

- Geometry is generated, not hand-drawn paths. `cubic()` samples a bezier; `taper()` sweeps a
  width along it into a closed outline so branches narrow toward the tips; `vein()` offsets a
  hairline for growth rings.
- Everything is authored in a **1000 × 1200 viewBox**, and leaf cards are placed with the same
  numbers as percentages (`--x`, `--y`). Change a branch tip and the card follows.
- Absolute tree layout only applies at `xl` (≥1280px). Below that the leaves become a vertical
  "vine" list; the SVG is hidden. Keep both paths working when you touch the section.
- Wind sway is CSS keyframes (`wind-sway`) at different durations/delays per branch and leaf.
  It's decorative and must stay off under reduced motion.

## Motion

- Wrap section entrances in `Reveal`, not ad-hoc `motion.div`, so timing and easing stay
  consistent across the page. `Reveal` already respects `useReducedMotion`.
- The leaf → fullscreen morph is a Framer `layoutId` shared element (`leaf-${id}` on the plate and
  the sheet), rendered through `createPortal` to `<body>`. `ProjectSheet` keeps `opacity: 1`
  inline so Framer's automatic crossfade doesn't fade the sheet before the shrink reads.
- Any new animation must degrade gracefully under `prefers-reduced-motion`. Continuous ambience
  needs an explicit `animation: none` in the reduced-motion block — the universal
  `animation-duration: .01ms` override alone leaves `animationName` running.

## Accessibility — non-negotiable

- Keep the `skip-link` and its `#main-content` target in `App.tsx` (`main` has `tabIndex={-1}`).
- Icon-only controls need an `aria-label`. Decorative SVG needs `aria-hidden`.
- Preserve the global `:focus-visible` ring. Never `outline: none` without a visible replacement.
- `ProjectSheet` traps focus, closes on `Escape`, locks body scroll, and returns focus to the
  leaf that opened it. Don't replace it with a hand-rolled overlay, and don't drop the return
  focus — it uses a real `role="dialog"` with `aria-modal`.

## Do not

- Don't add a router. The page is anchors only.
- Don't commit `dist/`. It is in `.gitignore`; keep it there.
- Don't change `base` in `vite.config.ts` without checking the deploy skill — it drives whether
  asset URLs resolve on GitHub Pages.
- Don't add decorative leaves to the crown. The apex terminates in small nodes on purpose; leaf
  shapes there read as moth wings.

## Before claiming a change is done

Run `npm run build` and `npm run lint`, then follow `.opencode/skills/design-review`.
