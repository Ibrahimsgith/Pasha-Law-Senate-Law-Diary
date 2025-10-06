# Project Setup Guide

This guide walks through installing dependencies, applying database migrations, and launching the full-stack Pasha Law Senate diary experience.

## Requirements

- Node.js 18+
- npm 9+

## 1. Clone & Install

```bash
npm install --prefix backend
npm install --prefix frontend
```

## 2. Configure Environment

```bash
cp backend/.env.example backend/.env
```

Adjust `DATABASE_URL`, `JWT_SECRET`, and `PORT` as needed.

## 3. Database Migration & Seed

```bash
cd backend
npm run migrate:dev
npm run seed
```

This creates the SQLite database at `backend/prisma/dev.db` and populates demo data:

- Admin user: `admin@senatelaw.test` / `password123`
- Advocate: `advocate@senatelaw.test` / `password123`
- Paralegal: `paralegal@senatelaw.test` / `password123`
- Sample client, case, schedules, diary entries

## 4. Run the Stack

In separate terminals:

```bash
npm run dev --prefix backend
npm run dev --prefix frontend
```

- Backend API listens on http://localhost:4000
- Frontend Vite dev server listens on http://localhost:5173 (proxying `/api` to the backend)

## 5. Explore Features

1. Login using the seeded admin credentials.
2. Inspect diary entries filtered by date.
3. Review case calendar items and reminders seeded for the week.
4. Use the "Refresh Data" action after adding content via API client.

## Run Scripts Summary

| Script | Description |
| --- | --- |
| `npm run dev --prefix backend` | Start Express API with Prisma connection |
| `npm run dev --prefix frontend` | Start React UI |
| `npm run migrate:dev --prefix backend` | Generate/apply Prisma migrations |
| `npm run seed --prefix backend` | Seed SQLite database |
| `npm run build --prefix frontend` | Build production assets |
| `npm run preview --prefix frontend` | Preview production frontend |

## Testing Notes

- API smoke tests can be performed with tools such as Postman using JWT auth.
- React Query caches results; use "Refresh Data" to trigger refetches after data changes.
- Additional automated tests can be layered using Jest/Vitest for unit coverage.
