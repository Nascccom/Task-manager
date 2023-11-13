import { todolistAPI } from "features/TodolistList/api/todolists-api"
import { appActions, RequestStatusType } from "app/app-reducer"
import { getTasks } from "features/TodolistList/model/taskSlice"
import { AppThunkDispatch } from "common/hooks"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "app/store"
import { handleServerNetworkError, handleSuccessResponse } from "common/utils"
import { TodolistType } from "features/TodolistList/api/todolistsApi.types"

const slice = createSlice({
    name: "todolists",
    initialState: [] as TodolistDomainType[],
    reducers: {
        setTodolist: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
            return action.payload.todolists.map((t) => ({ ...t, filter: "All", entityStatus: "idle" }))
        },
        removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
            const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({ ...action.payload.todolist, filter: "All", entityStatus: "idle" })
        },
        changeTitleTodolist: (state, action: PayloadAction<{ todolistId: string; newTitle: string }>) => {
            const index = state.findIndex((t) => t.id === action.payload.todolistId)
            if (index > -1) {
                state[index].title = action.payload.newTitle
            }
        },
        changeFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>) => {
            const index = state.findIndex((t) => t.id === action.payload.todolistId)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        changeEntityStatus: (state, action: PayloadAction<{ todolistId: string; entityStatus: RequestStatusType }>) => {
            const index = state.findIndex((t) => t.id === action.payload.todolistId)
            if (index > -1) {
                state[index].entityStatus = action.payload.entityStatus
            }
        },
        deleteAllTodolistsWithTasks: () => {
            return []
        },
    },
})

//thunkCreators
export const getTodolistsTC = (): AppThunk => (dispatch: AppThunkDispatch) => {
    dispatch(appActions.setLoadingStatus({ status: "loading" }))

    todolistAPI
        .getTodolists()
        .then((res) => {
            dispatch(todolistsActions.setTodolist({ todolists: res }))
            dispatch(appActions.setLoadingStatus({ status: "succeeded" }))
            return res
        })
        .then((todolists) => {
            todolists.forEach((todo) => {
                dispatch(getTasks(todo.id))
            })
        })
        .catch((err) => {
            handleServerNetworkError(dispatch, err.message)
        })
}

export const removeTodolistTC =
    (todolistId: string): AppThunk =>
    (dispatch: AppThunkDispatch) => {
        dispatch(appActions.setLoadingStatus({ status: "loading" }))
        dispatch(todolistsActions.changeEntityStatus({ todolistId, entityStatus: "loading" }))

        todolistAPI
            .deleteTodolist(todolistId)
            .then((res) => {
                handleSuccessResponse(dispatch, todolistsActions.removeTodolist, res, { todolistId })
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err.message)
                dispatch(todolistsActions.changeEntityStatus({ todolistId, entityStatus: "failed" }))
            })
    }

export const createTodolistTC =
    (title: string): AppThunk =>
    (dispatch: AppThunkDispatch) => {
        dispatch(appActions.setLoadingStatus({ status: "loading" }))

        todolistAPI
            .createTodolist(title)
            .then((res) => {
                handleSuccessResponse(dispatch, todolistsActions.addTodolist, res, { todolist: res.data.item })
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }

export const updateTodolistTitleTC =
    (todolistId: string, newTitle: string): AppThunk =>
    (dispatch: AppThunkDispatch) => {
        dispatch(appActions.setLoadingStatus({ status: "loading" }))

        todolistAPI
            .updateTodolistTittle(todolistId, newTitle)
            .then((res) => {
                handleSuccessResponse(dispatch, todolistsActions.changeTitleTodolist, res, { todolistId, newTitle })
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }

//types
export type TodolistDomainType = TodolistType & { filter: FilterValuesType; entityStatus: RequestStatusType }
export type FilterValuesType = "All" | "Active" | "Completed"

export type TodolistsReducerActionType =
    | ReturnType<typeof todolistsActions.removeTodolist>
    | ReturnType<typeof todolistsActions.addTodolist>
    | ReturnType<typeof todolistsActions.changeTitleTodolist>
    | ReturnType<typeof todolistsActions.changeFilter>
    | ReturnType<typeof todolistsActions.setTodolist>
    | ReturnType<typeof todolistsActions.changeEntityStatus>
    | ReturnType<typeof todolistsActions.deleteAllTodolistsWithTasks>

export const todolistsActions = slice.actions
export const todolistsSlice = slice.reducer
