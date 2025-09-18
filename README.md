# Nodipar PERN Starter

This repository provides a modern **PERN** scaffold combining a TypeScript Express API, a Vite-powered React front-end, and PostgreSQL. It is intended as a clean foundation for building alumni engagement experiences or other full-stack products.

## Getting started

### Prerequisites
- Node.js 18+
- npm 9+
- Docker (optional but recommended for running PostgreSQL via Compose)

### Installation
Clone the repository, then install dependencies for each workspace:

```bash
npm install --prefix backend
npm install --prefix frontend
```

### Environment variables
Copy the `.env.example` files to `.env` within each package and adjust as needed:

- `backend/.env.example` – contains `DATABASE_URL` for connecting to PostgreSQL and `PORT` for the API server.
- `frontend/.env.example` – exposes `VITE_API_BASE_URL` for the front-end to contact the API.

### Running locally
You can run services individually or through Docker Compose.

#### Using local Node processes
```bash
npm run dev --prefix backend
npm run dev --prefix frontend
```

The backend defaults to `http://localhost:4000` and the frontend to `http://localhost:5173`.

#### Using Docker Compose
```bash
docker compose up --build
```

This command launches PostgreSQL, the backend API (with hot reload via `ts-node-dev`), and the frontend (served by Vite).

## Project structure
```
backend/        # TypeScript Express API scaffold with Prisma
frontend/       # Vite + React + TypeScript SPA scaffold
docker-compose.yml
```

Refer to `docs/Wiki.md` for a running changelog and additional contributor guidance.
