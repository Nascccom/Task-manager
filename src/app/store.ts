import {todolistsReducer, TodolistsReducerActionType} from "../features/TodolistList/todolists-reducer";
import {tasksReducer, TasksReducerActionType} from "../features/TodolistList/Todolist/Task/task-reducer";
import thunkMiddleware from "redux-thunk";
import {appReducer, AppReducerActionsType} from "./app-reducer";
import {authReducer, LoginReducerActionsType} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        todolists: todolistsReducer,
        tasks: tasksReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof store.getState>


export type ActionTypes =
  | TasksReducerActionType
  | TodolistsReducerActionType
  | AppReducerActionsType
  | LoginReducerActionsType


//@ts-ignore
window.store = store;