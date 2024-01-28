import React, { ChangeEvent, memo, useState } from "react"
import TextField from "@mui/material/TextField"
import s from "./EditableSpan.module.css"

type Props = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = memo(({ title, callBack }: Props) => {
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
            multiline
            rows={2}
        />
    ) : (
        <span onDoubleClick={transformHandler} className={s.title}>
            {title}
        </span>
    )
})
