import { CreateTaskType, tasksThunks, todolistAPI, TodolistType } from "features/TodolistList"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils"
import { ResultCode } from "common/enums"
import { appActions, RequestStatusType } from "app/app-reducer"

const slice = createSlice({
    name: "todolists",
    initialState: [] as TodolistDomainType[],
    reducers: {
        changeFilter: (
            state,
            action: PayloadAction<{
                todolistId: string
                filter: FilterValuesType
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
                entityStatus: RequestStatusType
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
            .addCase(getTodolists.fulfilled, (state, action) => {
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
const getTodolists = createAppAsyncThunk<TodolistType[], null>(`${slice.name}/getTodolists`, async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
        dispatch(appActions.setLoadingStatus({ status: "loading" }))
        const todolists = await todolistAPI.getTodolists()
        dispatch(appActions.setLoadingStatus({ status: "succeeded" }))

        todolists.forEach((todo) => {
            dispatch(tasksThunks.getTasks(todo.id))
        })
        return todolists
    } catch (err: any) {
        handleServerNetworkError(dispatch, err.message)
        return rejectWithValue(null)
    }
})

const removeTodolist = createAppAsyncThunk<{ todolistId: string }, string>(
    `${slice.name}/removeTodolist`,
    async (todolistId, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        try {
            dispatch(appActions.setLoadingStatus({ status: "loading" }))
            dispatch(todolistsActions.changeEntityStatus({ todolistId, entityStatus: "loading" }))
            const res = await todolistAPI.deleteTodolist(todolistId)

            if (res.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setLoadingStatus({ status: "succeeded" }))
                return { todolistId }
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

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
    `${slice.name}/addTodolist`,
    async (title, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        try {
            dispatch(appActions.setLoadingStatus({ status: "loading" }))
            const res = await todolistAPI.createTodolist(title)

            if (res.resultCode === ResultCode.SUCCESS) {
                dispatch(appActions.setLoadingStatus({ status: "succeeded" }))
                return { todolist: res.data.item }
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

const updateTodolistTitle = createAppAsyncThunk<CreateTaskType, CreateTaskType>(
    `${slice.name}/updateTodolistTitle`,
    async (args, thunkAPI) => {
        const { dispatch, rejectWithValue } = thunkAPI

        try {
            dispatch(appActions.setLoadingStatus({ status: "loading" }))
            const res = await todolistAPI.updateTodolistTittle(args)

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

//types
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type FilterValuesType = "All" | "Active" | "Completed"

export const todolistsActions = slice.actions
export const todolistsSlice = slice.reducer
export const todolistsThunks = { getTodolists, removeTodolist, addTodolist, updateTodolistTitle }
