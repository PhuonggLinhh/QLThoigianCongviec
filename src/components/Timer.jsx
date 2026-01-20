function Timer({ timeLeft, isRunning, onStart, onPause, onReset, hasActiveTask }) {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className="timer-container">
      <div className="timer-display">
        <h1>{minutes}:{seconds}</h1>
      </div>

      <div className="timer-controls">
        <button
          className="btn btn-primary btn-large"
          onClick={isRunning ? onPause : onStart}
          disabled={isRunning || !hasActiveTask}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
      </div>
    </div>
  );
}

export default Timer;