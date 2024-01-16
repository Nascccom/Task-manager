import React, { FC, memo, ReactNode, useCallback } from "react"
import IconButton from "@mui/material/IconButton"
import { OverridableStringUnion } from "@mui/types"
import { IconButtonPropsSizeOverrides } from "@mui/material/IconButton/IconButton"

type Props = {
    callback: () => void
    children: ReactNode
    disabled: boolean
    ariaLabel?: string
    size?: OverridableStringUnion<"small" | "medium" | "large", IconButtonPropsSizeOverrides>
    style?: React.CSSProperties
}

export const IconButtonCustom: FC<Props> = memo(
    ({ callback, children, style, disabled, ariaLabel, size = "medium" }) => {
        const onClickButton = useCallback(() => {
            callback()
        }, [callback])

        return (
            <IconButton aria-label={ariaLabel} size={size} onClick={onClickButton} disabled={disabled} style={style}>
                {children}
            </IconButton>
        )
    },
)
