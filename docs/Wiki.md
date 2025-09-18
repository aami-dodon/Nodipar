# Nodipar Change Log

## 2024-10-13 — PERN scaffold reset
- Re-initialised the repository as a modern PERN starter with clean backend and frontend workspaces.
- Added a TypeScript Express API scaffold with Prisma/PostgreSQL wiring and health-check routing.
- Bootstrapped a Vite + React + TypeScript frontend with routing and shared UI primitives ready for expansion.
- Authored Docker Compose services for PostgreSQL, backend, and frontend containers with hot-reload development scripts.
- Refreshed contributor guidelines in `AGENTS.md` and documented environment variables via `.env.example` files.

## Contributing forward
- Extend backend modules inside `backend/src/modules/` and register them within `backend/src/routes/index.ts`.
- Add frontend features under `frontend/src/features/<feature-name>/` and wire them into the router found at `frontend/src/app/AppRoutes.tsx`.
- Keep this wiki updated for every notable architectural or feature addition.
