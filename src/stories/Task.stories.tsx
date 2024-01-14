import { Task } from "features/TodolistList"
import { ReduxStoreProviderDecorator } from "stories"
import { TaskPriorities, TaskStatuses } from "common/enums"
import React from "react"

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
            title: "React",
            status: TaskStatuses.New,
        },
    },
}

export const TasksGroup = () => {
    return (
        <>
            <Task task={TaskIsDone.args.task} todolistId={TaskIsDone.args.task.todoListId} todoEntityStatus={"idle"} />
            <Task
                task={TaskNotDone.args.task}
                todolistId={TaskNotDone.args.task.todoListId}
                todoEntityStatus={"idle"}
            />
        </>
    )
}
