import React from "react";
import {useEffect, useState} from "react";
import {todolistAPI, TodolistType} from "./todolists-api";


export default {
    title: 'API/TodolistsAPI'
}


export const GetTodolistsTitle = () => {
    const [state, setState] = useState<TodolistType[] | null>(null)

    useEffect(() => {
        todolistAPI.getTodolists()
          .then(res => setState(res.data))
    }, [])

    return state
      ? <div>{state.map(el => <div>{el.title}</div>)}</div>
      : <div>State is empty</div>
}

export const CreateTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = 'New Title for Todolist'

        todolistAPI.createTodolist(title)
          .then(res => setState(res.data))

    }, [])

    return <div>{JSON.stringify(state)}</div>

}

export const UpdateTodolists = () => {
    const [state, setState] = useState<{} | null>(null)

    useEffect(() => {
        const todolistId = "77b1bb9b-de12-4d24-b398-f7f76a52ede8"
        const newTitle = 'I am crazy'
        todolistAPI.updateTodolistTittle(todolistId, newTitle)
          .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolists = () => {
    const [state, setState] = useState<{} | null>(null)

    useEffect(() => {
        const todolistId = "b87597de-650a-403a-aa9e-b009419a8c6a"

        todolistAPI.deleteTodolist(todolistId)
          .then(res => setState(res.data))
          .catch(err => setState("Todolist with this id removed"))
    }, [])

    return <div>{JSON.stringify(state)}</div>

}