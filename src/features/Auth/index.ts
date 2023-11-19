import * as authSelectors from "features/Auth//model/selectors"
import * as authSlice from "features/Auth//model/authSlice"
import * as authActionsAC from "features/Auth/model/authActions"
import { authAPI } from "./api/auth-api"

const authReducer = authSlice.authReducer
const authActions = {
    ...authActionsAC,
    ...authSlice.authActions,
}
export { authSelectors, authReducer, authActions, authAPI }

export type { AuthMeType } from "./api/authApi.types"
export type { InitialAuthStateType } from "./model/authSlice"

export { Login } from "./ui/Login"
