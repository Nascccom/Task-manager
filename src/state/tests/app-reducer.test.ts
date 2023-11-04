import {
    appReducer,
    initialAppStateType,
    setErrorMessageAC,
    setIsInitializedAC,
    setLoadingStatusAC
} from "../../app/app-reducer";

let startState: initialAppStateType

beforeEach(() => {
    startState = {
        isInitialized: false,
        status: 'loading',
        error: null,
    }
})


test('isInitialized should be changed correct', () => {
    const endState = appReducer(startState, setIsInitializedAC(true));

    expect(endState.isInitialized).toBe(true)
})

test('correct status should be set', () => {
    const endState = appReducer(startState, setLoadingStatusAC('idle'));

    expect(endState.status).toBe('idle')
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setErrorMessageAC('occurred error'));

    expect(endState.error).toBe('occurred error')
})


