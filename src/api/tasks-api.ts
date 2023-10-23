import {instance, ResponseType} from "./instance";
import {AxiosResponse} from "axios";

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType,
          AxiosResponse<GetTasksResponseType>>
        (`/todo-lists/${todolistId}/tasks`)
          .then(res => res.data)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>,
          AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>
        (`/todo-lists/${todolistId}/tasks`, {title})
          .then(res => res.data)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>,
          AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>
        (`/todo-lists/${todolistId}/tasks/${taskId}`, model)
          .then(res => res.data)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType,
          AxiosResponse<ResponseType>>
        (`/todo-lists/${todolistId}/tasks/${taskId}`)
          .then(res => res.data)
    }
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
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
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



