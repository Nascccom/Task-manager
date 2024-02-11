import React, { useEffect } from "react"
import { useActions, useAppSelector } from "common/hooks"
import { LinearProgressComponent, Preloader } from "common/components"
import { selectIsInitialized } from "app/selectors"
import { authAsyncActions } from "features/Auth"
import { Header } from "features/Header"
import { Routing } from "features/Routing"
import { ErrorWrapper } from "features/ErrorWrapper"

type Props = {
    demo?: boolean
}

export function App({ demo = false }: Props) {
    const isInitialized = useAppSelector(selectIsInitialized)
    const { getAuthMeData } = useActions(authAsyncActions)

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
            <Header demo={demo} />

            <LinearProgressComponent />

            <Routing demo={demo} />

            <ErrorWrapper />
        </div>
    )
}
