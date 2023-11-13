import { AppThunkDispatch } from "hooks"
import axios from "axios"
import { appActions } from "app/app-reducer"

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
