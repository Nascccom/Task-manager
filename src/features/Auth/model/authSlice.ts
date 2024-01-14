import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { appActions } from "app/appSlice"
import { authAPI, LoginParamsType } from "features/Auth"
import { ResultCode } from "common/enums"
import { createAppAsyncThunk, handleServerAppError, thunkTryCatch } from "common/utils"
import { todolistsActions } from "features/TodolistList"

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
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(getAuthMeData.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
    },
})

const getAuthMeData = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
    `${slice.name}/getAuthMeData`,
    async (_, thunkAPI) => {
        const { dispatch } = thunkAPI

        return thunkTryCatch(thunkAPI, async () => {
            const res = await authAPI.getAuthMeData()
            if (res.resultCode === ResultCode.SUCCESS) {
                const { id, email, login } = res.data
                dispatch(authActions.setAuthData({ userId: id, email, login }))
                dispatch(todolistsActions.getTodolists())
                return { isLoggedIn: true }
            } else {
                return handleServerAppError(res, thunkAPI, false)
            }
        }).finally(() => {
            dispatch(appActions.setIsInitialized({ isInitialized: true }))
        })
    },
)

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
    `${slice.name}/login`,
    async (args, thunkAPI) => {
        const { dispatch } = thunkAPI

        return thunkTryCatch(thunkAPI, async () => {
            const res = await authAPI.login(args)
            if (res.resultCode === ResultCode.SUCCESS) {
                dispatch(authThunks.getAuthMeData())
                return { isLoggedIn: true }
            } else {
                const isShowAppError = !res.fieldsErrors.length
                return handleServerAppError(res, thunkAPI, isShowAppError)
            }
        })
    },
)

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/logout`, async (_, thunkApi) => {
    const { dispatch } = thunkApi

    return thunkTryCatch(thunkApi, async () => {
        const res = await authAPI.logout()
        if (res.resultCode === ResultCode.SUCCESS) {
            dispatch(todolistsActions.deleteAllTodolistsWithTasks())
            dispatch(authActions.setAuthData({ userId: null, email: null, login: null }))
            return { isLoggedIn: false }
        } else {
            return handleServerAppError(res, thunkApi)
        }
    })
})

//types
export type InitialAuthStateType = ReturnType<typeof slice.getInitialState>

export const authActions = slice.actions
export const authReducer = slice.reducer
export const authThunks = { getAuthMeData, login, logout }
