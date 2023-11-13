import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppRootStateType } from "app/store"
import { AppThunkDispatch } from "hooks/useDiapstch/useDispacth"

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppThunkDispatch
    rejectValue: null
}>()
