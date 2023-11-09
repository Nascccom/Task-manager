import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
    isInitialized: false as boolean,
    status: "loading" as RequestStatusType,
    error: null as null | string,
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoadingStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setErrorMessageAC: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setIsInitializedAC: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isInitialized = action.payload.value
        },
    },
})
export const { setIsInitializedAC, setLoadingStatusAC, setErrorMessageAC } = appSlice.actions
export const appReducer = appSlice.reducer

//types
export type initialAppStateType = typeof initialState
export type AppReducerActionsType =
    | ReturnType<typeof setLoadingStatusAC>
    | ReturnType<typeof setErrorMessageAC>
    | ReturnType<typeof setIsInitializedAC>
