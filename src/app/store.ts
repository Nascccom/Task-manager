import { todolistsReducer, TodolistsReducerActionType } from "features/TodolistList/todolists-reducer"
import { tasksReducer, TasksReducerActionType } from "features/TodolistList/Todolist/Task/task-reducer"
import { appReducer, AppReducerActionsType } from "./app-reducer"
import { authReducer, LoginReducerActionsType } from "features/Login/auth-reducer"
import { configureStore, ThunkAction, AnyAction } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        todolists: todolistsReducer,
        tasks: tasksReducer,
    },
})

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
export type AppRootStateType = ReturnType<typeof store.getState>

export type ActionTypes =
    | TasksReducerActionType
    | TodolistsReducerActionType
    | AppReducerActionsType
    | LoginReducerActionsType

//@ts-ignore
window.store = store
