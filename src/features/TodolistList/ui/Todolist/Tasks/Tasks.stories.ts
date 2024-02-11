import { Tasks } from "features/TodolistList"
import { ReduxStoreProviderDecorator } from "stories"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Tasks> = {
    title: "FEATURES/Tasks",
    component: Tasks,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
}
export default meta
type Story = StoryObj<typeof Tasks>

export const TasksGroup: Story = {
    args: {
        todolistId: "todolistId1",
        activeFilter: "All",
    },
}
