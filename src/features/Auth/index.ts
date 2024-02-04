import * as authSelectors from "features/Auth/model/selectors"
import * as authSlice from "features/Auth/model/authSlice"
import { authAPI } from "./api/auth-api"
import type { InitialAuthState } from "./model/authSlice"
import { Login } from "./ui/Login"
import { FormInfo } from "features/Auth/ui/LoginForm/FormInfo/FormInfo"
import { LoginForm } from "./ui/LoginForm/LoginForm"
import { useLogin } from "./lib/useLogin"

const authReducer = authSlice.authReducer
const authAsyncActions = {
    ...authSlice.authActions,
    ...authSlice.authThunks,
}
export { authSelectors, authAsyncActions, authReducer, authAPI, InitialAuthState, Login, useLogin, FormInfo, LoginForm }
export * from "./api/authApi.types"
