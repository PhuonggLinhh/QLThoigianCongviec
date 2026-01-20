import TaskItem from './TaskItem';

function TaskList({
  tasks,
  onDelete,
  onToggleComplete,
  onToggleEdit,
  onSaveEdit,
  onStartTask,
  onPauseTask,
  timerIsRunning,
}) {
  if (tasks.length === 0) {
    return <p>No tasks yet. Add one to get started!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
          onToggleEdit={onToggleEdit}
          onSaveEdit={onSaveEdit}
          onStartTask={onStartTask}
          onPauseTask={onPauseTask}
          timerIsRunning={timerIsRunning}
        />
      ))}
    </ul>
  );
}

export default TaskList;