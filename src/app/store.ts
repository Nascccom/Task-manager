import { authReducer } from "features/Auth"
import { appReducer } from "app/appSlice"
import { configureStore } from "@reduxjs/toolkit"
import { tasksReducer, todolistsReducer } from "features/TodolistList"

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        todolists: todolistsReducer,
        tasks: tasksReducer,
    },
})
export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

//@ts-ignore
window.store = store
