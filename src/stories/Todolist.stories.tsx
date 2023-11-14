import { Todolist } from "features/TodolistList/ui/Todolist/ToDoList"
import { ReduxStoreProviderDecorator } from "stories/ReduxStoreProviderDecorator/ReduxStoreProviderDecorator"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Todolist> = {
    title: "TODOLISTS/Todolist",
    component: Todolist,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
    excludeStories: /.*initialGlobalState$/,
}
export default meta
type Story = StoryObj<typeof Todolist>

export const DefaultTodolist: Story = {
    args: {
        todolistId: "todolistId1",
        title: "New Todolist",
        entityStatus: "idle",
        activeFilter: "All",
    },
}

export const TodolistInProcess: Story = {
    args: { ...DefaultTodolist.args, entityStatus: "loading" },
}

export const TodolistWithActiveTask: Story = {
    args: { ...DefaultTodolist.args, activeFilter: "Active" },
}

export const TodolistWithCompletedTask: Story = {
    args: { ...DefaultTodolist.args, activeFilter: "Completed" },
}
