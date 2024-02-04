import { appAsyncActions, appReducer, InitialAppState } from "app/appSlice"

describe("appReducer", () => {
    let startState: InitialAppState

    beforeEach(() => {
        startState = {
            status: "idle",
            error: null,
            isInitialized: false,
        }
    })

    it("isInitialized should be changed correct", () => {
        const endState = appReducer(startState, appAsyncActions.setIsInitialized({ isInitialized: true }))

        expect(endState.isInitialized).toBe(true)
    })

    it("correct status should be set", () => {
        const endState = appReducer(startState, appAsyncActions.setLoadingStatus({ status: "loading" }))

        expect(endState.status).toBe("loading")
    })

    it("correct error message should be set", () => {
        const endState = appReducer(startState, appAsyncActions.setErrorMessage({ error: "occurred error" }))

        expect(endState.error).toBe("occurred error")
    })
})
