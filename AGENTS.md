# Contributor Playbook

These instructions apply to the entire repository unless a nested `AGENTS.md` overrides them.

## Project overview
- The project is a modern **PERN** stack scaffold with a TypeScript Express API under `backend/` and a Vite + React + TypeScript SPA under `frontend/`.
- PostgreSQL is the target database. Local development can be orchestrated through `docker-compose.yml`.

## Documentation expectations
- Update `README.md` and `docs/Wiki.md` whenever you introduce, rename, or remove features, scripts, or conventions.
- Keep `.env.example` files (frontend and backend) in sync with the variables consumed by the codebase and document the usage in the README when they change.
- When you add workflow explanations longer than a few paragraphs, place them under `docs/wiki/` and cross-link from the README.

## Tooling
- Do not commit environment secrets, generated Prisma clients, or build artefacts (such as `frontend/dist/`).
- Ensure prettier/eslint configurations (if added) live at the repo root or inside the relevant package.

## Validation
- Run package-level install and build/test commands that apply to your changes before opening a pull request.
- When you modify docker orchestration, verify container services start with `docker compose up --build`.
