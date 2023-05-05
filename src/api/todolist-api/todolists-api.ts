import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a8396d06-b83d-42f5-8590-6098fa5c66c4'
    }
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    updateTodolistTittle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    }
}

export type TodolistType = {
    id: string
    title: string,
    addedDate: string,
    order: number
}

type ResponseType <T = {}> = {
    resultCode: number
    messages: string[]
    data: T
    fieldsErrors: string[]
}