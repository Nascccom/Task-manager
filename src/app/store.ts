import { authReducer } from "features/Auth"
import { appSlice } from "app/appSlice"
import { configureStore } from "@reduxjs/toolkit"
import { tasksReducer, todolistsReducer } from "features/TodolistList"

export const store = configureStore({
    reducer: {
        app: appSlice,
        auth: authReducer,
        todolists: todolistsReducer,
        tasks: tasksReducer,
    },
})
export type AppRootStateType = ReturnType<typeof store.getState>

//@ts-ignore
window.store = store
