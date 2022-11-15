import React, {useState} from 'react';
import './App.css';
import {TasksType, TodoList} from "./components/TodoList";

export function App() {
  const todoListTitle: string = "What to learn";

  const [tasks, setTasks] = useState <Array<TasksType>>([
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'ReactJS', isDone: false},
    {id: 4, title: 'ReactJS1', isDone: false},
    {id: 5, title: 'ReactJS2', isDone: false}
  ])

  const removeTask = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId)
    setTasks(updatedTasks)
    console.log(tasks)
  }
  return (
    <div className="App">
      <TodoList title={todoListTitle} tasks={tasks} removeTask={removeTask}/>
    </div>
  );
}

export default App;