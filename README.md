# Nodipar Alumni Hub

A vibrant, mobile-first alumni experience tailored for reunions, picnics, and lifelong connections. The project now ships as a single-page React + TypeScript application (Vite) that organises every social feature into a dedicated module.

## ✨ Highlights
- **Feature-based architecture**: Each capability (Adda Wall, Events Center, BondhoChat, etc.) lives under `frontend/src/features/<feature-name>/`.
- **Modern, vibrant UI**: Gradient surfaces, neon accents, and typography sourced from Poppins + Inter ensure a festival-ready look.
- **Mobile-first layouts**: Every section is designed to stack gracefully on 360px screens before enhancing desktop views.
- **Mock data playground**: `frontend/src/data/mockData.ts` centralises demo content so you can prototype interactions rapidly.

## 📂 Project structure
```
Nodipar/
├── README.md
├── docs/
│   └── Wiki.md
├── backend/
│   ├── AGENTS.md
│   ├── package.json
│   ├── prisma/
│   │   ├── schema.prisma     # SQLite data model and Prisma enums
│   │   └── seed.ts           # Sample data to explore the API quickly
│   └── src/
│       ├── app.ts            # Express application wiring & middleware stack
│       ├── config/           # Environment parsing helpers
│       ├── db/               # Prisma client instance
│       ├── middleware/       # Error & 404 handlers
│       ├── modules/          # Feature-aligned routers (posts, events, chats, ...)
│       └── routes/           # Central router registration
└── frontend/
    ├── AGENTS.md
    ├── package.json
    └── src/
        ├── app/              # Application shell, navigation, layout orchestrator
        ├── components/       # Reusable UI primitives (cards, chips, avatars, etc.)
        ├── data/             # Mock datasets powering each feature panel
        ├── features/         # Feature modules (Adda Wall, Events Center, Gallery, ...)
        ├── styles/           # Global design tokens & base CSS
        └── theme/            # TypeScript access to design tokens
```

## 🚀 Getting started
1. **Install dependencies**
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```
2. **Copy the environment templates**
   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```
3. **Run the frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   The Vite dev server runs at `http://localhost:5173`.

## 🧩 Environment configuration
- **Where do `.env` files live?**
  - Frontend variables belong in `frontend/.env` (Vite exposes them with the `VITE_` prefix).
  - Backend variables belong in `backend/.env` and are read via `backend/src/config/env.ts`.
- **Frontend variables** (see `frontend/.env.example`)
  - `VITE_API_BASE_URL` — URL that the SPA uses for API calls (defaults to `http://localhost:4000`).
  - `VITE_ENABLE_MOCK_DATA` — toggle to keep mock overlays available while the API matures.
- **Backend variables** (see `backend/.env.example`)
  - `PORT` — HTTP port for the Express server.
  - `DATABASE_URL` — Prisma connection string (SQLite by default).
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM_EMAIL` — outbound mail credentials consumed by Nodipar's notification helpers.

## 🛠 Backend API & database
The backend lives in `backend/` and exposes feature-aligned REST endpoints that mirror the fourteen Nodipar pillars.

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

- The API boots on `http://localhost:4000` by default (configurable through `.env`).
- Nodipar uses a local SQLite database stored in `backend/prisma/dev.db`. Update `DATABASE_URL` if you prefer PostgreSQL or another provider.
- `prisma/schema.prisma` models posts, events, chats, media, polls, notifications, resources, gamification, and moderation queues.
- Run `npx prisma migrate dev` whenever you touch `prisma/schema.prisma` so the SQLite file stays in sync, and `npm run build` before deployment to type-check the project.
- Each route group resides under `src/modules/<feature>/`—for example:
  - `/posts` handles the Adda Wall (posts, comments, reactions, pinning).
  - `/events` powers the Events Center (RSVPs, discussion threads, polls).
  - `/chats` covers BondhoChat (direct messages, event auto-chats, reactions).
  - `/gallery` serves media albums, Memory of the Week, and tagging.
  - `/gamification`, `/notifications`, `/resources`, `/birthdays`, `/moderation`, and `/engagement` map directly to their feature pillars.

## ✉️ SMTP setup
1. Choose a provider (Mailtrap, Postmark, SES, Gmail App Password, etc.).
2. Populate the SMTP fields inside `backend/.env` using the provider's credentials.
3. If you are using Gmail, create an App Password and set `SMTP_PORT=587` with `SMTP_HOST=smtp.gmail.com`.
4. Restart the backend (or `docker compose up`) so `backend/src/config/env.ts` picks up the new credentials.

## 🐳 Running with Docker Compose
Docker Compose can spin up both workspaces once you have copied the `.env` files.

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
docker compose up --build
```

- The frontend is available at `http://localhost:5173` and will call the backend using `VITE_API_BASE_URL` when the data layer is wired up.
- The backend listens on `http://localhost:4000`; migrations and Prisma client generation run automatically at container start.
- Stop the stack with `docker compose down` and rebuild after schema changes so the generated Prisma client stays in sync.

## 🧭 Feature line-up
| Area | What it covers |
| --- | --- |
| Community Feed (Adda Wall) | Posts, polls, reactions, and admin pins |
| Announcements & News | Scheduled notices, newsboard, and alert channels |
| Events Center | Event RSVPs, reminders, polls, and gallery highlights |
| Photo & Media Gallery | Memory of the week, event albums, and tagging cues |
| Messaging (BondhoChat) | Direct messages, batch groups, and event auto-chats |
| Profiles (Amader Golpo) | Alumni bios, socials, and directory stats |
| Polls & Surveys | Quick decisions with anonymous or open voting |
| Gamification (Fun Zone) | Points, badges, and leaderboard snippets |
| Notifications | Bell/email preferences, DND window, and engagement stats |
| Search & Archive | Filters, trending tags, and archive throwbacks |
| Shared Resources | Docs, templates, and ownership details |
| Engagement Boosters | Throwbacks, trivia, and challenges |
| Birthdays | Daily wall and upcoming reminders |
| Moderation & Safety | Live reports and safety checklist |

## 📘 Further reading
- [docs/Wiki.md](docs/Wiki.md) records architectural decisions, feature notes, and change history.
- `frontend/AGENTS.md` captures coding conventions for the Vite React workspace.

Happy building & bonding! ✨
