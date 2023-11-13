import { appActions } from "app/app-reducer"
import { ResponseType } from "common/types"
import { AppThunkDispatch } from "common/hooks"

export const handleServerAppError = <T>(dispatch: AppThunkDispatch, data: ResponseType<T>): void => {
    const error = data.messages[0]
    if (error) {
        dispatch(appActions.setErrorMessage({ error }))
    } else {
        dispatch(appActions.setErrorMessage({ error: "Some error occurred" }))
    }
    dispatch(appActions.setLoadingStatus({ status: "failed" }))
}
