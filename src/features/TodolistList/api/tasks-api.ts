import { instance } from "common/instanceApi"
import { ResponseType } from "common/types"
import { AxiosResponse } from "axios"
import {
    CreateTaskType,
    DeleteTaskType,
    GetTasksResponseType,
    TaskType,
    UpdateTaskModelType,
    UpdateTaskType,
} from "features/TodolistList/api/tasksApi.types"

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
