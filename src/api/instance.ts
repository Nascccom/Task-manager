import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'a8396d06-b83d-42f5-8590-6098fa5c66c4'
    }
})


export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
    fieldsErrors: string[]
}

export enum ResultCode {
    SUCCESS= 0,
    ERROR = 1,
    ERROR_CAPTCHA = 10
}