import {ActionTypes} from "../../app/store";
import {setIsInitializedAC, setLoadingStatusAC} from "../../app/app-reducer";
import {authAPI} from "../../api/auth-api";
import {AppThunkDispatch} from "../../hooks/useDiapstch/useDispacth";
import {ResultCode} from "../../api/instance";
import {handleServerAppError, handleServerNetworkError} from "../../utils/handleServerError";
import {deleteAllTodolistsWithTasksAC} from "../TodolistList/todolists-reducer";

const initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    rememberMe: false as boolean,
    isLoggedIn: false as boolean
}
export type initialAuthStateType = typeof initialState

export const authReducer = (state: initialAuthStateType = initialState, action: ActionTypes): initialAuthStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        case'AUTH/SET-AUTH-DATA':
            return {
                ...state,
                userId: action.userId,
                email: action.email,
                login: action.login
            }
        default:
            return state
    }
}
//Actions Creator
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({
    type: 'AUTH/SET-IS-LOGGED-IN',
    isLoggedIn
} as const)

export const setAuthDataAC = (userId: null | number, email: string | null, login: null | string) => ({
    type: 'AUTH/SET-AUTH-DATA',
    userId, email, login
} as const)


//Thunks Creator
export const getAuthMeDataTC = () =>
  (dispatch: AppThunkDispatch) => {
      dispatch(setLoadingStatusAC({status: 'loading'}))

      authAPI.getAuthMeData()
        .then(res => {
            if (res.resultCode === ResultCode.SUCCESS) {
                const {id, email, login} = res.data
                dispatch(setAuthDataAC(id, email, login))
                dispatch(setIsLoggedInAC(true))
                dispatch(setLoadingStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, res)
            }
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err)
        })
        .finally(() => {
            dispatch(setIsInitializedAC({value: true}))
        })
  }

export const loginTC = (email: string, password: string, rememberMe: boolean) =>
  (dispatch: AppThunkDispatch) => {
      dispatch(setLoadingStatusAC({status: 'loading'}))

      authAPI.login({email, password, rememberMe})
        .then(res => {
            if (res.resultCode === ResultCode.SUCCESS) {
                dispatch(getAuthMeDataTC())
            } else {
                handleServerAppError(dispatch, res)
            }
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err)
        })
  }

export const logoutTC = () =>
  (dispatch: AppThunkDispatch) => {
      dispatch(setLoadingStatusAC({status: 'loading'}))

      authAPI.logout()
        .then(res => {
            if (res.resultCode === ResultCode.SUCCESS) {
                dispatch(deleteAllTodolistsWithTasksAC())
                dispatch(setAuthDataAC(null, null, null))
                dispatch(setIsLoggedInAC(false))
                dispatch(setLoadingStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, res)
            }
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err)
        })
  }


export type LoginReducerActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setAuthDataAC>

