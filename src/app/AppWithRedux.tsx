import React, { useEffect } from "react"
import "./App.css"
import Container from "@mui/material/Container"
import CircularProgress from "@mui/material/CircularProgress"
import LinearProgress from "@mui/material/LinearProgress"
import { TodolistList } from "features/TodolistList"
import { useActions, useAppSelector } from "common/hooks"
import { ErrorSnackbars } from "common/components"
import { Navigate, Route, Routes } from "react-router-dom"
import { selectIsInitialized, selectIsLoadingStatus } from "app/selectors"
import { authActions, Login } from "features/Auth"
import { ButtonAppBar } from "features/ButtonAppBar"

type PropsType = {
    demo?: boolean
}

export function AppWithRedux({ demo = false }: PropsType) {
    const isLoadingStatus = useAppSelector(selectIsLoadingStatus)
    const isInitialized = useAppSelector(selectIsInitialized)
    const { getAuthMeData } = useActions(authActions)

    useEffect(() => {
        if (!demo) {
            getAuthMeData()
        }
    }, [])

    if (!isInitialized) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: "30%",
                    textAlign: "center",
                    width: "100%",
                }}>
                <CircularProgress color='secondary' size={150} thickness={3} />
            </div>
        )
    }

    return (
        <div className='App'>
            <ButtonAppBar demo={demo} />

            {isLoadingStatus === "loading" && <LinearProgress color={"secondary"} />}

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
