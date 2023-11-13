import { useDispatch } from "react-redux"
import { AppRootStateType } from "app/store"
import { ThunkDispatch } from "redux-thunk"
import { AnyAction } from "@reduxjs/toolkit"

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
