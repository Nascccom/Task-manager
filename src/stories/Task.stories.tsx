import { Task } from "features/TodolistList"
import { ReduxStoreProviderDecorator } from "stories"
import { TaskPriorities, TaskStatuses } from "common/enums"

export default {
    title: "FEATURES/Task",
    component: Task,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
}

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
            todoListId: "todolistId1",
            order: 0,
            addedDate: "",
        },
    },
}
export const TaskNotDone = {
    args: {
        task: {
            ...TaskIsDone.args.task,
            status: TaskStatuses.New,
        },
    },
}
