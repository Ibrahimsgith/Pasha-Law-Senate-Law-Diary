# Frontend UI

React dashboard delivering a holistic view of daily diary entries, case calendars, and reminder notifications tailored for legal teams.

## Scripts

- `npm run dev` – start Vite dev server (port 5173)
- `npm run build` – build production assets
- `npm run preview` – preview production build

## Pages & Components

- `App.jsx` – orchestrates authentication and renders the dashboard layout
- `components/DiaryView.jsx` – lists diary entries for a selected day
- `components/CaseCalendar.jsx` – shows scheduled hearings and deadlines
- `components/ReminderPanel.jsx` – surfaces notifications for upcoming events
- `components/AuthPanel.jsx` – login/register workflows
- `context/AuthContext.jsx` – manages JWT storage & access

## API Integration

HTTP requests are proxied to the backend via `/api` with the Vite dev server proxy. Update `vite.config.js` to target a different backend host if needed.

## Styling

`src/styles.css` contains lightweight utility styles for the dashboard layout. Tailor as desired or replace with a component library.
