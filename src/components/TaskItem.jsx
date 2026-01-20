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
    const handlePlayPause = () => {
        if (task.isRunning) {
            onPauseTask(task.id);
        } else {
            onStartTask(task.id);
        }
    };

    return (
        <li className={`task-item ${task.isRunning ? 'active' : ''} ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
                className="task-checkbox"
            />

            <div className="task-content">
                <span className="task-title">{task.title}</span>
            </div>

            <div className="task-actions">
                <button
                    className={`btn btn-play ${task.isRunning ? 'active' : ''}`}
                    onClick={handlePlayPause}
                    disabled={task.completed}
                >
                    {task.isRunning ? '⏸️' : '▶️'}
                </button>

                <button
                    className="btn btn-edit"
                    onClick={() => {
                        setEditTitle(task.title);
                        setIsEditing(true);
                    }}
                    disabled={task.completed}
                >
                    ✏️
                </button>

                <button className="btn btn-delete" onClick={() => onDelete(task.id)}>
                    🗑️
                </button>
            </div>
        </li>
    );
}

export default TaskItem;