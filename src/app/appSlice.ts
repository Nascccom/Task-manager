import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
    name: "app",
    initialState: {
        isInitialized: false,
        status: "idle" as RequestStatus,
        error: null as null | string,
    },
    reducers: {
        setLoadingStatus: (state, action: PayloadAction<{ status: RequestStatus }>) => {
            state.status = action.payload.status
        },
        setErrorMessage: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        },
    },
    extraReducers: (builder) =>
        builder
            .addMatcher(
                (action: AnyAction) => action.type.endsWith("/pending"),
                (state) => {
                    state.status = "loading"
                },
            )
            .addMatcher(
                (action: AnyAction) => action.type.endsWith("/fulfilled"),
                (state) => {
                    state.status = "idle"
                },
            )
            .addMatcher(
                (action: AnyAction) => action.type.endsWith("/rejected"),
                (state) => {
                    state.status = "failed"
                },
            ),
})
export const appActions = slice.actions
export const appReducer = slice.reducer

//types
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
export type InitialAppState = ReturnType<typeof slice.getInitialState>
