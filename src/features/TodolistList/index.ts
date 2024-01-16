import * as todolistsSelectors from "./model/selectors"
import * as tasksSlice from "./model/taskSlice"
import * as todolistsSlice from "./model/todolistsSlice"
import { todolistAPI } from "./api/todolists-api"
import { tasksAPI } from "./api/tasks-api"
import type { TodolistType } from "./api/todolistsApi.types"
import type {
    CreateTask,
    DeleteTask,
    UpdateTask,
    UpdateTaskModel,
    TaskType,
    GetTasksResponse,
} from "./api/tasksApi.types"
import type { TasksState } from "./model/taskSlice"
import type { TodolistDomain, FilterValues } from "./model/todolistsSlice"
import { TodolistList } from "./ui/TodolistList"
import { Todolist } from "./ui/Todolist/ToDoList"
import { Task } from "./ui/Todolist/Task/Task"
import { FilterTasksButtons } from "features/TodolistList/ui/Todolist/FilterTaskButtons/FilterTasksButtons"

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
    CreateTask,
    DeleteTask,
    UpdateTask,
    UpdateTaskModel,
    TaskType,
    GetTasksResponse,
    TasksState,
    TodolistDomain,
    FilterValues,
    Task,
    Todolist,
    TodolistList,
    FilterTasksButtons,
}
