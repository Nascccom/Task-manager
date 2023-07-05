import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {combineReducers, legacy_createStore} from "redux";
import {TodolistDomainType, todolistsReducer} from "../reducers/todolists-reducer";
import {tasksReducer, TasksStateType} from "../reducers/task-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'All', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'All', addedDate: '', order: 0}
    ] as TodolistDomainType[],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', completed: true, description: '', status: 0, priority: 0,
                startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''},
            {id: v1(), title: 'React', completed: false, description: '', status: 0, priority: 0,
                startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', completed: false, description: '', status: 0, priority: 0,
                startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''},
            {id: v1(), title: 'Coffee', completed: true, description: '', status: 0, priority: 0,
                startDate: '', deadline: '', todoListId: '', order: 0, addedDate: ''},
        ],
    } as TasksStateType
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: ()=> React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}