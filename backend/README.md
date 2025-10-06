# Backend Service

The backend service powers authentication, scheduling, case management, and diary workflows for the Pasha Law Senate legal diary.

## Tech Stack

- Node.js + Express API server
- Prisma ORM targeting SQLite (configurable via `DATABASE_URL`)
- JSON Web Tokens (JWT) for authentication & authorization
- Bcrypt password hashing

## Environment

Copy `.env.example` to `.env` and adjust values as needed.

```
DATABASE_URL="file:./dev.db"
JWT_SECRET="replace-me"
PORT=4000
```

## Available Scripts

- `npm install` – install dependencies
- `npm run dev` – start API with hot reload
- `npm start` – start API in production mode
- `npm run migrate:dev` – run development migration (creates `init` migration)
- `npm run migrate` – apply pending migrations
- `npm run seed` – seed local database with demo data

## Data Model Overview

- **User** – authenticated staff (roles: `ADMIN`, `ADVOCATE`, `PARALEGAL`)
- **Advocate** – law firm advocates mapped 1:1 with a `User`
- **Client** – clients engaged by the firm
- **CaseFile** – legal matters linking advocates & clients
- **Schedule** – calendar events per case
- **Reminder** – notification reminders per schedule
- **DiaryEntry** – daily notes and actions tied to cases & authors

Refer to `prisma/schema.prisma` for the full schema definition.

## Authentication Workflow

1. Register users via `POST /api/auth/register` (admin seeded user provided).
2. Log in with `POST /api/auth/login` to obtain a JWT.
3. Include `Authorization: Bearer <token>` header on protected endpoints.
4. Role-based access is enforced via middleware; privileged routes specify required roles.

## API Reference

All endpoints are prefixed with `/api`.

### Auth

- `POST /api/auth/register` – create a user (ADMIN only in production scenarios).
  - Body: `{ "email": string, "password": string, "role": Role, "fullName": string }`
- `POST /api/auth/login` – authenticate and receive `{ token, user }`.

### Advocates (auth required)

- `GET /api/advocates` – list advocates with assigned cases (any authenticated user).
- `POST /api/advocates` – create advocate profile (ADMIN).
- `PUT /api/advocates/:id` – update advocate profile (ADMIN).
- `DELETE /api/advocates/:id` – remove advocate (ADMIN).

### Clients (auth required)

- `GET /api/clients` – list clients with their cases.
- `POST /api/clients` – create client (ADMIN, ADVOCATE).
- `PUT /api/clients/:id` – update client (ADMIN, ADVOCATE).
- `DELETE /api/clients/:id` – delete client (ADMIN).

### Case Files (auth required)

- `GET /api/cases` – list cases with advocate, client, diary entries, and schedules.
- `POST /api/cases` – create a case (ADMIN, ADVOCATE).
- `PUT /api/cases/:id` – update a case (ADMIN, ADVOCATE).
- `DELETE /api/cases/:id` – delete case (ADMIN).

### Schedules (auth required)

- `GET /api/schedules` – list schedules with related case info.
- `POST /api/schedules` – create schedule (ADMIN, ADVOCATE).
- `PUT /api/schedules/:id` – update schedule (ADMIN, ADVOCATE).
- `DELETE /api/schedules/:id` – delete schedule (ADMIN).

### Diary Entries (auth required)

- `GET /api/diary-entries` – filter by `?date=YYYY-MM-DD` or fetch all upcoming notes.
- `POST /api/diary-entries` – create diary entry (ADMIN, ADVOCATE).
- `PUT /api/diary-entries/:id` – update diary entry (ADMIN, ADVOCATE).
- `DELETE /api/diary-entries/:id` – delete diary entry (ADMIN).

## Database Migrations

Prisma migrations are stored under `prisma/migrations`. During initial setup run:

```
npm install
npm run migrate:dev
npm run seed
```

This will create the SQLite database, generate the Prisma client, and populate demo data.

## Testing the API

1. Run the development server: `npm run dev`.
2. Use an API client (e.g., Insomnia/Postman) to authenticate with the seeded admin user:
   - Email: `admin@senatelaw.test`
   - Password: `password123`
   - Additional seed users: Advocate (`advocate@senatelaw.test`), Paralegal (`paralegal@senatelaw.test`)
3. Call additional endpoints with the returned JWT.
