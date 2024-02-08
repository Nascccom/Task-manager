import { Todolist } from "features/TodolistList"
import { ReduxStoreProviderDecorator } from "stories"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Todolist> = {
    title: "FEATURES/Todolist",
    component: Todolist,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
}
export default meta
type Story = StoryObj<typeof Todolist>

export const DefaultTodolist: Story = {
    args: {
        todolist: {
            id: "todolistId1",
            filter: "All",
            entityStatus: "idle",
            order: 0,
            title: "Todolist 1.0",
            addedDate: "",
        },
    },
}

export const TodolistDuringRemovalProcess: Story = {
    args: {
        ...DefaultTodolist.args,
        todolist: {
            id: "todolistId2",
            filter: "All",
            entityStatus: "loading",
            order: 0,
            title: "Todolist 2.0",
            addedDate: "",
        },
    },
}
