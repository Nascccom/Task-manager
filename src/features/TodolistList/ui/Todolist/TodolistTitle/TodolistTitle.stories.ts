import { TodolistTitle } from "features/TodolistList"
import { ReduxStoreProviderDecorator } from "stories"
import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof TodolistTitle> = {
    title: "FEATURES/TodolistTitle",
    component: TodolistTitle,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
}
export default meta
type Story = StoryObj<typeof TodolistTitle>

export const DefaultTitle: Story = {
    args: {
        todolistId: "todolistId",
        title: "Test title for Todolist",
        entityStatus: "idle",
    },
}
