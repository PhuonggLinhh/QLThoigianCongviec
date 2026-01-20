import React, { useState } from "react";

const TaskInput = ({ onAdd }) => {
    const [task, setTask] = useState(" ");

    const handleAdd = () => {
        const task = value.trim();
        if (!task) return;
        onAdd(task);
        setTask("");
    };

    const handKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAdd();
        }
    };

    return (
        <div className="task-input">
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task..."
                onKeyDown={handKeyDown}
            />
            <button className="btn btn-primary" onClick={handleAdd}>
                Add
            </button>
        </div>
    );
};

export default TaskInput;