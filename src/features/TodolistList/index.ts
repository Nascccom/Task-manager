import * as todolistsSelectors from "./model/selectors"
import * as tasksSlice from "./model/taskSlice"
import * as todolistsSlice from "./model/todolistsSlice"
import { todolistAPI } from "./api/todolists-api"
import { tasksAPI } from "./api/tasks-api"
import type { TodolistType } from "./api/todolistsApi.types"
import type {
    CreateTaskType,
    DeleteTaskType,
    UpdateTaskType,
    UpdateTaskModelType,
    TaskType,
    GetTasksResponseType,
} from "./api/tasksApi.types"
import type { TasksStateType } from "./model/taskSlice"
import type { TodolistDomainType, FilterValuesType } from "./model/todolistsSlice"
import { TodolistList } from "./ui/TodolistList"
import { Todolist } from "./ui/Todolist/ToDoList"
import { Task } from "./ui/Todolist/Task/Task"

const tasksReducer = tasksSlice.tasksReducer
const todolistsReducer = todolistsSlice.todolistsReducer

const todolistsActions = {
    ...todolistsSlice.todolistsActions,
    ...todolistsSlice.todolistsThunks,
}
const tasksActions = {
    ...tasksSlice.tasksThunks,
    ...tasksSlice.tasksActions,
}

export {
    todolistsSelectors,
    todolistsActions,
    todolistAPI,
    tasksAPI,
    tasksActions,
    tasksReducer,
    todolistsReducer,
    TodolistType,
    CreateTaskType,
    DeleteTaskType,
    UpdateTaskType,
    UpdateTaskModelType,
    TaskType,
    GetTasksResponseType,
    TasksStateType,
    TodolistDomainType,
    FilterValuesType,
    Task,
    Todolist,
    TodolistList,
}
