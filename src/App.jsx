import { useState, useEffect, useRef, useReducer } from 'react';
import Header from './components/Header';
import Timer from './components/Timer';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import taskReducer from './reducer/taskReducer';
import './App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const [tasks, dispatch] = useReducer(taskReducer, []);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          new Audio('https://www.soundjay.com/buttons/beep-07.mp3').play().catch(() => {});
          document.title = "⏰ Time's up!";
          dispatch({ type: 'STOP_ALL_TASKS' });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const mm = Math.floor(timeLeft / 60).toString().padStart(2, '0');
      const ss = (timeLeft % 60).toString().padStart(2, '0');
      document.title = `⏳ ${mm}:${ss}`;
    } else {
      document.title = 'Smart Pomodoro';
    }
  }, [timeLeft, isRunning]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const startTask = (id) => {
    dispatch({ type: 'STOP_ALL_TASKS' });
    resetTimer();
    dispatch({ type: 'START_TASK', payload: id });
    setTimeLeft(25 * 60);
    startTimer();
  };

  const pauseTask = () => pauseTimer();

  return (
    <div className="app-container">
      <Header />

      <main className="main-layout">
        <section className="timer-section">
          <Timer
            timeLeft={timeLeft}
            isRunning={isRunning}
            onStart={startTimer}
            onPause={pauseTimer}
            onReset={resetTimer}
            hasActiveTask={tasks.some((t) => t.isRunning)}
          />
        </section>

        <section className="tasks-section">
          <div className="tasks-card">
            <h2 className="section-title">Tasks</h2>

            <TaskInput
              onAdd={(title) => dispatch({ type: 'ADD_TASK', payload: title })}
            />

            <TaskList
              tasks={tasks}
              onDelete={(id) => dispatch({ type: 'DELETE_TASK', payload: id })}
              onToggleComplete={(id) => dispatch({ type: 'TOGGLE_COMPLETE', payload: id })}
              onToggleEdit={(id) => dispatch({ type: 'TOGGLE_EDIT', payload: id })}
              onSaveEdit={(id, title) => dispatch({ type: 'EDIT_TASK', payload: { id, title } })}
              onStartTask={startTask}
              onPauseTask={pauseTask}
              timerIsRunning={isRunning}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;