import React, {useState} from "react";
import {tasksAPI} from "./tasks-api";

export default {
    title: 'API/TasksAPI'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')

    const getTasks = () => {
        tasksAPI.getTasks(todolistId)
          .then(res => setState(res.data))
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input placeholder={'Enter Todolist Id'}
               onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <button onClick={getTasks}>Get Tasks</button>
    </>

}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskTitle, setTaskTitle] = useState('')

    const createTask = () => {
        tasksAPI.createTask(todolistId, taskTitle)
          .then(res => setState(res.data))
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input placeholder={'Enter Todolist Id'}
               onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'Enter Task title'}
               onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
        <button onClick={createTask}>Create Task</button>
    </>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<{} | null>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [newTitle, setNewTitle] = useState('')

    const updateTaskTitle = () => {
        tasksAPI.updateTaskTittle(todolistId, taskId, newTitle)
          .then(res => setState(res.data))
    }

    return <>
        <div>{JSON.stringify(state)}</div>
        <input placeholder={'Enter Todolist Id'}
               onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'Enter Task Id'}
               onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <input placeholder={'Enter new title'}
               onChange={(e) => setNewTitle(e.currentTarget.value)}/>
        <button onClick={updateTaskTitle}>Update Task Title</button>
    </>
}

export const DeleteTask = () => {
    const [state, setState] = useState<{} | null>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')

    const deleteTask = () => {
        tasksAPI.deleteTask(todolistId, taskId)
          .then(res => setState(res.data))
          .catch(err => setState("Task with this id removed"))
    }
    return <>
        <div>{JSON.stringify(state)}</div>
        <input placeholder={'Enter Todolist Id'}
               onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'Enter Task Id'}
               onChange={(e) => setTaskId(e.currentTarget.value)}/>

        <button onClick={deleteTask}>Delete Task</button>
    </>

}