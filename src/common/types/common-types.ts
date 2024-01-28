import { OverridableStringUnion } from "@mui/types"
import { IconButtonPropsSizeOverrides } from "@mui/material/IconButton/IconButton"

export type BaseResponse<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
    fieldsErrors: FieldError[]
}

type FieldError = {
    error: string
    field: string
}

export type SizeIconButton = OverridableStringUnion<"small" | "medium" | "large", IconButtonPropsSizeOverrides>
