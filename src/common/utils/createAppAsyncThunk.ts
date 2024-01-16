import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppRootState } from "app/store"
import { AppThunkDispatch } from "common/hooks"
import { BaseResponse } from "common/types"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootState
    dispatch: AppThunkDispatch
    rejectValue: null | BaseResponse
}>()
