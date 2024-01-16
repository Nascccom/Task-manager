import { instance } from "common/instanceApi"
import { BaseResponse } from "common/types"
import { AxiosResponse } from "axios"
import { CreateTask, DeleteTask, GetTasksResponse, TaskType, UpdateTask, UpdateTaskModel } from "features/TodolistList"

export const tasksAPI = {
    async getTasks(todolistId: string) {
        const res = await instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
        return res.data
    },
    async createTask(args: CreateTask) {
        const res = await instance.post<
            BaseResponse<{ item: TaskType }>,
            AxiosResponse<BaseResponse<{ item: TaskType }>>,
            { title: string }
        >(`/todo-lists/${args.todolistId}/tasks`, { title: args.title })
        return res.data
    },
    async updateTask(args: UpdateTask) {
        const res = await instance.put<
            BaseResponse<{ item: TaskType }>,
            AxiosResponse<BaseResponse<{ item: TaskType }>>,
            UpdateTaskModel
        >(`/todo-lists/${args.todolistId}/tasks/${args.taskId}`, args.model)
        return res.data
    },
    async deleteTask(args: DeleteTask) {
        const res = await instance.delete<BaseResponse>(`/todo-lists/${args.todolistId}/tasks/${args.taskId}`)
        return res.data
    },
}
