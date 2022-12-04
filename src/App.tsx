import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './ToDoList';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all');


    const addTask = (valueTitle: string) => {
        setTasks([{id: v1(), title: valueTitle, isDone: false}, ...tasks])
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const toggleCheckBox = (taskID: string, checked: boolean) => {
        setTasks(tasks.map(el => taskID === el.id ? {...el, isDone: checked}: el))

        // setTasks( tasks.map(t=> t.id === taskID ? {...t, isDone: !t.isDone}: t))
    }

    return (
      <div className="App">
          <Todolist title="What to learn"
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    toggleCheckBox={toggleCheckBox}
          />
      </div>
    );
}

export default App;

