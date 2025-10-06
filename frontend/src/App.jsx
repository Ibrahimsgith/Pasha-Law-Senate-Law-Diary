import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiCalendar, FiLogOut, FiPlus } from 'react-icons/fi';
import DiaryView from './components/DiaryView.jsx';
import CaseCalendar from './components/CaseCalendar.jsx';
import ReminderPanel from './components/ReminderPanel.jsx';
import AuthPanel from './components/AuthPanel.jsx';
import { useAuth } from './context/AuthContext.jsx';
import { api } from './services/api.js';

function useDiary(date) {
  return useQuery({
    queryKey: ['diary', date],
    queryFn: async () => {
      const { data } = await api.get('/diary-entries', {
        params: date ? { date } : undefined
      });
      return data;
    },
    enabled: false
  });
}

function useSchedules() {
  return useQuery({
    queryKey: ['schedules'],
    queryFn: async () => {
      const { data } = await api.get('/schedules');
      return data;
    },
    enabled: false
  });
}

function useCases() {
  return useQuery({
    queryKey: ['cases'],
    queryFn: async () => {
      const { data } = await api.get('/cases');
      return data;
    },
    enabled: false
  });
}

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState('');
  const diaryQuery = useDiary(selectedDate);
  const schedulesQuery = useSchedules();
  const casesQuery = useCases();

  const refreshAll = () =>
    Promise.all([
      diaryQuery.refetch(),
      schedulesQuery.refetch(),
      casesQuery.refetch()
    ]);

  useEffect(() => {
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedDate) {
      diaryQuery.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h1>Pasha Law Senate</h1>
        <p>Daily legal diary dashboard</p>
        <nav>
          <button onClick={refreshAll}><FiCalendar /> Refresh Data</button>
        </nav>
      </aside>
      <main className="main">
        <DiaryView
          entries={diaryQuery.data || []}
          isLoading={diaryQuery.isLoading}
          onSelectDate={setSelectedDate}
          selectedDate={selectedDate}
        />
        <CaseCalendar schedules={schedulesQuery.data || []} cases={casesQuery.data || []} />
        <ReminderPanel schedules={schedulesQuery.data || []} />
      </main>
    </div>
  );
}

export default function App() {
  const { token, logout } = useAuth();

  if (!token) {
    return <AuthPanel />;
  }

  return (
    <>
      <div className="header-actions" style={{ padding: '1rem 2rem', background: '#fff', borderBottom: '1px solid #e0e7ff' }}>
        <div>
          <strong>Welcome back!</strong>
          <p style={{ margin: 0, color: '#52606d' }}>Track hearings, diary notes and reminders in one place.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="primary"><FiPlus style={{ marginRight: 6 }} /> New Entry</button>
          <button className="primary" style={{ background: '#ef4e4e' }} onClick={logout}><FiLogOut style={{ marginRight: 6 }} /> Logout</button>
        </div>
      </div>
      <Dashboard />
    </>
  );
}
