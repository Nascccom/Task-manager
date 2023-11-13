import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppRootStateType } from "app/store"
import { AppThunkDispatch } from "common/hooks"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppThunkDispatch
    rejectValue: null
}>()
