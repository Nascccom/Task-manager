import {authReducer, initialAuthStateType, setAuthDataAC, setIsLoggedInAC} from "../../features/Login/auth-reducer";

let startState: initialAuthStateType

beforeEach(() => {
    startState = {
        userId: null,
        email: null,
        login: null,
        rememberMe: false,
        isLoggedIn: false,
    }
})


test('IsLoggedIn should be changed correct', () => {
    const endState: initialAuthStateType = authReducer(startState, setIsLoggedInAC({value: true}));

    expect(endState.isLoggedIn).toBe(true)
})

test('auth data should be added correct', () => {
    const endState: initialAuthStateType = authReducer(startState, setAuthDataAC({userId: 1, email: 'blaBla@mail.com', login: 'BlaBla'}));

    expect(endState.userId).toBe(1)
    expect(endState.email).toBe('blaBla@mail.com')
    expect(endState.login).toBe('BlaBla')
})


