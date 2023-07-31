import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodolistDomainType, todolistsReducer} from "../reducers/todolists-reducer";
import {tasksReducer, TasksStateType} from "../reducers/task-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/tasksAPI/tasks-api";
import {appReducer, initialAppStateType} from "../../app/app-reducer";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    app: appReducer,
    todolists: todolistsReducer,
    tasks: tasksReducer
})

const initialGlobalState = {
    app: {
        status: 'idle',
        error: null,
    } as initialAppStateType,
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'All', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'All', addedDate: '', order: 0, entityStatus: 'idle'}
    ] as TodolistDomainType[],
    tasks: {
        ['todolistId1']: [
            {
                id: '1', title: 'HTML&CSS', completed: true, description: '',
                status: TaskStatuses.Completed, priority: TaskPriorities.Hi,
                startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: ''
            },
            {
                id: '2', title: 'React', completed: false, description: '',
                status: TaskStatuses.New, priority: TaskPriorities.Hi,
                startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: ''
            },
        ],
        ['todolistId2']: [
            {
                id: '3', title: 'Milk', completed: false, description: '',
                status: TaskStatuses.New, priority: TaskPriorities.Hi,
                startDate: '', deadline: '', todoListId: 'todolistId2', order: 0, addedDate: ''
            },
            {
                id: '4', title: 'Coffee', completed: true, description: '',
                status: TaskStatuses.Completed, priority: TaskPriorities.Hi,
                startDate: '', deadline: '', todoListId: 'todolistId2', order: 0, addedDate: ''
            },
        ],
    } as TasksStateType
}

export const storyBookStore = legacy_createStore(rootReducer,
  initialGlobalState as AppRootStateType, applyMiddleware(thunk))


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

