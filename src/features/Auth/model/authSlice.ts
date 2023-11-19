import { authAPI } from "features/Auth"
import { AppThunkDispatch } from "common/hooks"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { todolistsActions, todolistsThunks } from "features/TodolistList"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "app/store"
import { appActions } from "app/app-reducer"
import { ResultCode } from "common/enums"

export const slice = createSlice({
    name: "auth",
    initialState: {
        userId: null as null | number,
        email: null as null | string,
        login: null as null | string,
        rememberMe: false,
        isLoggedIn: false,
    },
    reducers: {
        setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setAuthData: (
            state,
            action: PayloadAction<{ userId: null | number; email: string | null; login: null | string }>,
        ) => {
            state.userId = action.payload.userId
            state.email = action.payload.email
            state.login = action.payload.login
        },
    },
})

//Thunks Creator
export const getAuthMeDataTC = (): AppThunk => (dispatch: AppThunkDispatch) => {
    dispatch(appActions.setLoadingStatus({ status: "loading" }))

    authAPI
        .getAuthMeData()
        .then((res) => {
            if (res.resultCode === ResultCode.SUCCESS) {
                const { id, email, login } = res.data
                dispatch(authActions.setAuthData({ userId: id, email, login }))
                dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
                dispatch(appActions.setLoadingStatus({ status: "succeeded" }))
            } else {
                handleServerAppError(dispatch, res)
            }
        })
        .then(() => {
            dispatch(todolistsThunks.getTodolists(null))
        })
        .catch((err) => {
            handleServerNetworkError(dispatch, err)
        })
        .finally(() => {
            dispatch(appActions.setIsInitialized({ isInitialized: true }))
        })
}

export const loginTC =
    (email: string, password: string, rememberMe: boolean): AppThunk =>
    (dispatch: AppThunkDispatch) => {
        dispatch(appActions.setLoadingStatus({ status: "loading" }))

        authAPI
            .login({ email, password, rememberMe })
            .then((res) => {
                if (res.resultCode === ResultCode.SUCCESS) {
                    dispatch(getAuthMeDataTC())
                } else {
                    handleServerAppError(dispatch, res)
                }
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err)
            })
    }

export const logoutTC = (): AppThunk => (dispatch: AppThunkDispatch) => {
    dispatch(appActions.setLoadingStatus({ status: "loading" }))

    authAPI
        .logout()
        .then((res) => {
            if (res.resultCode === ResultCode.SUCCESS) {
                dispatch(todolistsActions.deleteAllTodolistsWithTasks())
                dispatch(authActions.setAuthData({ userId: null, email: null, login: null }))
                dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
                dispatch(appActions.setLoadingStatus({ status: "succeeded" }))
            } else {
                handleServerAppError(dispatch, res)
            }
        })
        .catch((err) => {
            handleServerNetworkError(dispatch, err)
        })
}

//types
export type InitialAuthStateType = ReturnType<typeof slice.getInitialState>

export const authActions = slice.actions
export const authSlice = slice.reducer
