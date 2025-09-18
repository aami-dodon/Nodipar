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
```bash
cd frontend
npm install
npm run dev
```
The development server runs at `http://localhost:5173`. For production validation, run `npm run build`.

## 🛠 Backend API
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
- `prisma/schema.prisma` models posts, events, chats, media, polls, notifications, resources, gamification, and moderation queues.
- Each route group resides under `src/modules/<feature>/`—for example:
  - `/posts` handles the Adda Wall (posts, comments, reactions, pinning).
  - `/events` powers the Events Center (RSVPs, discussion threads, polls).
  - `/chats` covers BondhoChat (direct messages, event auto-chats, reactions).
  - `/gallery` serves media albums, Memory of the Week, and tagging.
  - `/gamification`, `/notifications`, `/resources`, `/birthdays`, `/moderation`, and `/engagement` map directly to their feature pillars.
- Run `npm run build` to produce the production bundle and ensure TypeScript safety before deployment.

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
