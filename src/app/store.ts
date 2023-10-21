import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer, TodolistsReducerActionType} from "../state/reducers/todolists-reducer";
import {tasksReducer, TasksReducerActionType} from "../state/reducers/task-reducer";
import thunk from "redux-thunk";
import {appReducer, AppReducerActionsType} from "./app-reducer";

export const rootReducer = combineReducers({
    app: appReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

export const store= legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>


export type ActionTypes = TasksReducerActionType | TodolistsReducerActionType | AppReducerActionsType


//@ts-ignore
window.store = store;