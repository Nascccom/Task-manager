import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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

//types
export type InitialAuthStateType = ReturnType<typeof slice.getInitialState>

export const authActions = slice.actions
export const authReducer = slice.reducer
