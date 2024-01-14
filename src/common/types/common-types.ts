export type BaseResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
    fieldsErrors: FieldErrorType[]
}

type FieldErrorType = {
    error: string
    field: string
}
