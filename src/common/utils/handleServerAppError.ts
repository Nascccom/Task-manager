import { appActions } from "app/appSlice"
import { BaseResponseType } from "common/types"
import { AppThunkDispatch } from "common/hooks"

/**
 * Handles server application errors and updates the application state accordingly.
 *
 * @template T - The type of data expected in the server response.
 * @param {AppThunkDispatch} dispatch - The Redux dispatch function with AppThunkDispatch type.
 * @param {BaseResponseType<T>} data - The server response data containing error messages and other information.
 * @param {boolean} [isShowError=true] - A flag indicating whether to display the error message. Default is true.
 * @returns {void}
 *
 * @example
 * // Usage example
 * handleServerAppError(dispatch, responseData);
 */

export const handleServerAppError = <T>(
    dispatch: AppThunkDispatch,
    data: BaseResponseType<T>,
    isShowError: boolean = true,
): void => {
    if (isShowError) {
        const error = data.messages[0]
        dispatch(appActions.setErrorMessage({ error: error ? error : "Some error occurred" }))
    }

    dispatch(appActions.setLoadingStatus({ status: "failed" }))
}
