import { appActions } from "app/appSlice"
import { ResponseType } from "common/types"
import { handleServerAppError } from "common/utils"
import { AppThunkDispatch } from "common/hooks"
import { InferThunkActionCreatorType } from "react-redux"
import { ResultCode } from "common/enums"

export const handleSuccessResponse = <D, S>(
    dispatch: AppThunkDispatch,
    actionCreator: InferThunkActionCreatorType<any>,
    serverResponse: ResponseType<S>,
    data: D,
) => {
    if (serverResponse.resultCode === ResultCode.SUCCESS) {
        dispatch(actionCreator(data))
        dispatch(appActions.setLoadingStatus({ status: "succeeded" }))
    } else {
        handleServerAppError(dispatch, serverResponse)
    }
}
