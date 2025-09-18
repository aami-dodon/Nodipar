# Backend Contribution Guide

These instructions apply to all files within the `backend/` directory.

## Stack expectations
- Implement the backend with **TypeScript**, **Express**, and **Prisma** (SQLite) unless future migrations dictate otherwise.
- Keep the application modular by scoping domain logic under `src/modules/<domain>/` with routers, services, and validation schemas.
- Share cross-cutting utilities via `src/utils/` and avoid duplicating helpers inside modules.

## Coding standards
- Use Zod for runtime validation of all request payloads.
- Wrap async route handlers with the shared `asyncHandler` utility to centralise error bubbling.
- Always include `include` / `select` clauses in Prisma queries to avoid over-fetching sensitive columns.

## Testing & validation
- Run `npm install` (once) and `npm run build` from `backend/` before committing.
- If database schema changes, regenerate the Prisma client with `npx prisma generate` and update the SQLite migrations via `npx prisma migrate dev` when applicable.

## Documentation
- Document new endpoints and data contracts inside `docs/Wiki.md` under a new dated entry.
- Update `README.md` when backend commands, environment variables, or deployment notes change.
- Whenever you introduce infrastructure knobs (database URLs, SMTP providers, etc.), reflect them in `backend/.env.example` and the environment helper (`src/config/env.ts`).
