import { appActions } from "app/appSlice"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { AppDispatch, AppRootStateType } from "app/store"
import { BaseResponseType } from "common/types"

/**
 * A utility function that wraps asynchronous logic in a Redux Thunk pattern
 * with try-catch error handling and loading status management.
 *
 * @template T - The type of the result of the asynchronous logic.
 *
 * @param {BaseThunkAPI<AppRootStateType, unknown, AppDispatch, BaseResponseType | null>} thunkAPI
 *     The Redux Thunk API object providing dispatch and rejectWithValue functions.
 * @param {() => Promise<T>} logic
 *     The asynchronous logic to be executed within the try-catch block.
 *
 * @returns {Promise<T | ReturnType<typeof thunkAPI .rejectWithValue>>}
 *     A Promise resolving to the result of the asynchronous logic or a rejection value
 *     with the type specified by thunkAPI.rejectWithValue.
 *
 * @throws {Error} If an error occurs during the execution of the asynchronous logic.
 *
 * @example
 * // Usage within a Redux Thunk
 * const myThunk = createAsyncThunk(
 *   'mySlice/myAsyncFunction',
 *   async (_, thunkAPI) => {
 *     const result = await thunkTryCatch(thunkAPI, async () => {
 *       // Asynchronous logic here
 *       return someResult;
 *     });
 *     return result;
 *   }
 * );
 */

export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, BaseResponseType | null>,
    logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(appActions.setLoadingStatus({ status: "loading" }))
    try {
        return await logic()
    } catch (err: any) {
        handleServerNetworkError(dispatch, err.message)
        return rejectWithValue(null)
    } finally {
        dispatch(appActions.setLoadingStatus({ status: "idle" }))
    }
}
