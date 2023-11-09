import { setErrorMessageAC, setLoadingStatusAC } from "../app/app-reducer"
import { Dispatch } from "redux"
import { ResponseType } from "../api/instance"

export const handleServerAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    const error = data.messages[0]
    if (error) {
        dispatch(setErrorMessageAC({ error }))
    } else {
        dispatch(setErrorMessageAC({ error: "Some error occurred" }))
    }
    dispatch(setLoadingStatusAC({ status: "failed" }))
}

export const handleServerNetworkError = (dispatch: Dispatch, error: string) => {
    dispatch(setErrorMessageAC({ error }))
    dispatch(setLoadingStatusAC({ status: "failed" }))
}
