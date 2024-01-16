export type AuthMe = {
    id: number
    email: string
    login: string
}

export type AuthParams = {
    userId: number | null
    email: string | null
    login: string | null
}

export type LoginParams = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
