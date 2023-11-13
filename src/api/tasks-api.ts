import { instance, ResponseType } from "./instance"
import { AxiosResponse } from "axios"

export const tasksAPI = {
    async getTasks(todolistId: string) {
        const res = await instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
        return res.data
    },
    async createTask(args: CreateTaskType) {
        const res = await instance.post<
            ResponseType<{ item: TaskType }>,
            AxiosResponse<ResponseType<{ item: TaskType }>>,
            { title: string }
        >(`/todo-lists/${args.todolistId}/tasks`, { title: args.title })
        return res.data
    },
    async updateTask(args: UpdateTaskType) {
        const res = await instance.put<
            ResponseType<{ item: TaskType }>,
            AxiosResponse<ResponseType<{ item: TaskType }>>,
            UpdateTaskModelType
        >(`/todo-lists/${args.todolistId}/tasks/${args.taskId}`, args.model)
        return res.data
    },
    async deleteTask(args: DeleteTaskType) {
        const res = await instance.delete<ResponseType>(`/todo-lists/${args.todolistId}/tasks/${args.taskId}`)
        return res.data
    },
}

export type CreateTaskType = {
    todolistId: string
    title: string
}
export type UpdateTaskType = DeleteTaskType & { model: UpdateTaskModelType }

export type DeleteTaskType = {
    todolistId: string
    taskId: string
}
type GetTasksResponseType = {
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

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
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
