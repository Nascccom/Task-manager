import React, { ChangeEvent, memo } from "react"
import Checkbox from "@mui/material/Checkbox"

type PropsType = {
    callBack: (checked: boolean) => void
    checked: boolean
}

export const SuperCheckBox = memo(({ callBack, checked }: PropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.checked)
    }

    return <Checkbox checked={checked} onChange={onChangeHandler} color='success' />
})
