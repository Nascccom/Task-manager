import { CreateTask, tasksActions, todolistAPI, TodolistType } from "features/TodolistList"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from "common/utils"
import { ResultCode } from "common/enums"
import { RequestStatus } from "app/appSlice"

export const slice = createSlice({
    name: "todolists",
    initialState: [] as TodolistDomain[],
    reducers: {
        changeFilter: (
            state,
            action: PayloadAction<{
                todolistId: string
                filter: FilterValues
            }>,
        ) => {
            const index = state.findIndex((t) => t.id === action.payload.todolistId)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        changeEntityStatus: (
            state,
            action: PayloadAction<{
                todolistId: string
                entityStatus: RequestStatus
            }>,
        ) => {
            const index = state.findIndex((t) => t.id === action.payload.todolistId)
            if (index > -1) {
                state[index].entityStatus = action.payload.entityStatus
            }
        },
        deleteAllTodolistsWithTasks: () => {
            return []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodolists.fulfilled, (_, action) => {
                return action.payload.map((t) => ({ ...t, filter: "All", entityStatus: "idle" }))
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                state.unshift({ ...action.payload.todolist, filter: "All", entityStatus: "idle" })
            })
            .addCase(updateTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex((t) => t.id === action.payload.todolistId)
                if (index > -1) {
                    state[index].title = action.payload.title
                }
            })
    },
})

//thunks
const getTodolists = createAppAsyncThunk<TodolistType[], undefined>(
    `${slice.name}/getTodolists`,
    async (_, thunkAPI) => {
        const { dispatch } = thunkAPI

        return thunkTryCatch(thunkAPI, async () => {
            const todolists = await todolistAPI.getTodolists()
            todolists.forEach((todo) => {
                dispatch(tasksActions.getTasks(todo.id))
            })
            return todolists
        })
    },
)

const removeTodolist = createAppAsyncThunk<{ todolistId: string }, string>(
    `${slice.name}/removeTodolist`,
    async (todolistId, thunkAPI) => {
        const { dispatch } = thunkAPI

        return thunkTryCatch(thunkAPI, async () => {
            dispatch(todolistsActions.changeEntityStatus({ todolistId, entityStatus: "loading" }))
            const res = await todolistAPI.deleteTodolist(todolistId)

            if (res.resultCode === ResultCode.SUCCESS) {
                return { todolistId }
            } else {
                return handleServerAppError(res, thunkAPI)
            }
        })
    },
)

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
    `${slice.name}/addTodolist`,
    async (title, thunkAPI) => {
        return thunkTryCatch(thunkAPI, async () => {
            const res = await todolistAPI.createTodolist(title)
            if (res.resultCode === ResultCode.SUCCESS) {
                return { todolist: res.data.item }
            } else {
                return handleServerAppError(res, thunkAPI)
            }
        })
    },
)

const updateTodolistTitle = createAppAsyncThunk<CreateTask, CreateTask>(
    `${slice.name}/updateTodolistTitle`,
    async (args, thunkAPI) => {
        return thunkTryCatch(thunkAPI, async () => {
            const res = await todolistAPI.updateTodolistTittle(args)
            if (res.resultCode === ResultCode.SUCCESS) {
                return args
            } else {
                return handleServerAppError(res, thunkAPI)
            }
        })
    },
)

//types
export type TodolistDomain = TodolistType & {
    filter: FilterValues
    entityStatus: RequestStatus
}
export type FilterValues = "All" | "Active" | "Completed"

export const todolistsActions = slice.actions
export const todolistsReducer = slice.reducer
export const todolistsThunks = { getTodolists, removeTodolist, addTodolist, updateTodolistTitle }
