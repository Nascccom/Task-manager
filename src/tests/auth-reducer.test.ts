import { authReducer, InitialAuthState, authActions } from "features/Auth"

let startState: InitialAuthState

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
    const params = { email: "string", password: "string", rememberMe: false }
    const endState = authReducer(startState, authActions.login.fulfilled({ isLoggedIn: true }, "requestId", params))

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
