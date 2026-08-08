function RequestCard({ request, onDeleteRequest }) {
  
  // ฟังก์ชันแปลง Priority เป็นภาษาไทย (รองรับทั้งพิมพ์เล็กพิมพ์ใหญ่)
  const getPriorityLabel = (priority) => {
    const p = priority?.toLowerCase();
    if (p === 'urgent' || p === 'high') return 'เร่งด่วน';
    if (p === 'normal') return 'ปกติ';
    return priority;
  };

  // ฟังก์ชันแปลง Status เป็นภาษาไทย
  const getStatusLabel = (status) => {
    const s = status?.toLowerCase();
    if (s === 'pending') return 'รอดำเนินการ';
    if (s === 'in progress' || s === 'in-progress' || s === 'in_progress') return 'กำลังดำเนินการ';
    if (s === 'completed') return 'เสร็จสิ้น';
    return status;
  };

  // แปลง status และ priority ให้เป็น class name ที่ตรงกับ CSS เสมอ
  const statusClass = request.status ? request.status.toLowerCase().replace(/\s+/g, '-') : '';
  const priorityClass = request.priority ? request.priority.toLowerCase() : '';

  return (
    <article className="task-card">
      {/* ส่วนหัวการ์ด */}
      <div className="card-header">
        <span className="id">{request.id}</span>
        
        {/* ป้าย Priority */}
        <span className={`priority ${priorityClass}`}>
          {getPriorityLabel(request.priority)}
        </span>
        
        {/* ป้าย Status ใช้คลาส status-badge ให้ตรงกับ CSS */}
        <span className={`status-badge ${statusClass}`}>
          {getStatusLabel(request.status)}
        </span>
        
        <button 
          className="delete-btn" 
          onClick={() => onDeleteRequest(request.id)}
        >
          ลบ
        </button>
      </div>
      
      {/* ส่วนเนื้อหาการ์ด */}
      <h3>{request.requestType}</h3>
      <p className="requester">ผู้แจ้ง: {request.requesterName}</p>
      <p className="location">สถานที่: {request.location}</p>
      <p className="details">{request.details}</p>
      
    </article>
  );
}

export default RequestCard;