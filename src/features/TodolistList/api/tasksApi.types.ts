import { TaskPriorities, TaskStatuses } from "common/enums"

export type CreateTask = {
    todolistId: string
    title: string
}
export type UpdateTask = DeleteTask & { model: UpdateTaskModel }

export type DeleteTask = {
    todolistId: string
    taskId: string
}
export type GetTasksResponse = {
    items: TaskType[]
    totalCount: number
    error: null | string
}
export type TaskType = {
    description: string | null
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModel = {
    title: string
    description: string | null
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
}
