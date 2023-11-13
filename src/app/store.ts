import { todolistsReducer, TodolistsReducerActionType } from "features/TodolistList/todolists-reducer"
import { TasksActionsType, tasksReducer } from "features/TodolistList/Todolist/Task/task-reducer"
import { appReducer, AppReducerActionsType } from "./app-reducer"
import { authReducer, LoginReducerActionsType } from "features/Login/auth-reducer"
import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        todolists: todolistsReducer,
        tasks: tasksReducer,
    },
})
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>

export type ActionTypes =
    | TasksActionsType
    | TodolistsReducerActionType
    | AppReducerActionsType
    | LoginReducerActionsType

//@ts-ignore
window.store = store
