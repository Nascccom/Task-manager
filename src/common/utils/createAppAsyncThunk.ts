import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppRootStateType } from "app/store"
import { AppThunkDispatch } from "common/hooks"
import { BaseResponseType } from "common/types"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppThunkDispatch
    rejectValue: null | BaseResponseType
}>()
