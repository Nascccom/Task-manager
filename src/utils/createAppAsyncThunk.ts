import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppRootStateType } from "app/store"
import { AppThunkDispatch } from "hooks"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppThunkDispatch
    rejectValue: null
}>()
