import React, { FC, memo, useCallback } from "react"
import Button, { ButtonPropsColorOverrides } from "@mui/material/Button"
import { OverridableStringUnion } from "@mui/types"

export type ColorsType = OverridableStringUnion<
    "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
    ButtonPropsColorOverrides
>

type PropsType = {
    /** Name of the button */
    buttonName?: string
    /** Action which happens on click */
    callBack: () => void
    /** ButtonCustom color */
    color?: ColorsType
    /** ButtonCustom size */
    size?: "small" | "medium" | "large"
    /** ButtonCustom appearance */
    variant?: "text" | "outlined" | "contained"
    /** Additional button styles */
    style?: React.CSSProperties
    /** ButtonCustom is disabled or not */
    disabled?: boolean
}

export const ButtonCustom: FC<PropsType> = memo(({ callBack, color, style, buttonName, disabled, size, variant }) => {
    const onclickButtonHandler = useCallback(() => {
        callBack()
    }, [callBack])

    return (
        <Button
            onClick={onclickButtonHandler}
            color={color}
            size={size}
            variant={variant}
            style={style}
            disabled={disabled}>
            {buttonName}
        </Button>
    )
})
