import { FilterTasksButtons } from "features/TodolistList"
import { ReduxStoreProviderDecorator } from "stories"
import type { Meta, StoryObj } from "@storybook/react"
import { TasksGroup } from "./../Tasks/Tasks.stories"

const meta: Meta<typeof FilterTasksButtons> = {
    title: "FEATURES/FilterTasksButtons",
    component: FilterTasksButtons,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
}
export default meta
type Story = StoryObj<typeof FilterTasksButtons>

export const FilterButtons: Story = {
    args: {
        ...TasksGroup.args,
    },
}
