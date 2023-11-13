import { DeleteTaskType, tasksAPI, TaskType, UpdateTaskModelType } from "api/tasks-api"
import { appActions } from "app/app-reducer"
import { todolistsActions } from "../../todolists-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk, handleServerNetworkError, handleSuccessResponse } from "utils"

const tasksSlice = createSlice({
    name: "tasks",
    // 'todolistId': [{
    //     description: '', id: v1(), title: 'Night', completed: false, status: 0, priority: 0,
    //     startDate: '', deadline: '', todoListId: 'd6a00fdd-2582-4ddb-8f28-2b3c1022784f', order: 0, addedDate: ''
    // }]
    initialState: {} as TasksStateType,
    reducers: {
        removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((t) => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTask: (state, action: PayloadAction<{ todolistId: string; task: TaskType }>) => {
            const tasks = state[action.payload.todolistId]
            tasks.unshift(action.payload.task)
        },
        updateTask: (state, action: PayloadAction<{ todolistId: string; taskId: string; task: TaskType }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((t) => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = action.payload.task
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks
            })

            .addCase(todolistsActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsActions.removeTodolist, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(todolistsActions.setTodolist, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = []
                })
            })
            .addCase(todolistsActions.deleteAllTodolistsWithTasks, () => {
                return {}
            })
    },
})

//Thunks
export const getTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskType[] }, string>(
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

export const removeTask = createAppAsyncThunk<void, DeleteTaskType>(
    `${tasksSlice.name}/removeTask`,
    async (args, thunkAPI) => {
        const { dispatch } = thunkAPI

        try {
            dispatch(appActions.setLoadingStatus({ status: "loading" }))
            const res = await tasksAPI.deleteTask(args)
            handleSuccessResponse(dispatch, tasksActions.removeTask, res, args)
        } catch (err: any) {
            handleServerNetworkError(dispatch, err.message)
        }
    },
)

export const addTask = createAppAsyncThunk<void, { todolistId: string; textForTask: string }>(
    `${tasksSlice.name}/addTask`,
    async ({ todolistId, textForTask }, thunkAPI) => {
        const { dispatch } = thunkAPI

        try {
            dispatch(appActions.setLoadingStatus({ status: "loading" }))
            const res = await tasksAPI.createTask({ todolistId, title: textForTask })
            handleSuccessResponse(dispatch, tasksActions.addTask, res, { todolistId, task: res.data.item })
        } catch (err: any) {
            handleServerNetworkError(dispatch, err.message)
        }
    },
)

export const updateTask = createAppAsyncThunk<void, DeleteTaskType & { changingPart: Object }>(
    `${tasksSlice.name}/updateTask`,
    async (arg, thunkAPI) => {
        const { dispatch, getState } = thunkAPI
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

                handleSuccessResponse(dispatch, tasksActions.updateTask, res, {
                    todolistId: arg.todolistId,
                    taskId: arg.taskId,
                    task: res.data.item,
                })
            } catch (err: any) {
                handleServerNetworkError(dispatch, err.message)
            }
        } else {
            handleServerNetworkError(dispatch, "So task is not defined")
        }
    },
)

//types
export type TasksActionsType = typeof tasksSlice.actions

export type TasksStateType = {
    [key: string]: TaskType[]
}

export const tasksActions = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const tasksThunks = { getTasks, removeTask }
