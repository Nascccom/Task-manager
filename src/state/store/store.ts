import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {todolistsReducer, TodolistsReducerActionType} from "../reducers/todolists-reducer";
import {tasksReducer, TasksReducerActionType} from "../reducers/task-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>


export type ActionTypes = TasksReducerActionType | TodolistsReducerActionType


//@ts-ignore
window.store = store;