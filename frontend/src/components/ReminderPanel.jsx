import { formatDistanceToNow } from 'date-fns';

export default function ReminderPanel({ schedules }) {
  const reminders = schedules.flatMap((schedule) =>
    schedule.reminders?.map((reminder) => ({
      ...reminder,
      schedule
    })) || []
  );

  return (
    <section className="card">
      <div className="header-actions">
        <h2>Reminders</h2>
        <span style={{ color: '#52606d' }}>Notifications queued for upcoming hearings</span>
      </div>
      <div className="list">
        {reminders.map((reminder) => (
          <div className="reminder" key={reminder.id}>
            <div>
              <strong>{reminder.schedule.title}</strong>
              <p style={{ margin: 0, color: '#52606d' }}>{reminder.message}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="badge">{reminder.channel}</span>
              <small style={{ color: '#829ab1' }}>
                {formatDistanceToNow(new Date(reminder.sendAt), { addSuffix: true })}
              </small>
            </div>
          </div>
        ))}
        {!reminders.length && <p>No reminders scheduled.</p>}
      </div>
    </section>
  );
}
