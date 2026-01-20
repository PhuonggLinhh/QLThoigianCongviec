import React, { useState } from 'react';

const TaskInput = ({ dispatch }) => {
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch({ type: 'ADD_TASK', payload: { text: taskText } });
      setTaskText('');
    }
  };

  return (
    <div className="task-input">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Thêm công việc mới..."
      />
      <button onClick={handleAddTask}>Thêm</button>
    </div>
  );
};

export default TaskInput;