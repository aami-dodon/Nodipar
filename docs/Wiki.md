# Nodipar Change Log

## 2024-10-10 — Alumni Hub reboot
- Replaced the PERN starter with a front-end-only Vite + React + TypeScript experience.
- Introduced a feature-based folder structure under `frontend/src/features/` to mirror the fourteen product pillars (Adda Wall, Events Center, BondhoChat, etc.).
- Added reusable UI primitives in `frontend/src/components/` (cards, chips, avatars, stat highlights, progress badges).
- Centralised mock datasets in `frontend/src/data/mockData.ts` to drive the interactive showcase without a backend.
- Crafted a mobile-first application shell in `frontend/src/app/AppShell.tsx` with quick navigation chips and a hero overview.
- Established vibrant design tokens and typography in `frontend/src/styles/global.css` + `frontend/src/theme/`.
- Updated README files to explain the new architecture, scripts, and design language.

## 2024-10-11 — Backend API foundation
- Introduced a TypeScript + Express + Prisma backend under `backend/` with SQLite persistence and feature-scoped routers.
- Modelled alumni entities (users, posts, events, RSVPs, polls, chats, media, resources, notifications, moderation, and gamification) inside `prisma/schema.prisma`.
- Seeded rich sample data via `prisma/seed.ts` covering the Adda Wall, Monsoon Reunion event, chat threads, Fun Zone polls, and shared resources.
- Added domain routers for every product pillar (`/posts`, `/events`, `/chats`, `/gallery`, `/polls`, `/gamification`, `/notifications`, `/resources`, `/birthdays`, `/moderation`, `/engagement`, `/search`).
- Documented backend setup steps and endpoint mapping in the README along with `.env` defaults.

## Contributing forward
- Add new features by extending `frontend/src/features/<feature-name>/` and wiring them into `AppShell`.
- Update this wiki entry with each significant UI or architectural enhancement.

## 2024-10-12 — Environment & ops tooling
- Documented environment variable locations and SMTP expectations in the root README.
- Added `.env.example` templates for both the frontend (`VITE_API_BASE_URL`, `VITE_ENABLE_MOCK_DATA`) and backend (SMTP credentials).
- Extended the backend `env` helper to surface SMTP settings to the application layer.
- Refreshed `docker-compose.yml` to launch Node-based dev containers that generate the Prisma client and run migrations on boot.
