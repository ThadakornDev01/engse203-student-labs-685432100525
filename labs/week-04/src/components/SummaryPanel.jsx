const items = [
  ['total', 'Total'],
  ['pending', 'Pending'],
  ['inProgress', 'In Progress'],
  ['completed', 'Completed'],
];

function SummaryPanel({ summary }) {
  return (
    <section className="summary-grid" aria-label="Task summary">
      {items.map(([key, label]) => (
        <article className="summary-card" key={key}>
          <span>{label}</span>
          <strong>{summary[key]}</strong>
        </article>
      ))}
    </section>
  );
}

export default SummaryPanel;
