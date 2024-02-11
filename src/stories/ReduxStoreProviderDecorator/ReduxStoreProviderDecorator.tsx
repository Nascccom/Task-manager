import React from "react"
import { Provider } from "react-redux"
import { AppRootState } from "app/store"
import { tasksReducer, TodolistDomain, todolistsReducer } from "features/TodolistList"
import { appReducer } from "app/appSlice"
import { MemoryRouter } from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit"
import { TaskPriorities, TaskStatuses } from "common/enums"
import { authReducer } from "features/Auth"
import { captchaReducer } from "features/Captcha"

const todolistId1 = "todolistId1"
const todolistId2 = "todolistId2"

const initialGlobalState: AppRootState = {
    app: {
        isInitialized: true,
        status: "succeeded",
        error: null,
    },
    todolists: [
        {
            id: todolistId1,
            title: "What to learn? We want to get quite long text for todolist for refactoring",
            filter: "All",
            addedDate: "",
            order: 0,
            entityStatus: "idle",
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "All",
            addedDate: "",
            order: 0,
            entityStatus: "idle",
        },
    ] as TodolistDomain[],
    tasks: {
        [todolistId1]: [
            {
                id: "1",
                title: "HTML&CSS",
                completed: true,
                description: "",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                todoListId: todolistId1,
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
                todoListId: todolistId1,
                order: 0,
                addedDate: "",
            },
        ],
        [todolistId2]: [
            {
                id: "3",
                title: "Milk",
                completed: false,
                description: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: "",
                deadline: "",
                todoListId: todolistId2,
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
                todoListId: todolistId2,
                order: 0,
                addedDate: "",
            },
        ],
    },
    auth: {
        userId: 1,
        email: "BlaBla@mail.ru",
        login: "BlaBla",
        isLoggedIn: true,
        rememberMe: false,
    },
    captcha: {
        captchaUrl: null,
    },
}
export type DecoratorState = typeof initialGlobalState

export const storyBookStore = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        todolists: todolistsReducer,
        tasks: tasksReducer,
        captcha: captchaReducer,
    },
    preloadedState: initialGlobalState as AppRootState,
})

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return (
        <MemoryRouter>
            <Provider store={storyBookStore}>{storyFn()}</Provider>
        </MemoryRouter>
    )
}
