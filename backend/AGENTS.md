# Backend Contribution Guide

These instructions apply to all files within the `backend/` directory.

## Stack expectations
- The backend uses **TypeScript**, **Express**, and **Prisma** targeting PostgreSQL.
- Organise domain logic under `src/modules/<domain>/` with routers, services, and schema validation.
- Share cross-cutting utilities through `src/config/`, `src/db/`, or `src/middleware/` instead of duplicating helpers.

## Coding standards
- Use Zod for runtime validation of environment variables and request payloads.
- Wrap async route handlers with the shared `asyncHandler` utility (create one under `src/middleware/` if needed).
- Include `select`/`include` clauses in Prisma queries to avoid leaking sensitive columns.

## Testing & validation
- Run `npm install` and `npm run build` before committing backend changes.
- Regenerate the Prisma client with `npx prisma generate` whenever the schema changes.
- Use `npm run lint` when a lint script is added to keep code quality consistent.

## Documentation
- Document new endpoints and data contracts in `docs/Wiki.md` under a dated entry.
- Update `backend/.env.example` and the README whenever environment variables change.
