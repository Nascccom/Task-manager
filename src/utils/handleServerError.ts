import { appActions } from "app/app-reducer"
import { ResponseType } from "api/instance"
import { AppThunkDispatch } from "hooks/useDiapstch/useDispacth"

export const handleServerAppError = <T>(dispatch: AppThunkDispatch, data: ResponseType<T>) => {
    const error = data.messages[0]
    if (error) {
        dispatch(appActions.setErrorMessage({ error }))
    } else {
        dispatch(appActions.setErrorMessage({ error: "Some error occurred" }))
    }
    dispatch(appActions.setLoadingStatus({ status: "failed" }))
}

export const handleServerNetworkError = (dispatch: AppThunkDispatch, error: string) => {
    dispatch(appActions.setErrorMessage({ error }))
    dispatch(appActions.setLoadingStatus({ status: "failed" }))
}
