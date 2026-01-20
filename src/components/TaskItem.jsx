import { useState } from 'react';

function TaskItem({
  task,
  onToggleComplete,
  onStartTask,
  onPauseTask,
  onDelete,
  onSaveEdit,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const saveEdit = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== task.title) {
      onSaveEdit(task.id, trimmed);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className={`task-item editing ${task.completed ? 'completed' : ''}`}>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') cancelEdit();
          }}
          autoFocus
          className="edit-input"
        />

        <div className="task-actions edit-actions">
          <button className="btn btn-save" onClick={saveEdit}>
            Lưu
          </button>
          <button className="btn btn-cancel" onClick={cancelEdit}>
            Hủy
          </button>
        </div>
      </li>
    );
  }
}

export default TaskItem;