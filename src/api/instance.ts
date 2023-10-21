import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': "370f3f78-fcc4-4551-bcb5-1ddedb3f99b8"
    }
})


export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
    fieldsErrors: string[]
}

export enum ResultCode {
    SUCCESS = 0,
    ERROR = 1,
    ERROR_CAPTCHA = 10
}