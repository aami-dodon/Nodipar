# Nodipar Change Log

## 2024-10-10 — Alumni Hub reboot
- Replaced the PERN starter with a front-end-only Vite + React + TypeScript experience.
- Introduced a feature-based folder structure under `frontend/src/features/` to mirror the fourteen product pillars (Adda Wall, Events Center, BondhoChat, etc.).
- Added reusable UI primitives in `frontend/src/components/` (cards, chips, avatars, stat highlights, progress badges).
- Centralised mock datasets in `frontend/src/data/mockData.ts` to drive the interactive showcase without a backend.
- Crafted a mobile-first application shell in `frontend/src/app/AppShell.tsx` with quick navigation chips and a hero overview.
- Established vibrant design tokens and typography in `frontend/src/styles/global.css` + `frontend/src/theme/`.
- Updated README files to explain the new architecture, scripts, and design language.

## Contributing forward
- Add new features by extending `frontend/src/features/<feature-name>/` and wiring them into `AppShell`.
- Update this wiki entry with each significant UI or architectural enhancement.
