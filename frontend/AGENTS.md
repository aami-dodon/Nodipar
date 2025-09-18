# Frontend Contribution Guide

These instructions apply to all files within the `frontend/` directory.

## Coding standards
- Use TypeScript for all React components and utilities.
- Organise files using the pattern `src/features/<feature-name>/<component|hooks|types>.ts(x)`.
- Co-locate feature-specific styles using CSS Modules (`*.module.css`) or `styled` utilities inside the feature folder.
- Shared primitives and layouts belong in `src/components/`.

## Styling
- Global design tokens live in `src/theme/`. Prefer consuming CSS variables defined there instead of inline colour values.
- Use mobile-first responsive styles. Every section must be readable on a 360px wide viewport before adding desktop enhancements.

## Testing & validation
- Run `npm run lint` and `npm run build` before committing when lint scripts exist. At minimum, ensure `npm run build` passes.

## Documentation
- When introducing a new feature module, document it briefly in `docs/Wiki.md` and mention any data mocks you add under `src/data/`.
- Keep `frontend/.env.example` aligned with any configuration you reference via `import.meta.env`.
