import React, { ChangeEvent, memo, useState } from "react"
import TextField from "@mui/material/TextField"

export type PropsType = {
    title: string
    callBack: (newTitle: string) => void
}

export const EditableSpan = memo((props: PropsType) => {
    const [newTitle, setNewTitle] = useState(props.title)
    const [edit, setEdit] = useState(false)

    const transformHandler = () => {
        setEdit(!edit)
        props.callBack(newTitle)
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
        <span onDoubleClick={transformHandler}> {props.title}</span>
    )
})
