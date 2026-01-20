import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, dispatch, activeTaskId }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks yet. Add one to get started!</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            dispatch={dispatch}
            isActive={task.id === activeTaskId}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;