import { format } from 'date-fns';

export default function CaseCalendar({ schedules, cases }) {
  const caseLookup = new Map(cases.map((item) => [item.id, item]));

  return (
    <section className="card">
      <div className="header-actions">
        <h2>Case Calendar</h2>
        <span style={{ color: '#52606d' }}>Upcoming events mapped to matters</span>
      </div>
      <ul className="list">
        {schedules.map((event) => {
          const caseFile = event.caseFile || caseLookup.get(event.caseId);
          return (
            <li key={event.id} className="list-item">
		<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span className="badge">{format(new Date(event.start), 'PP p')}</span>
                  <strong>{event.title}</strong>
                  <p style={{ margin: '0.25rem 0 0', color: '#52606d' }}>{caseFile?.title}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0 }}>
                    {format(new Date(event.start), 'p')} – {format(new Date(event.end), 'p')}
                  </p>
                  <small style={{ color: '#829ab1' }}>Advocate #{event.advocateId}</small>
                </div>
              </div>
            </li>
          );
        })}
        {!schedules.length && <li>No scheduled hearings.</li>}
      </ul>
    </section>
  );
}
