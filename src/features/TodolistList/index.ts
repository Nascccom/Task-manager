import * as todolistsSelectors from "./model/selectors"
import * as tasksSlice from "./model/taskSlice"
import * as todolistsSlice from "./model/todolistsSlice"
import { todolistAPI } from "./api/todolists-api"
import { tasksAPI } from "./api/tasks-api"

const tasksReducer = tasksSlice.tasksReducer
const todolistsReducer = todolistsSlice.todolistsReducer

const todolistsActions = {
    ...todolistsSlice.todolistsActions,
    ...todolistsSlice.todolistsThunks,
}
const tasksActions = {
    ...tasksSlice.tasksThunks,
}

export { todolistsSelectors, todolistsActions, todolistAPI, tasksAPI, tasksActions, tasksReducer, todolistsReducer }

export type { TodolistType } from "./api/todolistsApi.types"
export type {
    CreateTaskType,
    DeleteTaskType,
    UpdateTaskType,
    UpdateTaskModelType,
    TaskType,
    GetTasksResponseType,
} from "./api/tasksApi.types"

export type { TasksStateType } from "./model/taskSlice"
export type { TodolistDomainType, FilterValuesType } from "./model/todolistsSlice"
export { TodolistList } from "./ui/TodolistList"
export { Todolist } from "./ui/Todolist/ToDoList"
export { Task } from "./ui/Todolist/Task/Task"
