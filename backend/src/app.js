import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import advocateRouter from './routes/advocates.js';
import clientRouter from './routes/clients.js';
import caseRouter from './routes/cases.js';
import scheduleRouter from './routes/schedules.js';
import diaryRouter from './routes/diary.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/advocates', advocateRouter);
app.use('/api/clients', clientRouter);
app.use('/api/cases', caseRouter);
app.use('/api/schedules', scheduleRouter);
app.use('/api/diary-entries', diaryRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

export default app;
