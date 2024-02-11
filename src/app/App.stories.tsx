import type { Meta, StoryObj } from "@storybook/react"
import { ReduxStoreProviderDecorator } from "stories/index"
import React from "react"
import { Header } from "features/Header"
import LinearProgress from "@mui/material/LinearProgress"
import { App } from "app/App"
import { RequestStatus } from "app/appSlice"
import { Routing } from "features/Routing"
import { ErrorWrapper } from "features/ErrorWrapper"

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
            <Header demo={demo} />
            {isLoadingStatus === "loading" && <LinearProgress color={"secondary"} />}
            <Routing demo={demo} />
            <ErrorWrapper />
        </div>
    )
}
