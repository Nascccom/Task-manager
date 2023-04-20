import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType} from "../store/store";
import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../reducers/todolists-reducer";
import {tasksReducer} from "../reducers/task-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Coffee', isDone: true},
        ],
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: ()=> React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}