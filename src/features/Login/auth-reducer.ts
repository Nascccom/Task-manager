import { authAPI } from "api/auth-api"
import { AppThunkDispatch } from "common/hooks"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { getTodolistsTC, todolistsActions } from "../TodolistList/todolists-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppThunk } from "app/store"
import { appActions } from "app/app-reducer"
import { ResultCode } from "common/enums"

export const authSlice = createSlice({
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
export const authActions = authSlice.actions
export const authReducer = authSlice.reducer

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
            dispatch(getTodolistsTC())
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
export type InitialAuthStateType = ReturnType<typeof authSlice.getInitialState>
export type LoginReducerActionsType =
    | ReturnType<typeof authActions.setIsLoggedIn>
    | ReturnType<typeof authActions.setAuthData>
