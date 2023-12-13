import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "app",
    initialState: {
        isInitialized: false,
        status: "loading" as RequestStatusType,
        error: null as null | string,
    },
    reducers: {
        setLoadingStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setErrorMessage: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        },
    },
})
export const appActions = slice.actions
export const appSlice = slice.reducer

//types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InitialAppStateType = ReturnType<typeof slice.getInitialState>
