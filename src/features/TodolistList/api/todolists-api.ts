import { AxiosResponse } from "axios"
import { instance } from "common/instanceApi"
import { ResponseType } from "common/types"
import { TodolistType } from "features/TodolistList/api/todolistsApi.types"

export const todolistAPI = {
    async getTodolists() {
        const res = await instance.get<TodolistType[]>("todo-lists")
        return res.data
    },
    async createTodolist(title: string) {
        const res = await instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", { title })
        return res.data
    },
    async updateTodolistTittle(todolistId: string, title: string) {
        const res = await instance.put<ResponseType, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`, { title })
        return res.data
    },
    async deleteTodolist(todolistId: string) {
        const res = await instance.delete<ResponseType>(`todo-lists/${todolistId}`)
        return res.data
    },
}
