import { AnyAction, createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"

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
            .addMatcher(isPending, (state) => {
                state.status = "loading"
            })
            .addMatcher(isFulfilled, (state) => {
                state.status = "idle"
            })
            .addMatcher(isRejected, (state, action: AnyAction) => {
                debugger
                state.status = "failed"
                if (action.payload) {
                    if (
                        action.type.includes("getAuthMeData") ||
                        action.type.includes("addTask") ||
                        action.type.includes("addTodolist")
                    )
                        return

                    state.error = action.payload.messages[0]
                } else {
                    state.error = action.error.message ? action.error.message : "Some error occured"
                }
            }),
})
export const appActions = slice.actions
export const appReducer = slice.reducer

//types
export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
export type InitialAppState = ReturnType<typeof slice.getInitialState>
