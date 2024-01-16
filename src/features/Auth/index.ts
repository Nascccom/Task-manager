import * as authSelectors from "features/Auth//model/selectors"
import * as authSlice from "features/Auth//model/authSlice"
import { authAPI } from "./api/auth-api"
import type { AuthMe, AuthParams, LoginParams } from "./api/authApi.types"
import type { InitialAuthState } from "./model/authSlice"
import { Login } from "./ui/Login"
import { useLogin } from "./lib/useLogin"

const authReducer = authSlice.authReducer
const authActions = {
    ...authSlice.authActions,
    ...authSlice.authThunks,
}
export {
    authSelectors,
    authReducer,
    authActions,
    authAPI,
    AuthMe,
    AuthParams,
    LoginParams,
    InitialAuthState,
    Login,
    useLogin,
}
