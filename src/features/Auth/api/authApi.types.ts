export type AuthMe = {
    id: number
    email: string
    login: string
}

export type LoginParams = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
