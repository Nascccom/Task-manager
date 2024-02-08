import { Task } from "features/TodolistList"
import { ReduxStoreProviderDecorator } from "stories/index"
import { TaskPriorities, TaskStatuses } from "common/enums"
import type { Meta } from "@storybook/react"

const todolistId = "todolistId1"

const meta: Meta<typeof Task> = {
    title: "FEATURES/Task",
    component: Task,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
    args: {
        todolistId: todolistId,
        todoEntityStatus: "idle",
    },
}

export default meta

export const TaskIsDone = {
    args: {
        task: {
            id: "1",
            title: "HTML&CSS",
            completed: true,
            description: "I am task",
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Hi,
            startDate: "",
            deadline: "",
            todoListId: todolistId,
            order: 0,
            addedDate: "",
        },
    },
}

export const TaskNotDone = {
    args: {
        task: {
            ...TaskIsDone.args.task,
            id: "2",
            title: "Test for task is not done",
            status: TaskStatuses.InProgress,
        },
    },
}
