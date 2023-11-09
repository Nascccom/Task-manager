import { instance, ResponseType } from "./instance"
import { AxiosResponse } from "axios"

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists").then((res) => res.data)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", { title }).then((res) => res.data)
    },
    updateTodolistTittle(todolistId: string, title: string) {
        return instance
            .put<ResponseType, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`, { title })
            .then((res) => res.data)
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`).then((res) => res.data)
    },
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
