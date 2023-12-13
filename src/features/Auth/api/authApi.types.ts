export type AuthMeType = {
    id: number
    email: string
    login: string
}

export type AuthParamsType = {
    userId: number | null
    email: string | null
    login: string | null
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
}
