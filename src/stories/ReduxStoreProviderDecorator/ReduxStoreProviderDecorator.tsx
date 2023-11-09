import React from "react"
import { Provider } from "react-redux"
import { AppRootStateType } from "../../app/store"
import { combineReducers } from "redux"
import { TodolistDomainType, todolistsReducer } from "../../features/TodolistList/todolists-reducer"
import { tasksReducer, TasksStateType } from "../../features/TodolistList/Todolist/Task/task-reducer"
import { TaskPriorities, TaskStatuses } from "../../api/tasks-api"
import { appReducer, initialAppStateType } from "../../app/app-reducer"
import thunkMiddleware from "redux-thunk"
import { MemoryRouter } from "react-router-dom"
import { authReducer } from "../../features/Login/auth-reducer"
import { configureStore } from "@reduxjs/toolkit"

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer,
})

const initialGlobalState: AppRootStateType = {
    app: {
        isInitialized: true,
        status: "succeeded",
        error: null,
    } as initialAppStateType,
    todolists: [
        { id: "todolistId1", title: "What to learn", filter: "All", addedDate: "", order: 0, entityStatus: "idle" },
        { id: "todolistId2", title: "What to buy", filter: "All", addedDate: "", order: 0, entityStatus: "idle" },
    ] as TodolistDomainType[],
    tasks: {
        ["todolistId1"]: [
            {
                id: "1",
                title: "HTML&CSS",
                completed: true,
                description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                todoListId: "todolistId1",
                order: 0,
                addedDate: "",
            },
            {
                id: "2",
                title: "React",
                completed: false,
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                todoListId: "todolistId1",
                order: 0,
                addedDate: "",
            },
        ],
        ["todolistId2"]: [
            {
                id: "3",
                title: "Milk",
                completed: false,
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                todoListId: "todolistId2",
                order: 0,
                addedDate: "",
            },
            {
                id: "4",
                title: "Coffee",
                completed: true,
                description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                todoListId: "todolistId2",
                order: 0,
                addedDate: "",
            },
        ],
    } as TasksStateType,
    auth: {
        userId: 1,
        email: "BlaBla@mail.ru",
        login: "BlaBla",
        isLoggedIn: true,
        rememberMe: false,
    },
}
export type DecoratorStateType = typeof initialGlobalState

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState as AppRootStateType,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
})

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <MemoryRouter>
            <Provider store={storyBookStore}>{storyFn()}</Provider>
        </MemoryRouter>
    )
}
