const statusLabels = {
  pending: 'รอดำเนินการ',
  'in-progress': 'กำลังดำเนินการ',
  completed: 'เสร็จสิ้น',
};

function RequestCard({ request, onDeleteRequest }) {
  const priorityClass = request.priority === 'urgent' ? 'request-card-urgent' : '';

  return (
    <article className={`request-card ${priorityClass}`}>
      <div>
        <p className="request-id">{request.id}</p>
        <h3>{request.requestType}</h3>
        <p>{request.location}</p>
        <p className="request-meta">
          <span>แจ้งโดย: {request.requesterName}</span>
          <span className={`status status-${request.status}`}>{statusLabels[request.status]}</span>
        </p>
        <p>{request.details}</p>
      </div>
      <button type="button" onClick={() => onDeleteRequest(request.id)}>ลบ</button>
    </article>
  );
}

export default RequestCard;
