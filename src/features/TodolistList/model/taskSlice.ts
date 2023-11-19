import { tasksAPI } from "features/TodolistList/api/tasks-api"
import { appActions } from "app/app-reducer"
import { todolistsActions, todolistsThunks } from "features/TodolistList/model/todolistsSlice"
import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils"
import { CreateTaskType, DeleteTaskType, TaskType, UpdateTaskModelType } from "features/TodolistList/api/tasksApi.types"
import { ResultCode } from "common/enums"

const tasksSlice = createSlice({
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
            .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(todolistsThunks.getTodolists.fulfilled, (state, action) => {
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
    `${tasksSlice.name}/getTasks`,
    async (todolistId: string, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        try {
            dispatch(appActions.setLoadingStatus({ status: "loading" }))
            const res = await tasksAPI.getTasks(todolistId)
            dispatch(appActions.setLoadingStatus({ status: "succeeded" }))
            return { todolistId, tasks: res.items }
        } catch (err: any) {
            handleServerNetworkError(dispatch, err.message)
            return rejectWithValue(null)
        }
    },
)

const removeTask = createAppAsyncThunk<DeleteTaskType, DeleteTaskType>(
    `${tasksSlice.name}/removeTask`,
    async (args, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        try {
            dispatch(appActions.setLoadingStatus({ status: "loading" }))
            const res = await tasksAPI.deleteTask(args)
            if (res.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setLoadingStatus({ status: "succeeded" }))
                return args
            } else {
                handleServerAppError(dispatch, res)
                return rejectWithValue(null)
            }
        } catch (err: any) {
            handleServerNetworkError(dispatch, err.message)
            return rejectWithValue(null)
        }
    },
)

const addTask = createAppAsyncThunk<{ todolistId: string; task: TaskType }, CreateTaskType>(
    `${tasksSlice.name}/addTask`,
    async ({ todolistId, title }, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        try {
            dispatch(appActions.setLoadingStatus({ status: "loading" }))
            const res = await tasksAPI.createTask({ todolistId, title })
            if (res.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setLoadingStatus({ status: "succeeded" }))
                return { todolistId, task: res.data.item }
            } else {
                handleServerAppError(dispatch, res)
                return rejectWithValue(null)
            }
        } catch (err: any) {
            handleServerNetworkError(dispatch, err.message)
            return rejectWithValue(null)
        }
    },
)

const updateTask = createAppAsyncThunk<DeleteTaskType & { task: TaskType }, DeleteTaskType & { changingPart: Object }>(
    `${tasksSlice.name}/updateTask`,
    async (arg, thunkAPI) => {
        const { dispatch, getState, rejectWithValue } = thunkAPI
        const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId)

        if (task) {
            try {
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

                dispatch(appActions.setLoadingStatus({ status: "loading" }))
                const res = await tasksAPI.updateTask({ todolistId: arg.todolistId, taskId: arg.taskId, model })
                if (res.resultCode === ResultCode.SUCCESS) {
                    dispatch(appActions.setLoadingStatus({ status: "succeeded" }))
                    return { todolistId: arg.todolistId, taskId: arg.taskId, task: res.data.item }
                } else {
                    handleServerAppError(dispatch, res)
                    return rejectWithValue(null)
                }
            } catch (err: any) {
                handleServerNetworkError(dispatch, err.message)
                return rejectWithValue(null)
            }
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

export const tasksReducer = tasksSlice.reducer
export const tasksThunks = { getTasks, removeTask, addTask, updateTask }
