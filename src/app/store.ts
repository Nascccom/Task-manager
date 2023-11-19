import { tasksReducer, todolistsSlice } from "features/TodolistList"
import { authSlice } from "features/Auth"
import { appReducer } from "app/app-reducer"
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
