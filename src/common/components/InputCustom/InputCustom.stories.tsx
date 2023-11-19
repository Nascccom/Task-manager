import type { Meta, StoryObj } from "@storybook/react"
import { ButtonCustom, InputCustom } from "common/components"
import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import Input from "@mui/material/Input"

type PropsType = {
    callBack: (valueTitle: string) => void
    disabled: boolean
}

const meta: Meta<typeof InputCustom> = {
    title: "COMMON/InputCustom",
    component: InputCustom,
    tags: ["autodocs"],
    argTypes: {
        callBack: {
            description: "ButtonCustom clicked inside form",
            action: "ButtonCustom clicked inside form",
        },
    },
}

export default meta
type Story = StoryObj<typeof InputCustom>

export const InputLineWithoutError: Story = {}

export const InputWithError = ({ callBack, disabled = false }: PropsType) => {
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<null | string>("Title is required")

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
            callBack(title.trim())
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
                sx={{
                    "--Input-focusedThickness": "2px",
                    "--Input-radius": "19px",
                    "--Input-gap": "7px",
                    "--Input-placeholderOpacity": 0.5,
                    "--Input-minHeight": "40px",
                    "--Input-paddingInline": "11px",
                    "--Input-decoratorChildHeight": "35px",
                    width: "250px",
                }}
                placeholder={error ? error : "Type in here…"}
                disabled={disabled}
                value={title}
            />
            <ButtonCustom
                size='medium'
                style={{
                    display: "inline-flex",
                    border: "none",
                    alignItems: "center",
                    borderRadius: "50%",
                    backgroundColor: error ? "#d2194a" : "#1976d2",
                    color: "#fff",
                    fontWeight: "600",
                }}
                disabled={disabled}
                buttonName={"+"}
                callBack={addTaskHandler}
            />
        </div>
    )
}

export const DisabledInput: Story = {
    args: {
        disabled: true,
    },
}
