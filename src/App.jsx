import { useState, useEffect, useRef, useReducer } from 'react';
import Header from './components/Header';
import Timer from './components/Timer';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import taskReducer from './reducer/taskReducer';
import './App.css'

function App() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [tasks, dispatch] = useReducer(taskReducer, []);

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
      </main>
    </div>
  );
}

export default App
