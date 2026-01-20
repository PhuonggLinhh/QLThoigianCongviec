export default function taskReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_TASK':
            return [
                ...state,
                {
                    id: Date.now(),
                    title: action.payload,
                    completed: false,
                    isRunning: false,
                    isEditing: false,
                },
            ];


        case 'STOP_ALL_TASKS':
            return state.map((t) => ({ ...t, isRunning: false }));


        case 'STOP_TASK':
            return state.map(task =>
                task.id === action.payload
                    ? { ...task, isRunning: false }
                    : task
            );
        default:
            return state;
    }
}