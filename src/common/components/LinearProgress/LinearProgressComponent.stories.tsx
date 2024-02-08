import { Meta } from "@storybook/react"
import { LinearProgressComponent } from "common/components"
import { ReduxStoreProviderDecorator } from "stories"
import LinearProgress from "@mui/material/LinearProgress"
import React from "react"
import { RequestStatus } from "app/appSlice"

const meta: Meta<typeof LinearProgressComponent> = {
    title: "COMMON/LinearProgressComponent",
    component: LinearProgressComponent,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
}
export default meta

export const Default = () => {
    const loadingStatus: RequestStatus = "loading"

    return loadingStatus && <LinearProgress color={"secondary"} />
}
