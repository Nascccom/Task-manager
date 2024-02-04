import { authReducer } from "features/Auth"
import { appReducer } from "app/appSlice"
import { configureStore } from "@reduxjs/toolkit"
import { tasksReducer, todolistsReducer } from "features/TodolistList"
import { captchaReducer } from "features/Captcha"

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        todolists: todolistsReducer,
        tasks: tasksReducer,
        captcha: captchaReducer,
    },
})
export type AppRootState = ReturnType<typeof store.getState>

//@ts-ignore
window.store = store
