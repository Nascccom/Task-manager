import { appActions } from "app/app-reducer"
import { ResponseType } from "api/instance"
import { AppThunkDispatch } from "hooks/useDiapstch/useDispacth"
import axios from "axios"

export const handleServerAppError = <T>(dispatch: AppThunkDispatch, data: ResponseType<T>) => {
    const error = data.messages[0]
    if (error) {
        dispatch(appActions.setErrorMessage({ error }))
    } else {
        dispatch(appActions.setErrorMessage({ error: "Some error occurred" }))
    }
    dispatch(appActions.setLoadingStatus({ status: "failed" }))
}

export const handleServerNetworkError = (dispatch: AppThunkDispatch, error: unknown): void => {
    let errorMessage = "Some error occurred"

    if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error?.message || errorMessage
    } else if (error instanceof Error) {
        errorMessage = `Native error: ${error.message}`
    } else {
        errorMessage = JSON.stringify(error)
    }

    dispatch(appActions.setErrorMessage({ error: errorMessage }))
    dispatch(appActions.setLoadingStatus({ status: "failed" }))
}
