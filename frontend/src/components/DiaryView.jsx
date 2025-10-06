import { format, parseISO } from 'date-fns';

export default function DiaryView({ entries, isLoading, onSelectDate, selectedDate }) {
  return (
    <section className="card">
      <div className="header-actions">
        <h2>Daily Diary</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(event) => onSelectDate(event.target.value)}
        />
      </div>
      {isLoading && <p>Loading entries...</p>}
      {!isLoading && !entries.length && <p>No entries recorded for this day.</p>}
      <ul className="list">
        {entries.map((entry) => (
          <li key={entry.id} className="list-item">
            <div>
              <span className="badge">{format(typeof entry.date === 'string' ? parseISO(entry.date) : new Date(entry.date), 'PPPP')}</span>
              <strong>{entry.caseFile?.title}</strong>
              <p>{entry.notes}</p>
              <small style={{ color: '#829ab1' }}>
                Logged by {entry.createdBy?.fullName || 'Unknown'}
              </small>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
