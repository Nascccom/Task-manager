import { appActions } from "app/app-reducer"
import { ResponseType, ResultCode } from "api/instance"
import { handleServerAppError } from "utils"
import { AppThunkDispatch } from "hooks"
import { InferThunkActionCreatorType } from "react-redux"

export const handleSuccessResponse = <D, S>(
    dispatch: AppThunkDispatch,
    actionCreator: InferThunkActionCreatorType<any>,
    serverResponse: ResponseType<S>,
    data: D,
) => {
    if (serverResponse.resultCode === ResultCode.SUCCESS) {
        dispatch(actionCreator(data))
        dispatch(appActions.setLoadingStatus({ status: "succeeded" }))
        return data
    } else {
        handleServerAppError(dispatch, serverResponse)
    }
}
