import { TaskPriorities, TaskStatuses } from "common/enums"

export type CreateTaskType = {
    todolistId: string
    title: string
}
export type UpdateTaskType = DeleteTaskType & { model: UpdateTaskModelType }

export type DeleteTaskType = {
    todolistId: string
    taskId: string
}
export type GetTasksResponseType = {
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

export type UpdateTaskModelType = {
    title: string
    description: string | null
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string | null
    deadline: string | null
}
