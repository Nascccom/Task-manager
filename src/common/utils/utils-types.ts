import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { AppDispatch, AppRootStateType } from "app/store"
import { BaseResponseType } from "common/types"

export type ThunkApiType = BaseThunkAPI<AppRootStateType, unknown, AppDispatch, BaseResponseType | null>
