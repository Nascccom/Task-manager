import * as authSelectors from "features/Auth/model/selectors"
import * as authSlice from "features/Auth/model/authSlice"
import { authAPI } from "./api/auth-api"
import type { InitialAuthState } from "./model/authSlice"
import { Login } from "./ui/Login"
import { useLogin } from "./lib/useLogin"

const authReducer = authSlice.authReducer
const authAsyncActions = {
    ...authSlice.authActions,
    ...authSlice.authThunks,
}
export { authSelectors, authAsyncActions, authReducer, authAPI, InitialAuthState, Login, useLogin }
export * from "./api/authApi.types"
