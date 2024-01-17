import React, { useEffect } from "react"
import Container from "@mui/material/Container"
import LinearProgress from "@mui/material/LinearProgress"
import { TodolistList } from "features/TodolistList"
import { useActions, useAppSelector } from "common/hooks"
import { ErrorSnackbars } from "common/components"
import { Navigate, Route, Routes } from "react-router-dom"
import { selectIsInitialized, selectIsLoadingStatus } from "app/selectors"
import { authActions, Login } from "features/Auth"
import { ButtonAppBar } from "features/ButtonAppBar"
import { Preloader } from "common/components"

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

            <Container fixed maxWidth={false}>
                <Routes>
                    <Route path={"/"} element={<TodolistList demo={demo} />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>} />
                    <Route path={"*"} element={<Navigate to={"/404"} />} />
                </Routes>
            </Container>

            <ErrorSnackbars />
        </div>
    )
}
