import type { Meta, StoryObj } from "@storybook/react"
import { ReduxStoreProviderDecorator } from "stories"
import { AppWithRedux } from "app/AppWithRedux"
import React from "react"
import CircularProgress from "@mui/material/CircularProgress"
import { ButtonAppBar } from "features/ButtonAppBar/ButtonAppBar"
import LinearProgress from "@mui/material/LinearProgress"
import Container from "@mui/material/Container"
import { Navigate, Route, Routes } from "react-router-dom"
import { TodolistList } from "features/TodolistList/ui/TodolistList"
import { Login } from "features/Auth/ui/Login"
import { ErrorSnackbars } from "common/components"
import { RequestStatusType } from "app/appSlice"

const meta: Meta<typeof AppWithRedux> = {
    title: "APP/App",
    component: AppWithRedux,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof AppWithRedux>

type PropsType = {
    demo?: boolean
    isLoadingStatus: RequestStatusType
    isInitialized: boolean
}

export const Default: Story = {
    args: {
        demo: true,
    },
}

export const AppLoading = ({ demo = false, isLoadingStatus = "idle", isInitialized = false }: PropsType) => {
    if (!isInitialized) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: "30%",
                    textAlign: "center",
                    width: "99%",
                }}>
                <CircularProgress color='secondary' size={150} thickness={3} />
            </div>
        )
    }

    return (
        <div>
            <ButtonAppBar demo={demo} />

            {isLoadingStatus === "loading" && <LinearProgress color={"secondary"} />}

            <Container fixed>
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

export const AppWithLinearProgress = {
    render: () => <AppLoading isLoadingStatus={"loading"} isInitialized={true} />,
}
