import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { appAsyncActions } from "app/appSlice"
import { authAPI, LoginParams } from "features/Auth"
import { ResultCode } from "common/enums"
import { createAppAsyncThunk } from "common/utils"
import { todolistsAsyncActions } from "features/TodolistList"
import { captchaAsyncActions } from "features/Captcha"

const slice = createSlice({
    name: "auth",
    initialState: {
        userId: null as null | number,
        email: null as null | string,
        login: null as null | string,
        rememberMe: false,
        isLoggedIn: false,
    },
    reducers: {
        setAuthData: (
            state,
            action: PayloadAction<{ userId: null | number; email: string | null; login: null | string }>,
        ) => {
            state.userId = action.payload.userId
            state.email = action.payload.email
            state.login = action.payload.login
        },
    },
    extraReducers: (builder) =>
        builder.addMatcher(
            (action) => {
                return (
                    action.type === "auth/getAuthMeData/fulfilled" ||
                    action.type === "auth/logout/fulfilled" ||
                    action.type === "auth/login/fulfilled"
                )
            },
            (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
                state.isLoggedIn = action.payload.isLoggedIn
            },
        ),
})

const getAuthMeData = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
    `${slice.name}/getAuthMeData`,
    async (_, { dispatch, rejectWithValue }) => {
        const res = await authAPI.getAuthMeData().finally(() => {
            dispatch(appAsyncActions.setIsInitialized({ isInitialized: true }))
        })
        if (res.resultCode === ResultCode.SUCCESS) {
            const { id, email, login } = res.data
            dispatch(authActions.setAuthData({ userId: id, email, login }))
            dispatch(todolistsAsyncActions.getTodolists())
            return { isLoggedIn: true }
        } else {
            return rejectWithValue(res)
        }
    },
)

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParams>(
    `${slice.name}/login`,
    async (args, { dispatch, rejectWithValue }) => {
        const res = await authAPI.login(args)
        if (res.resultCode === ResultCode.SUCCESS) {
            dispatch(authThunks.getAuthMeData())
            return { isLoggedIn: true }
        } else {
            if (res.resultCode === ResultCode.ERROR_CAPTCHA) {
                dispatch(captchaAsyncActions.getCaptchaUrl())
            }
            return rejectWithValue(res)
        }
    },
)

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
    `${slice.name}/logout`,
    async (_, { dispatch, rejectWithValue }) => {
        const res = await authAPI.logout()
        if (res.resultCode === ResultCode.SUCCESS) {
            dispatch(todolistsAsyncActions.deleteAllTodolistsWithTasks())
            dispatch(authActions.setAuthData({ userId: null, email: null, login: null }))
            return { isLoggedIn: false }
        } else {
            return rejectWithValue(res)
        }
    },
)

export const authActions = slice.actions
export const authThunks = { getAuthMeData, login, logout }
export const authReducer = slice.reducer

//types
export type InitialAuthState = ReturnType<typeof slice.getInitialState>
