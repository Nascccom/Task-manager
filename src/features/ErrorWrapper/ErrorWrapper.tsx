import React from "react"
import { ErrorSnackbars } from "common/components"
import { useActions, useAppSelector } from "common/hooks"
import { appAsyncActions } from "app/appSlice"

export const ErrorWrapper = () => {
    const error = useAppSelector<string | null>((state) => state.app.error)
    const { setErrorMessage } = useActions(appAsyncActions)

    return <ErrorSnackbars error={error} setErrorMessage={setErrorMessage} />
}
