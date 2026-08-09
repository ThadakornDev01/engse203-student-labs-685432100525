import RequestCard from './TaskCard.jsx'; 

function RequestList({ tasks, onDeleteRequest }) { 
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>ไม่มีคำร้องที่ตรงกับเงื่อนไข</p>
      </div>
    );
  }
  
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <RequestCard
          key={task.id}
          request={task}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </div>
  );
}

export default RequestList;