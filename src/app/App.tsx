import React, { useEffect } from "react"
import LinearProgress from "@mui/material/LinearProgress"
import { useActions, useAppSelector } from "common/hooks"
import { ErrorSnackbars, Preloader } from "common/components"
import { selectIsInitialized, selectIsLoadingStatus } from "app/selectors"
import { authActions } from "features/Auth"
import { ButtonAppBar } from "features/Header"
import { Routing } from "features/Routing"

type Props = {
    demo?: boolean
}

export function App({ demo = false }: Props) {
    const loadingStatus = useAppSelector(selectIsLoadingStatus)
    const isInitialized = useAppSelector(selectIsInitialized)
    const { getAuthMeData } = useActions(authActions)

    useEffect(() => {
        if (!demo) {
            getAuthMeData()
        }
    }, [])

    if (!isInitialized) {
        return <Preloader />
    }

    return (
        <div>
            <ButtonAppBar demo={demo} />

            {loadingStatus === "loading" && <LinearProgress color={"secondary"} />}

            <Routing demo={demo} />

            <ErrorSnackbars />
        </div>
    )
}
