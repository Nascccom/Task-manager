import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { AppDispatch, AppRootStateType } from "app/store"

export type BaseResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
    fieldsErrors: FieldErrorType[]
}

type FieldErrorType = {
    error: string
    field: string
}

export type ThunkApiType = BaseThunkAPI<AppRootStateType, unknown, AppDispatch, BaseResponseType | null>
