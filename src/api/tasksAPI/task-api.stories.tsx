import React from "react";
import {useEffect, useState} from "react";
import {tasksAPI} from "./tasks-api";

export default {
    title: 'API/TasksAPI'
}



export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoId = "77b1bb9b-de12-4d24-b398-f7f76a52ede8"

        tasksAPI.getTasks(todoId)
          .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoId = "77b1bb9b-de12-4d24-b398-f7f76a52ede8"
        const title = 'new task'

        tasksAPI.createTask(todoId, title)
          .then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>

}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<{} | null>(null)

    useEffect(() => {
        const todolistId = "77b1bb9b-de12-4d24-b398-f7f76a52ede8"
        const taskId = "2995c898-92b9-4df1-852b-956b00733ccb"
        const newTitle = 'Yoou'

        tasksAPI.updateTaskTittle(todolistId, taskId, newTitle)
          .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<{} | null>(null)

    useEffect(() => {
        const todolistId = "77b1bb9b-de12-4d24-b398-f7f76a52ede8"
        const taskId = "8e95cf16-79f5-48c3-a436-2b6a769e74a7"

        tasksAPI.deleteTask(todolistId, taskId)
          .then(res => setState(res.data))
          .catch(err => setState("Task with this id removed"))
    }, [])

    return <div>{JSON.stringify(state)}</div>

}