import { useDispatch } from "react-redux"
import { AppRootState } from "app/store"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"

export type AppThunkDispatch = ThunkDispatch<AppRootState, any, AnyAction>

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
