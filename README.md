# Pasha Law Senate Diary

A full-stack legal diary platform designed for boutique law firms to coordinate advocates, clients, cases, and daily hearings.

## Project Structure

```
.
├── backend/         # Express + Prisma API with authentication & scheduling features
├── frontend/        # React + Vite dashboard for diary, calendars, and reminders
├── docs/            # Setup documentation and project notes
└── README.md        # Project overview
```

## Features

- Secure JWT authentication with role-based access (Admin, Advocate, Paralegal)
- Data models for advocates, clients, case files, schedules, reminders, and diary entries
- REST API documented in [`backend/README.md`](backend/README.md)
- React dashboard surfacing daily diary entries, case calendars, and reminder notifications
- SQLite persistence with Prisma migrations and seed data for quick demos

## Getting Started

Follow [`docs/SETUP.md`](docs/SETUP.md) for end-to-end instructions covering:

- Installing backend/frontend dependencies
- Configuring environment variables
- Running database migrations and seeding demo data
- Launching both servers locally

## Sample Accounts

After seeding, use the built-in credentials to explore the system:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@senatelaw.test` | `password123` |
| Advocate | `advocate@senatelaw.test` | `password123` |
| Paralegal | `paralegal@senatelaw.test` | `password123` |

You can register additional users through the UI to mimic firm onboarding workflows.

## Contributing

1. Create feature branches for changes.
2. Run formatting/tests locally before submitting PRs.
3. Document new endpoints or UI flows in the appropriate README files.

## License

Proprietary – for internal Pasha Law Senate use.
