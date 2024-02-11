import { TodolistList } from "features/TodolistList"
import { ReduxStoreProviderDecorator } from "stories"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof TodolistList> = {
    title: "FEATURES/TodolistList",
    component: TodolistList,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
}
export default meta
type Story = StoryObj<typeof TodolistList>

export const DefaultTodolistsList: Story = {}
