import { useDispatch } from "react-redux"
import { AppRootStateType } from "app/store"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
