import type { Meta, StoryObj } from "@storybook/react"
import { ReduxStoreProviderDecorator } from "stories"
import { App } from "app/App"
import React from "react"
import { ButtonAppBar } from "features/ButtonAppBar/ui/ButtonAppBar"
import LinearProgress from "@mui/material/LinearProgress"
import Container from "@mui/material/Container"
import { Navigate, Route, Routes } from "react-router-dom"
import { TodolistList } from "features/TodolistList/ui/TodolistList"
import { Login } from "features/Auth/ui/Login"
import { ErrorSnackbars } from "common/components"
import { RequestStatus } from "app/appSlice"

const meta: Meta<typeof App> = {
    title: "APP/App",
    component: App,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof App>

type Props = {
    demo?: boolean
    isLoadingStatus: RequestStatus
}

export const Default: Story = {
    args: {
        demo: true,
    },
}

export const AppLoading = ({ demo = false, isLoadingStatus = "loading" }: Props) => {
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
