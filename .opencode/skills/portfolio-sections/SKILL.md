---
name: Portfolio Sections
description: Add, restructure, or restyle a portfolio section in this repo - covers the data-file-first content model, section composition in App.tsx, the leaf/tree project model, and the Reveal/motion conventions.
---

# Adding or changing a portfolio section

This repo renders a single page from typed data. Follow the order below; skipping step 1 is the
most common cause of duplicated copy.

## 1. Content goes in the data file first

`src/data/portfolio.ts` is the single source of truth. Before writing JSX, decide the shape:

- New project content → extend the `Project` interface (see `metrics`, `architecture`, `stack`,
  `summary`, `shortTitle`) and add an entry to the raw project map.
- New role/experience content → extend `Role` and add to `roles`.
- Certificates, languages, CV link, email and socials are all exported consts already — extend
  those instead of hardcoding a second copy in a component.
- A genuinely new content type → add a new interface **and** a new exported const next to the
  existing ones. Keep the naming pattern: `export interface X` + `export const xs: X[]`.

Rules:

- Every user-visible string is either in the data file or is chrome (nav labels, button text).
- Keep fields optional (`?`) when a section should render without them, and guard in the
  component — never emit empty headings or stray separators for missing data.
- Don't put JSX, class names, or colors in the data file. Content only.

### Ordering projects

`projects` is derived from `displayOrder`, an explicit array of ids. Array order in the file is
not display order, and the tree reads both the order and the slot geometry. If you add a project
you must do three things:

1. Add the entry and put its id in `displayOrder` where it should appear.
2. Add a `TreeSlot` to the `slots` map in `src/components/ProjectTree.tsx` — `tip`, `attach`,
   `side`, and a `sway` duration/delay. The `tip` is both the branch end and the leaf card's
   percentage position, so pick coordinates that don't collide with the existing five.
3. Add a `leaf-node` accent if needed; nothing else is positional.

The tree is a 1000 × 1200 viewBox. Six leaves is already dense — a sixth project likely needs
the trunk rebalanced, not just another branch bolted on.

### The capability wall

`skillGroups` is `{ title, skills: SkillName[] }[]`, rendered by `Skills.tsx` at the end of
`About`. `SkillName` is a union derived from two maps, which is the point: a skill with no glyph
fails the type check instead of rendering a blank tile.

1. Add the name to a group in `skillGroups`.
2. Either add `SkillName: 'simple-icons-slug'` to `brands` in `scripts/sync-skill-icons.mjs` and
   run `npm run icons:sync`, or add a hand-drawn mark to `customGlyphs` in `SkillIcon.tsx`
   (a `ReactNode` of paths on a 24 × 24 grid, `currentColor`, sharing the module's `stroke` preset).

`src/lib/brand-icons.ts` is generated — never edit it by hand. Many recognisable tools have no
upstream mark (AWS, Matplotlib, Seaborn, Java, LangSmith, ChromaDB); those are drawn as concept
marks rather than borrowed logos. Keep the optical weight close to the solid brand glyphs, since
both kinds sit in the same wall.

The wall is a tile grid per group (`grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9`).
Tiles are decorative containers, not buttons — they aren't focusable and carry no `aria-label`.
The halo under each icon is `--tile-glow` in `index.css`, defined separately for light and dark.

## 2. Component shape

Section components in `src/components/` follow this skeleton:

```tsx
import { Reveal } from './Reveal'
import { roles } from '@/data/portfolio'

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="...">
      <Reveal>
        <h2 id="experience-heading" className="font-display ...">Experience</h2>
      </Reveal>
      {/* content */}
    </section>
  )
}
```

- Named export, not default (matches existing sections).
- The `<section>` carries the `id` used by `Header` anchor links; update the nav in `Header.tsx`
  in the same change if you add or rename one.
- `aria-labelledby` pointing at the section heading.
- One `Reveal` per content block, not one wrapping the entire section — per-block reveals are the
  existing pattern and keep long sections from popping in as a single slab.

## 3. Use the tokens, not alpha text

Bespoke sections use the OKLCH palette: `bg-page`, `bg-surface`, `text-ink`,
`text-ink-muted`, `text-ink-faint`, `border-line/40`, `text-brand`. Never `text-ink/50` — alpha
text fails WCAG in the light theme. Every new colour token needs a value in both `:root` and
`.dark` in `src/index.css`, plus a Tailwind mapping in `tailwind.config.js` if it's semantic.

## 4. Register it

Add the component to `src/App.tsx` in reading order, inside `<main id="main-content">`. Add the
matching nav entry in `src/components/Header.tsx`.

## 5. Verify

- `npm run build` (catches the type errors a new interface field will create elsewhere).
- `npm run lint`.
- Then run `design-review` at 375 / 768 / 1440, in **both themes**, and check the anchor lands
  correctly with `scroll-padding-top` (5rem in `index.css`).

## Extending an existing section instead

Prefer extending over adding a near-duplicate section. If two sections would render the same
shape from different data, generalize the component (prop for the data array + heading) rather
than copying the file. `Experience` and `Education` already share the `Role`-shaped timeline
rhythm — copy that pattern rather than inventing a second one.
