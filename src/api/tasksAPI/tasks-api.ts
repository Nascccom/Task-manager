import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '1cdd9f77-c60e-4af5-xxx-xxxxxxx'
    }
})

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TasksType}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTaskTittle(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{item: TasksType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}


type TasksType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type ResponseType <T = {}> = {
    resultCode: number
    messages: string[]
    data: T
    fieldsErrors: string[]
}

type GetTasksResponseType = {
    items: TasksType[]
    totalCount: number
    error: null | string
}