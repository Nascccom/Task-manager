import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "../todolists-reducer";
import {tasksReducer} from "../task-reducer";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store;