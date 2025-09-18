# Contributor Playbook

These instructions apply to the entire repository unless a nested `AGENTS.md` overrides them.

## Project overview
- The project is a Vite-powered React + TypeScript single-page application that lives under `frontend/`.
- Features are organised with a feature-based folder structure at `frontend/src/features/<feature-name>/`.
- Shared building blocks live in `frontend/src/components/` and design tokens in `frontend/src/theme/`.

## Documentation expectations
- Update `README.md` and `docs/Wiki.md` whenever you introduce, rename, or remove features, scripts, or conventions.
- When you add workflow explanations longer than a few paragraphs, place them under `docs/wiki/` and cross-link from the README.
- Keep `.env.example` files (frontend and backend) in sync with the variables consumed by the codebase and document the usage in the README when they change.

## Frontend workflow (`frontend/`)
- Prefer composing UI inside feature modules and keep `src/App.tsx` focused on orchestration/layout.
- Follow the atomic design utilities in `frontend/src/theme/` for colours, spacing, and typography. Extend design tokens instead of hard-coding colours.
- Keep components responsive-first; verify designs on small screens before enhancing desktop layouts.
- Use hooks under `frontend/src/hooks/` for reusable state or data utilities.
- Run `npm install` followed by `npm run build` from `frontend/` before opening a pull request to ensure the production build succeeds.

## Tooling
- Do not commit environment secrets or generated assets under `frontend/dist/`.
- Use meaningful logging and inline comments sparingly—favour self-documenting code.
