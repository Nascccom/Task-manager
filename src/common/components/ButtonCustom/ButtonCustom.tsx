import React, { FC, memo, useCallback } from "react"
import Button, { ButtonPropsColorOverrides } from "@mui/material/Button"
import { OverridableStringUnion } from "@mui/types"

type Colors = OverridableStringUnion<
    "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
    ButtonPropsColorOverrides
>

type Props = {
    /** Name of the button */
    buttonName?: string
    /** Action which happens on click */
    callBack: () => void
    /** ButtonCustom color */
    color?: Colors
    /** ButtonCustom size */
    size?: "small" | "medium" | "large"
    /** ButtonCustom appearance */
    variant?: "text" | "outlined" | "contained"
    /** Additional button styles */
    style?: React.CSSProperties
    /** ButtonCustom is disabled or not */
    disabled?: boolean
}

export const ButtonCustom: FC<Props> = memo(({ callBack, color, style, buttonName, disabled, size, variant }) => {
    const onClickButton = useCallback(() => {
        callBack()
    }, [callBack])

    return (
        <Button onClick={onClickButton} color={color} size={size} variant={variant} style={style} disabled={disabled}>
            {buttonName}
        </Button>
    )
})
