import { CreateTask, DeleteTask, tasksAPI, TaskType, todolistsActions, UpdateTaskModel } from "features/TodolistList"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils"
import { ResultCode, TaskStatuses } from "common/enums"

export const slice = createSlice({
    name: "tasks",
    // 'todolistId': [{
    //     description: '', id: v1(), title: 'Night', completed: false, status: 0, priority: 0,
    //     startDate: '', deadline: '', todoListId: 'd6a00fdd-2582-4ddb-8f28-2b3c1022784f', order: 0, addedDate: ''
    // }]
    initialState: {} as TasksState,
    reducers: {
        changeTaskStatus: (
            state,
            action: PayloadAction<{
                todolistId: string
                taskId: string
                status: TaskStatuses
            }>,
        ) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((t) => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index].status = action.payload.status
            }
        },
    },
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
    async (todolistId) => {
        const res = await tasksAPI.getTasks(todolistId)
        return { todolistId, tasks: res.items }
    },
)

const removeTask = createAppAsyncThunk<DeleteTask, DeleteTask>(
    `${slice.name}/removeTask`,
    async (args, { dispatch, rejectWithValue }) => {
        dispatch(
            tasksActions.changeTaskStatus({
                todolistId: args.todolistId,
                taskId: args.taskId,
                status: TaskStatuses.Deleted,
            }),
        )

        const res = await tasksAPI.deleteTask(args)
        if (res.resultCode === ResultCode.SUCCESS) {
            return args
        } else {
            return rejectWithValue(res)
        }
    },
)

const addTask = createAppAsyncThunk<{ todolistId: string; task: TaskType }, CreateTask>(
    `${slice.name}/addTask`,
    async ({ todolistId, title }, { rejectWithValue }) => {
        const res = await tasksAPI.createTask({ todolistId, title })
        if (res.resultCode === ResultCode.SUCCESS) {
            return { todolistId, task: res.data.item }
        } else {
            return rejectWithValue(res)
        }
    },
)

const updateTask = createAppAsyncThunk<DeleteTask & { task: TaskType }, DeleteTask & { changingPart: Object }>(
    `${slice.name}/updateTask`,
    async (arg, { getState, rejectWithValue }) => {
        const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId)

        if (task) {
            const model: UpdateTaskModel = {
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
                return rejectWithValue(res)
            }
        } else {
            return rejectWithValue(null)
        }
    },
)

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = { getTasks, removeTask, addTask, updateTask }

//types
export type TasksState = Record<string, TaskType[]>
