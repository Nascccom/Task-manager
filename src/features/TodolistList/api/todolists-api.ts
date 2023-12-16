import { AxiosResponse } from "axios"
import { instance } from "common/instanceApi"
import { BaseResponseType } from "common/types"
import { CreateTaskType, TodolistType } from "features/TodolistList"

export const todolistAPI = {
    async getTodolists() {
        const res = await instance.get<TodolistType[]>("todo-lists")
        return res.data
    },
    async createTodolist(title: string) {
        const res = await instance.post<BaseResponseType<{ item: TodolistType }>>("todo-lists", { title })
        return res.data
    },
    async updateTodolistTittle(args: CreateTaskType) {
        const res = await instance.put<BaseResponseType, AxiosResponse<BaseResponseType>>(
            `todo-lists/${args.todolistId}`,
            {
                title: args.title,
            },
        )
        return res.data
    },
    async deleteTodolist(todolistId: string) {
        const res = await instance.delete<BaseResponseType>(`todo-lists/${todolistId}`)
        return res.data
    },
}
