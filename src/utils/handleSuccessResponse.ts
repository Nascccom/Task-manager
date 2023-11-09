import { appActions } from "app/app-reducer"
import { ActionTypes } from "app/store"
import { ResponseType, ResultCode } from "api/instance"
import { handleServerAppError } from "./handleServerError"
import { AppThunkDispatch } from "hooks/useDiapstch/useDispacth"
import { ActionCreator } from "@reduxjs/toolkit"

export const handleSuccessResponse = <T, S>(
    dispatch: AppThunkDispatch,
    actionCreator: ActionCreator<ActionTypes>,
    serverResponse: ResponseType<S>,
    data: T,
) => {
    if (serverResponse.resultCode === ResultCode.SUCCESS) {
        dispatch(actionCreator(data))
        dispatch(appActions.setLoadingStatus({ status: "succeeded" }))
    } else {
        handleServerAppError(dispatch, serverResponse)
    }
}
