import React, { useEffect, useState } from "react"
import { todolistAPI } from "features/TodolistList/api/todolists-api"
import { TodolistType } from "features/TodolistList/api/todolistsApi.types"

export default {
    title: "API/TodolistsAPI",
}

export const GetTodolistsTitleWithId = () => {
    const [state, setState] = useState<TodolistType[] | null>(null)

    useEffect(() => {
        todolistAPI.getTodolists().then((res) => setState(res))
    }, [])

    return state ? (
        <div>
            {state.map((el, index) => (
                <div>
                    <span>{index + 1}: </span>
                    <span>TodolistID: {el.id}</span>
                    <h4 style={{ margin: 0, padding: 0 }}>Todolist Title: {el.title}</h4>
                </div>
            ))}
        </div>
    ) : (
        <div>State is empty</div>
    )
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState("")

    const createTodolist = () => {
        todolistAPI.createTodolist(title).then((res) => setState(res.data))
    }

    return (
        <>
            <div>{JSON.stringify(state)}</div>
            <input type='text' onChange={(e) => setTitle(e.currentTarget.value)} />
            <button onClick={createTodolist}>Create Todolist</button>
        </>
    )
}

export const UpdateTodolist = () => {
    const [state, setState] = useState<{} | null>(null)
    const [todolistId, setTodolistId] = useState("")
    const [title, setTitle] = useState("")

    const updateTodolist = () => {
        todolistAPI.updateTodolistTittle(todolistId, title).then((res) => setState(res.data))
    }

    return (
        <>
            <div>{JSON.stringify(state)}</div>
            <input placeholder={"Enter Todolist Id"} onChange={(e) => setTodolistId(e.currentTarget.value)} />
            <input placeholder={"Enter new Title"} onChange={(e) => setTitle(e.currentTarget.value)} />
            <button onClick={updateTodolist}>Update Todolist</button>
        </>
    )
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<{} | null>(null)
    const [todolistId, setTodolistId] = useState("")

    const deleteTodolist = () => {
        todolistAPI
            .deleteTodolist(todolistId)
            .then((res) => setState(res.data))
            .catch((err) => setState("Todolist with this id removed"))
    }
    return (
        <>
            <div>{JSON.stringify(state)}</div>
            <input placeholder={"Enter Todolist Id"} onChange={(e) => setTodolistId(e.currentTarget.value)} />
            <button onClick={deleteTodolist}>Delete Todolist</button>
        </>
    )
}
