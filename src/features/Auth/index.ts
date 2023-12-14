import * as authSelectors from "features/Auth//model/selectors"
import * as authSlice from "features/Auth//model/authSlice"
import { authAPI } from "./api/auth-api"
import type { AuthMeType, AuthParamsType, LoginParamsType } from "./api/authApi.types"
import type { InitialAuthStateType } from "./model/authSlice"
import { Login } from "./ui/Login"

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
    AuthMeType,
    AuthParamsType,
    LoginParamsType,
    InitialAuthStateType,
    Login,
}