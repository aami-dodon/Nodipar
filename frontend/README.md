# Nodipar Frontend

A Vite + React + TypeScript single-page application that delivers a vibrant alumni experience across fourteen feature pillars.

## Available scripts
```bash
npm run dev     # Start the Vite dev server
npm run build   # Type-check and produce a production build
npm run preview # Preview the production bundle locally
```

## Architecture
- `src/app/` — Application shell, hero, navigation, and section orchestrator.
- `src/components/` — Reusable UI primitives (cards, chips, avatars, progress badges).
- `src/features/` — Feature modules aligned to the Nodipar pillars (Adda Wall, BondhoChat, Fun Zone, etc.).
- `src/data/mockData.ts` — Mock datasets powering the UI showcase.
- `src/styles/global.css` — Global tokens, fonts, and resets.
- `src/theme/` — TypeScript accessors for design tokens.

## Design system
- Typography: Poppins (headings) + Inter (body).
- Palette: Midnight blue surfaces with vibrant orange, cyan, and violet highlights.
- Layout: Mobile-first, grid-based sections with fluid cards.

Extend features by adding components under the relevant `src/features/<feature-name>/` directory and wiring them into `src/app/AppShell.tsx`.
