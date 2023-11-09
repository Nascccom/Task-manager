import { appReducer, InitialAppStateType, appActions } from "app/app-reducer"

let startState: InitialAppStateType

beforeEach(() => {
    startState = {
        isInitialized: false,
        status: "loading",
        error: null,
    }
})

test("isInitialized should be changed correct", () => {
    const endState = appReducer(startState, appActions.setIsInitialized({ isInitialized: true }))

    expect(endState.isInitialized).toBe(true)
})

test("correct status should be set", () => {
    const endState = appReducer(startState, appActions.setLoadingStatus({ status: "idle" }))

    expect(endState.status).toBe("idle")
})

test("correct error message should be set", () => {
    const endState = appReducer(startState, appActions.setErrorMessage({ error: "occurred error" }))

    expect(endState.error).toBe("occurred error")
})
