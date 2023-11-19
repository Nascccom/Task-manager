import { todolistsSlice } from "features/TodolistList/model/todolistsSlice"
import { tasksReducer } from "features/TodolistList/model/taskSlice"
import { appReducer } from "./app-reducer"
import { authSlice } from "features/Login/model/authSlice"
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

//@ts-ignore
window.store = store
