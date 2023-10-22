import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer, TodolistsReducerActionType} from "../state/reducers/todolists-reducer";
import {tasksReducer, TasksReducerActionType} from "../state/reducers/task-reducer";
import thunk from "redux-thunk";
import {appReducer, AppReducerActionsType} from "./app-reducer";
import {authReducer, LoginReducerActionsType} from "../state/reducers/auth-reducer";

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