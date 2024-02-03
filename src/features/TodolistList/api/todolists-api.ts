import { AxiosResponse } from "axios"
import { instance } from "common/instanceApi"
import { BaseResponse } from "common/types"
import { CreateTask, TodolistType } from "features/TodolistList"

export const todolistAPI = {
    async getTodolists() {
        const res = await instance.get<TodolistType[]>("todo-lists")
        return res.data
    },
    async createTodolist(title: string) {
        const res = await instance.post<BaseResponse<{ item: TodolistType }>>("todo-lists", { title })
        return res.data
    },
    async updateTodolistTitle(args: CreateTask) {
        const res = await instance.put<BaseResponse, AxiosResponse<BaseResponse>>(`todo-lists/${args.todolistId}`, {
            title: args.title,
        })
        return res.data
    },
    async deleteTodolist(todolistId: string) {
        const res = await instance.delete<BaseResponse>(`todo-lists/${todolistId}`)
        return res.data
    },
}
