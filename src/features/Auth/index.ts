import * as authSelectors from "features/Auth/model/selectors"
import * as authSlice from "features/Auth/model/authSlice"
import { authAPI } from "./api/auth-api"
import type { InitialAuthState } from "./model/authSlice"
import { Login } from "./ui/Login"
import { FormInfo } from "features/Auth/ui/LoginForm/FormInfo/FormInfo"
import { LoginForm, LoginFormInitialValues } from "./ui/LoginForm/LoginForm"
import { validationSchema } from "./lib/validationSchema"

const authReducer = authSlice.authReducer
const authAsyncActions = {
    ...authSlice.authActions,
    ...authSlice.authThunks,
}
export {
    authSelectors,
    authAsyncActions,
    authReducer,
    authAPI,
    InitialAuthState,
    Login,
    FormInfo,
    LoginForm,
    validationSchema,
    LoginFormInitialValues,
}
export * from "./api/authApi.types"
