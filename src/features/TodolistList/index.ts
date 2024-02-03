import * as todolistsSelectors from "./model/selectors"
import * as tasksSlice from "./model/taskSlice"
import * as todolistsSlice from "./model/todolistsSlice"
import { todolistAPI } from "./api/todolists-api"
import { tasksAPI } from "./api/tasks-api"
import type { TasksState, TasksRootActions } from "./model/taskSlice"
import type { TodolistDomain, FilterValues } from "./model/todolistsSlice"
import { TodolistList } from "./ui/TodolistList"
import { Todolist } from "./ui/Todolist/ToDoList"
import { Task } from "features/TodolistList/ui/Todolist/Tasks/Task/Task"
import { FilterTasksButtons } from "features/TodolistList/ui/Todolist/FilterTaskButtons/FilterTasksButtons"
import { Tasks } from "./ui/Todolist/Tasks/Tasks"
import { TodolistTitle } from "features/TodolistList/ui/Todolist/TodolistTitle/TodolistTitle"

const tasksReducer = tasksSlice.tasksReducer
const todolistsReducer = todolistsSlice.todolistsReducer

const todolistsAsyncActions = {
    ...todolistsSlice.todolistsActions,
    ...todolistsSlice.todolistsThunks,
}
const tasksAsyncActions = {
    ...tasksSlice.tasksThunks,
    ...tasksSlice.tasksActions,
}

export {
    todolistsSelectors,
    todolistsAsyncActions,
    todolistAPI,
    tasksAPI,
    tasksAsyncActions,
    tasksReducer,
    todolistsReducer,
    TasksState,
    TodolistDomain,
    FilterValues,
    TasksRootActions,
    Task,
    Tasks,
    Todolist,
    TodolistList,
    FilterTasksButtons,
    TodolistTitle,
}
export * from "./api/todolistsApi.types"
export * from "./api/tasksApi.types"
