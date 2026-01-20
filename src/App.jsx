import { useState, useEffect, useRef, useReducer } from 'react';
import Header from './components/Header';
import Timer from './components/Timer';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import taskReducer from './reducer/taskReducer';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

}

export default App
