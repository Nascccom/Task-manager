import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react"
import { ButtonCustom } from "components/ButtonCustom/ButtonCustom"
import Input from "@mui/joy/Input"

type PropsType = {
    /** Optional click handler */
    callBack: (valueTitle: string) => void
    /** Input is disabled or not */
    disabled?: boolean
}

export const InputCustom = memo((props: PropsType) => {
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<null | string>(null)

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.currentTarget.value)
    }
    const onKeydownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        if (title.trim()) {
            props.callBack(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    return (
        <div>
            <Input
                onChange={onChangeInputHandler}
                onKeyDown={onKeydownHandler}
                placeholder={error ? error : "Type in here…"}
                variant='outlined'
                size='md'
                color={error ? "danger" : "primary"}
                value={title}
                disabled={props.disabled}
                sx={{
                    "--Input-focusedThickness": "2px",
                    "--Input-radius": "19px",
                    "--Input-gap": "7px",
                    "--Input-placeholderOpacity": 0.5,
                    "--Input-minHeight": "40px",
                    "--Input-paddingInline": "11px",
                    "--Input-decoratorChildHeight": "35px",
                    width: "300px",
                }}
                endDecorator={
                    <ButtonCustom
                        size='medium'
                        style={{
                            display: "inline-flex",
                            border: "none",
                            alignItems: "center",
                            borderRadius: "50%",
                            backgroundColor: props.disabled ? "#ccc" : error ? "#d2194a" : "#1976d2",
                            color: "#fff",
                            fontWeight: "600",
                        }}
                        disabled={props.disabled}
                        buttonName={"+"}
                        callBack={addTaskHandler}
                    />
                }
            />
        </div>
    )
})
