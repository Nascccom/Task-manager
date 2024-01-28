import { Todolist } from "features/TodolistList"
import { ReduxStoreProviderDecorator } from "stories/index"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof Todolist> = {
    title: "FEATURES/Todolist",
    component: Todolist,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
    excludeStories: /.*initialGlobalState$/,
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
            title: "New Todolist",
            addedDate: "",
        },
    },
}

export const TodolistInProcess: Story = {
    // args: { ...DefaultTodolist.args, todolist: { ...DefaultTodolist.args?.todolist, entityStatus: "loading" } },
}
//
// export const TodolistWithActiveTask: Story = {
//     args: { ...DefaultTodolist.args, activeFilter: "Active" },
// }
//
// export const TodolistWithCompletedTask: Story = {
//     args: { ...DefaultTodolist.args, activeFilter: "Completed" },
// }
