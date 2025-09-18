# Frontend Contribution Guide

These instructions apply to all files within the `frontend/` directory.

## Coding standards
- Use React with TypeScript for all components, hooks, and utilities.
- Organise features under `src/features/<feature-name>/` and expose shared layout primitives from `src/components/`.
- Prefer functional components with hooks; avoid legacy class components.

## Styling
- Use CSS Modules (`*.module.css`) or the design tokens defined in `src/theme/tokens.css`.
- Keep the UI mobile-first. Verify new screens render properly at 360px width before iterating on larger breakpoints.

## Testing & validation
- Run `npm install` and `npm run build` before committing frontend changes.
- If testing is introduced, ensure `npm run test` passes before submission.

## Documentation
- Document new features in `docs/Wiki.md` and update `frontend/.env.example` whenever configuration changes.
