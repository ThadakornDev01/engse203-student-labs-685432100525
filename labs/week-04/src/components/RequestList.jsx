import TaskCard from './TaskCard.jsx';

function TaskList({ tasks, onDeleteTask }) {
  // TODO LAB4-R11: เพิ่ม empty state เมื่อ tasks.length === 0
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
