import { appSlice, InitialAppStateType, appActions } from "app/appSlice"

let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        isInitialized: false,
        status: "loading",
        error: null,
    }
})

test("isInitialized should be changed correct", () => {
    const endState = appSlice(startState, appActions.setIsInitialized({ isInitialized: true }))

    expect(endState.isInitialized).toBe(true)
})

test("correct status should be set", () => {
    const endState = appSlice(startState, appActions.setLoadingStatus({ status: "idle" }))

    expect(endState.status).toBe("idle")
})

test("correct error message should be set", () => {
    const endState = appSlice(startState, appActions.setErrorMessage({ error: "occurred error" }))

    expect(endState.error).toBe("occurred error")
})
