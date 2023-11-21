import React, { memo, useCallback } from "react"
import Button from "@mui/material/Button"

export type ColorsType = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning"

type ButtonType = {
    /** Name of the button */
    buttonName: string
    /** Action which happens on click */
    callBack: () => void
    /** ButtonCustom color */
    color?: ColorsType
    /** ButtonCustom size */
    size?: "small" | "medium" | "large"
    /** ButtonCustom appearance */
    variant?: "text" | "outlined" | "contained"
    /** Additional button styles */
    style?: object
    /** ButtonCustom is disabled or not */
    disabled?: boolean
}

export const ButtonCustom = memo((props: ButtonType) => {
    const onclickButtonHandler = useCallback(() => {
        props.callBack()
    }, [props.callBack])

    return (
        <Button
            onClick={onclickButtonHandler}
            color={props.color}
            size={props.size}
            variant={props.variant}
            style={props.style}
            disabled={props.disabled}>
            {props.buttonName}
        </Button>
    )
})
