import React, { useEffect } from "react"
import "./App.css"
import { ButtonAppBar } from "features/ButtonAppBar/ButtonAppBar"
import Container from "@mui/material/Container"
import { TodolistList } from "features/TodolistList/TodolistList"
import LinearProgress from "@mui/material/LinearProgress"
import { selectIsInitialized, selectIsLoadingStatus, useAppDispatch, useAppSelector } from "hooks"
import { ErrorSnackbars } from "components"
import { Login } from "features/Login/Login"
import { Navigate, Route, Routes } from "react-router-dom"
import { getAuthMeDataTC } from "features/Login/auth-reducer"
import CircularProgress from "@mui/material/CircularProgress"

type PropsType = {
    demo?: boolean
}

export function AppWithRedux({ demo = false }: PropsType) {
    const isLoadingStatus = useAppSelector(selectIsLoadingStatus)
    const isInitialized = useAppSelector(selectIsInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!demo) {
            dispatch(getAuthMeDataTC())
        }
    }, [dispatch])

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
            <ButtonAppBar />

            {isLoadingStatus === "loading" && <LinearProgress color={"secondary"} />}

            <Container fixed maxWidth={false}>
                <Routes>
                    <Route path={"/"} element={<TodolistList />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>} />
                    <Route path={"*"} element={<Navigate to={"/404"} />} />
                </Routes>
            </Container>

            <ErrorSnackbars />
        </div>
    )
}
