import { authReducer, InitialAuthStateType, authActions } from "features/Auth"

let startState: InitialAuthStateType

beforeEach(() => {
    startState = {
        userId: null,
        email: null,
        login: null,
        rememberMe: false,
        isLoggedIn: false,
    }
})

test("IsLoggedIn should be changed correct", () => {
    const endState = authReducer(startState, authActions.setIsLoggedIn({ isLoggedIn: true }))

    expect(endState.isLoggedIn).toBe(true)
})

test("auth data should be added correct", () => {
    const endState = authReducer(
        startState,
        authActions.setAuthData({
            userId: 1,
            email: "blaBla@mail.com",
            login: "BlaBla",
        }),
    )

    expect(endState.userId).toBe(1)
    expect(endState.email).toBe("blaBla@mail.com")
    expect(endState.login).toBe("BlaBla")
})
