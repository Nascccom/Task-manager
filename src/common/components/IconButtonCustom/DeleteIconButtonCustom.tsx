import React, { memo } from "react"
import IconButton from "@mui/material/IconButton"
import { OverridableStringUnion } from "@mui/types"
import { IconButtonPropsSizeOverrides } from "@mui/material/IconButton/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import s from "./DeleteIconButtonCustom.module.css"

type Props = {
    callback: () => void
    disabled: boolean
    size?: OverridableStringUnion<"small" | "medium" | "large", IconButtonPropsSizeOverrides>
    style?: string
}

export const DeleteIconButtonCustom = memo(({ callback, disabled, size = "medium", style }: Props) => {
    const onClickButton = () => {
        callback()
    }

    return (
        <IconButton
            aria-label={"delete"}
            size={size}
            onClick={onClickButton}
            disabled={disabled}
            className={s.icon + " " + style}>
            <DeleteIcon fontSize={size} />
        </IconButton>
    )
})
