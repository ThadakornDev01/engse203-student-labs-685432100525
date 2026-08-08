function RequestCard({ request, onDeleteRequest }) {
  
  // ฟังก์ชันแปลง Priority เป็นภาษาไทย
  const getPriorityLabel = (priority) => {
    if (priority === 'urgent' || priority === 'high') return 'เร่งด่วน';
    if (priority === 'normal') return 'ปกติ';
    return priority;
  };

  // ฟังก์ชันแปลง Status เป็นภาษาไทย
  const getStatusLabel = (status) => {
    if (status === 'pending') return 'รอดำเนินการ';
    if (status === 'in progress' || status === 'in_progress') return 'กำลังดำเนินการ';
    if (status === 'completed') return 'เสร็จสิ้น';
    return status;
  };

  // แปลงคลาสของ status เผื่อกรณีที่มีเว้นวรรค (เช่น in progress -> in-progress)
  const statusClass = request.status ? request.status.replace(/\s+/g, '-') : '';

  return (
    <article className="task-card">
      {/* ส่วนหัวการ์ด (เรียง ID -> Priority -> Status -> ปุ่มลบ) */}
      <div className="card-header">
        <span className="id">{request.id}</span>
        
        <span className={`priority ${request.priority}`}>
          {getPriorityLabel(request.priority)}
        </span>
        
        <span className={`status ${statusClass}`}>
          {getStatusLabel(request.status)}
        </span>
        
        <button 
          className="delete-btn" 
          onClick={() => onDeleteRequest(request.id)}
        >
          ลบ
        </button>
      </div>
      
      {/* ส่วนเนื้อหาการ์ด จัดข้อความให้เหมือนของเพื่อน */}
      <h3>{request.requestType}</h3>
      <p className="requester">ผู้แจ้ง: {request.requesterName}</p>
      <p className="location">สถานที่: {request.location}</p>
      <p className="details">{request.details}</p>
      
    </article>
  );
}

export default RequestCard;