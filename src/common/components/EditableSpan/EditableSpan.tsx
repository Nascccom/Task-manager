import React, { ChangeEvent, FC, memo, useState } from "react"
import TextField from "@mui/material/TextField"
import style from "./EditableSpan.module.css"

type Props = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan: FC<Props> = memo(({ title, callBack }) => {
    const [newTitle, setNewTitle] = useState(title)
    const [edit, setEdit] = useState(false)

    const transformHandler = () => {
        setEdit(!edit)
        callBack(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return edit ? (
        <TextField
            variant='standard'
            id='standard-basic'
            value={newTitle}
            autoFocus
            onChange={onChangeHandler}
            onBlur={transformHandler}
        />
    ) : (
        <span onDoubleClick={transformHandler} className={style.span}>
            {title}
        </span>
    )
})
