import { appActions } from "app/appSlice"
import { BaseResponse, ThunkApiType } from "common/types"

/**
 * Handles server application errors, dispatches actions to update the application state,
 * and returns a rejected Promise with the provided value (null by default).
 *
 * @template T - The type of data in the response.
 * @param {BaseResponse<T>} data - The response data containing error messages.
 * @param {ThunkApiType} thunkAPI - The Redux Thunk API object.
 * @param {boolean} [isShowError=true] - A flag indicating whether to display the error message (default: true).
 * @returns {ReturnType<ThunkApiType["rejectWithValue"]>} - A rejected Promise with the provided value.
 */

export const handleServerAppError = <T>(
    data: BaseResponse<T>,
    thunkAPI: ThunkApiType,
    isShowError: boolean = true,
): ReturnType<typeof thunkAPI.rejectWithValue> => {
    if (isShowError) {
        const error = data.messages[0]
        thunkAPI.dispatch(appActions.setErrorMessage({ error: error ? error : "Some error occurred" }))
    }

    return thunkAPI.rejectWithValue(null)
}
