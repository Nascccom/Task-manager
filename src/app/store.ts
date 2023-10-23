import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer, TodolistsReducerActionType} from "../features/TodolistList/todolists-reducer";
import {tasksReducer, TasksReducerActionType} from "../features/TodolistList/Todolist/Task/task-reducer";
import thunk from "redux-thunk";
import {appReducer, AppReducerActionsType} from "./app-reducer";
import {authReducer, LoginReducerActionsType} from "../features/Login/auth-reducer";

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>


export type ActionTypes =
  | TasksReducerActionType
  | TodolistsReducerActionType
  | AppReducerActionsType
  | LoginReducerActionsType


//@ts-ignore
window.store = store;