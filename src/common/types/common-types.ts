import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { AppDispatch, AppRootState } from "app/store"

export type BaseResponse<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
    fieldsErrors: FieldError[]
}

type FieldError = {
    error: string
    field: string
}

export type ThunkApiType = BaseThunkAPI<AppRootState, unknown, AppDispatch, BaseResponse | null>
