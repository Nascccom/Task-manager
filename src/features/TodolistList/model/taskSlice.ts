import {
    CreateTaskType,
    DeleteTaskType,
    tasksAPI,
    TaskType,
    todolistsActions,
    UpdateTaskModelType,
} from "features/TodolistList"
import { appActions } from "app/appSlice"
import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError, thunkTryCatch } from "common/utils"
import { ResultCode } from "common/enums"

export const slice = createSlice({
    name: "tasks",
    // 'todolistId': [{
    //     description: '', id: v1(), title: 'Night', completed: false, status: 0, priority: 0,
    //     startDate: '', deadline: '', todoListId: 'd6a00fdd-2582-4ddb-8f28-2b3c1022784f', order: 0, addedDate: ''
    // }]
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex((t) => t.id === action.payload.taskId)
                if (index > -1) {
                    tasks.splice(index, 1)
                }
            })
            .addCase(addTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                tasks.unshift(action.payload.task)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex((t) => t.id === action.payload.taskId)
                if (index > -1) {
                    tasks[index] = action.payload.task
                }
            })
            .addCase(todolistsActions.addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsActions.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(todolistsActions.getTodolists.fulfilled, (state, action) => {
                action.payload.forEach((tl) => {
                    state[tl.id] = []
                })
            })
            .addCase(todolistsActions.deleteAllTodolistsWithTasks, () => {
                return {}
            })
    },
})

//Thunks
const getTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskType[] }, string>(
    `${slice.name}/getTasks`,
    async (todolistId, thunkAPI) => {
        return thunkTryCatch(thunkAPI, async () => {
            const res = await tasksAPI.getTasks(todolistId)
            return { todolistId, tasks: res.items }
        })
    },
)

const removeTask = createAppAsyncThunk<DeleteTaskType, DeleteTaskType>(
    `${slice.name}/removeTask`,
    async (args, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        return thunkTryCatch(thunkAPI, async () => {
            const res = await tasksAPI.deleteTask(args)
            if (res.resultCode === ResultCode.SUCCESS) {
                return args
            } else {
                handleServerAppError(dispatch, res)
                return rejectWithValue(null)
            }
        })
    },
)

const addTask = createAppAsyncThunk<{ todolistId: string; task: TaskType }, CreateTaskType>(
    `${slice.name}/addTask`,
    async ({ todolistId, title }, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        return thunkTryCatch(thunkAPI, async () => {
            const res = await tasksAPI.createTask({ todolistId, title })
            if (res.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setLoadingStatus({ status: "succeeded" }))
                return { todolistId, task: res.data.item }
            } else {
                handleServerAppError(dispatch, res)
                return rejectWithValue(null)
            }
        })
    },
)

const updateTask = createAppAsyncThunk<DeleteTaskType & { task: TaskType }, DeleteTaskType & { changingPart: Object }>(
    `${slice.name}/updateTask`,
    async (arg, thunkAPI) => {
        const { dispatch, getState, rejectWithValue } = thunkAPI
        const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId)

        if (task) {
            return thunkTryCatch(thunkAPI, async () => {
                const model: UpdateTaskModelType = {
                    title: task.title,
                    completed: task.completed,
                    description: task.description,
                    deadline: task.deadline,
                    startDate: task.startDate,
                    status: task.status,
                    priority: task.priority,
                    ...arg.changingPart,
                }

                const res = await tasksAPI.updateTask({ todolistId: arg.todolistId, taskId: arg.taskId, model })
                if (res.resultCode === ResultCode.SUCCESS) {
                    return { todolistId: arg.todolistId, taskId: arg.taskId, task: res.data.item }
                } else {
                    handleServerAppError(dispatch, res)
                    return rejectWithValue(null)
                }
            })
        } else {
            handleServerNetworkError(dispatch, "So task is not defined")
            return rejectWithValue(null)
        }
    },
)

//types
export type TasksStateType = {
    [key: string]: TaskType[]
}

export const tasksReducer = slice.reducer
export const tasksThunks = { getTasks, removeTask, addTask, updateTask }
