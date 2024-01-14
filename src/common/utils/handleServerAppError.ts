import { appActions } from "app/appSlice"
import { BaseResponseType, ThunkApiType } from "common/types"

/**
 * Handles server application errors, dispatches actions to update the application state,
 * and returns a rejected Promise with the provided value (null by default).
 *
 * @template T - The type of data in the response.
 * @param {BaseResponseType<T>} data - The response data containing error messages.
 * @param {ThunkApiType} thunkAPI - The Redux Thunk API object.
 * @param {boolean} [isShowError=true] - A flag indicating whether to display the error message (default: true).
 * @returns {ReturnType<ThunkApiType["rejectWithValue"]>} - A rejected Promise with the provided value.
 */

// export const handleServerAppError = <T>(
//     dispatch: AppThunkDispatch,
//     data: BaseResponseType<T>,
//     isShowError: boolean = true,
// ): void => {
//     if (isShowError) {
//         const error = data.messages[0]
//         dispatch(appActions.setErrorMessage({ error: error ? error : "Some error occurred" }))
//     }
//
//     dispatch(appActions.setLoadingStatus({ status: "failed" }))
// }

export const handleServerAppError = <T>(
    data: BaseResponseType<T>,
    thunkAPI: ThunkApiType,
    isShowError: boolean = true,
): ReturnType<ThunkApiType["rejectWithValue"]> => {
    if (isShowError) {
        const error = data.messages[0]
        thunkAPI.dispatch(appActions.setErrorMessage({ error: error ? error : "Some error occurred" }))
    }

    thunkAPI.dispatch(appActions.setLoadingStatus({ status: "failed" }))
    return thunkAPI.rejectWithValue(null)
}
