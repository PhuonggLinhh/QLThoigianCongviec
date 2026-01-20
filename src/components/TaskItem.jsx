import React, { useState } from 'react';

const TaskItem = ({ task, dispatch, isActive }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleToggleComplete = () => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: { id: task.id } });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TASK', payload: { id: task.id } });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      dispatch({ type: 'EDIT_TASK', payload: { id: task.id, text: editText } });
      setIsEditing(false);
    }
  };

  const handleStartTimer = () => {
    dispatch({ type: 'SET_ACTIVE_TASK', payload: { id: task.id } });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Lưu</button>
        </>
      ) : (
        <>
          <span>{task.text}</span>
          <button onClick={handleToggleComplete}>
            {task.completed ? 'Hoàn tác' : 'Hoàn thành'}
          </button>
          <button onClick={handleEdit}>Sửa</button>
          <button onClick={handleDelete}>Xóa</button>
          {!task.completed && <button onClick={handleStartTimer}>▶️ Bắt đầu</button>}
        </>
      )}
    </div>
  );
};

export default TaskItem;