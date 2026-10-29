# Omar Ez-Eldin Abdullah — Portfolio

A responsive, single-page AI engineering portfolio built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`. The static output is generated in `dist/`.

## Structure

- `src/data/portfolio.ts` — project case studies, metrics, architecture notes, and skills
- `src/components/ProjectTree.tsx` — responsive SVG project tree and node interactions
- `src/components/ProjectDialog.tsx` — shared-layout, full-screen case studies with focus management
- `src/components/` — editorial page sections and reusable reveal animation
- `src/index.css` — Midnight Iris OKLCH tokens, typography, beams, and reduced-motion behavior
- `public/Omar-Ez-Eldin-Abdullah-CV.pdf` — downloadable résumé

The site is frontend-only and stores no visitor data. Fonts are bundled locally through Fontsource. Project content and metrics come from the supplied CV and linked public GitHub repositories.
