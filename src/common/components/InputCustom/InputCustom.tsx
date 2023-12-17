import React, { ChangeEvent, FC, KeyboardEvent, memo, useCallback } from "react"
import SendIcon from "@mui/icons-material/Send"
import Input from "@mui/material/Input"
import IconButton from "@mui/material/IconButton"

type PropsType = {
    /** set necessary title */
    setTitleCallback: (valueTitle: string) => void
    /** Input is disabled or not */
    disabled?: boolean
    /** It's error for field text */
    error: string | null
    /** Text of title */
    title: string
    /** Optional click handler */
    callback: () => void
}

export const InputCustom: FC<PropsType> = memo(({ title, error, disabled, setTitleCallback, callback }) => {
    const onChangeInputHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setTitleCallback(event.currentTarget.value)
    }, [])

    const onKeydownHandler = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addButtonHandler()
        }
    }, [])

    const addButtonHandler = useCallback(() => {
        callback()
    }, [title])

    return (
        <div>
            <Input
                onChange={onChangeInputHandler}
                onKeyDown={onKeydownHandler}
                placeholder={error ? error : "Type in here…"}
                disabled={disabled}
                value={title}
                sx={{ color: error && "#cb0b0b" }}
            />

            <IconButton
                aria-label='send'
                size='medium'
                onClick={addButtonHandler}
                disabled={disabled}
                style={{
                    color: disabled ? "#888888" : error ? "#cb0b0b" : "#1976d2",
                    marginLeft: "10px",
                }}>
                <SendIcon fontSize='inherit' />
            </IconButton>
        </div>
    )
})
