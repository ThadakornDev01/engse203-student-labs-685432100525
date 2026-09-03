const items = [
  ['total', 'ทั้งหมด'],
  ['pending', 'รอดำเนินการ'],
  ['inProgress', 'กำลังดำเนินการ'],
  ['completed', 'เสร็จสิ้น'],
];

function SummaryPanel({ summary }) {
  return (
    <section className="summary-grid" aria-label="สรุปคำร้อง">
      {items.map(([key, label]) => (
        <article key={key} className="summary-card">
          <span className="summary-label">{label}</span>
          <strong>{summary[key] ?? 0}</strong>
        </article>
      ))}
    </section>
  );
}

export default SummaryPanel;
