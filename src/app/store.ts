import { todolistsSlice, TodolistsReducerActionType } from "features/TodolistList/model/todolistsSlice"
import { TasksActionsType, tasksReducer } from "features/TodolistList/model/taskSlice"
import { appReducer, AppReducerActionsType } from "./app-reducer"
import { authSlice, LoginReducerActionsType } from "features/Login/model/authSlice"
import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authSlice,
        todolists: todolistsSlice,
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
