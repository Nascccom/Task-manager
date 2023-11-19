import { authReducer } from "features/Auth"
import { appReducer } from "app/app-reducer"
import { AnyAction, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { tasksReducer, todolistsReducer } from "features/TodolistList"

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

//@ts-ignore
window.store = store
