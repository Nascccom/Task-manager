import { appActions } from "app/appSlice"
import { ResponseType } from "common/types"
import { AppThunkDispatch } from "common/hooks"

export const handleServerAppError = <T>(
    dispatch: AppThunkDispatch,
    data: ResponseType<T>,
    isShowError: boolean = true,
): void => {
    const error = data.messages[0]
    if (error) {
        isShowError && dispatch(appActions.setErrorMessage({ error }))
    } else {
        isShowError && dispatch(appActions.setErrorMessage({ error: "Some error occurred" }))
    }
    dispatch(appActions.setLoadingStatus({ status: "failed" }))
}
