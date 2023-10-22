import {ActionTypes} from "../../app/store";
import {setErrorMessageAC, setLoadingStatusAC} from "../../app/app-reducer";
import {authAPI} from "../../api/auth-api/auth-api";
import {AppThunkDispatch} from "../../hooks/useDiapstch/useDispacth";
import {ResultCode} from "../../api/instance";

const initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    rememberMe: false as boolean,
    isAuth: false as boolean
}
export type initialLoginStateType = typeof initialState

export const authReducer = (state: initialLoginStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case 'AUTH/SET-AUTH-ME-DATA':
            return {
                ...state,
                userId: action.userId,
                email: action.email,
                rememberMe: action.rememberMe,
                login: action.login,
                isAuth: action.isAuth
            }
        default:
            return state
    }
}
//Actions Creator
export const setAuthMeDataAC =
  (userId: number | null, email: string | null, login: string | null, rememberMe: boolean, isAuth: boolean) => ({
      type: 'AUTH/SET-AUTH-ME-DATA',
      userId,
      email,
      rememberMe,
      login,
      isAuth
  }) as const


//Thunks Creator
export const getAuthMeDataTC = () =>
  (dispatch: AppThunkDispatch) => {
      dispatch(setLoadingStatusAC('loading'))

      authAPI.getAuthMeData()
        .then(res => {
            dispatch(setAuthMeDataAC(res.data.id, res.data.email, res.data.login, false, true))
            dispatch(setLoadingStatusAC('succeeded'))
        })
        .catch(err => {
            dispatch(setErrorMessageAC(err))
            dispatch(setLoadingStatusAC('failed'))
        })
  }

export const loginTC = (email: string, password: string, rememberMe: boolean) =>
  (dispatch: AppThunkDispatch) => {
      dispatch(setLoadingStatusAC('loading'))

      authAPI.login(email, password, rememberMe)
        .then(res => {
            dispatch(getAuthMeDataTC())
        })
        .catch(err => {
            dispatch(setLoadingStatusAC('failed'))
        })
  }

export const logoutTC = () =>
  (dispatch: AppThunkDispatch) => {
      dispatch(setLoadingStatusAC('loading'))

      authAPI.logout()
        .then(res => {
            if (res.resultCode === ResultCode.SUCCESS) {
                dispatch(setAuthMeDataAC(null, null, null, false, false))
                dispatch(setLoadingStatusAC('succeeded'))
            } else {

            }
        })
        .catch(err => {
            dispatch(setLoadingStatusAC('failed'))
        })
  }


export type LoginReducerActionsType =
  | ReturnType<typeof setAuthMeDataAC>

