export enum ResultCode {
    SUCCESS = 0,
    ERROR = 1,
    ERROR_CAPTCHA = 10,
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
    Deleted = 4,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}
