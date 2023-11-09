import {setIsInitializedAC, setLoadingStatusAC} from "../../app/app-reducer";
import {authAPI} from "../../api/auth-api";
import {AppThunkDispatch} from "../../hooks/useDiapstch/useDispacth";
import {ResultCode} from "../../api/instance";
import {handleServerAppError, handleServerNetworkError} from "../../utils/handleServerError";
import {deleteAllTodolistsWithTasksAC, getTodolistsTC} from "../TodolistList/todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    rememberMe: false as boolean,
    isLoggedIn: false as boolean
}
export type initialAuthStateType = typeof initialState

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedInAC: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isLoggedIn = action.payload.value
        },
        setAuthDataAC: (state, action: PayloadAction<{ userId: null | number, email: string | null, login: null | string }>) => {
            state.userId = action.payload.userId
            state.email = action.payload.email
            state.login = action.payload.login
        }
    }
})
export const {
    setIsLoggedInAC,
    setAuthDataAC
} = authSlice.actions
export const authReducer = authSlice.reducer


//Thunks Creator
export const getAuthMeDataTC = () =>
  (dispatch: AppThunkDispatch) => {
      dispatch(setLoadingStatusAC({status: 'loading'}))

      authAPI.getAuthMeData()
        .then(res => {
            if (res.resultCode === ResultCode.SUCCESS) {
                const {id, email, login} = res.data
                dispatch(setAuthDataAC({userId: id, email, login}))
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setLoadingStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(dispatch, res)
            }
        })
        .then(() => {
            dispatch(getTodolistsTC())
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
                dispatch(setAuthDataAC({userId: null, email: null, login: null}))
                dispatch(setIsLoggedInAC({value: false}))
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

