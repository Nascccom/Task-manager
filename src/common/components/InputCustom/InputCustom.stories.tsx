import type { Meta, StoryObj } from "@storybook/react"
import { ButtonCustom, InputCustom } from "common/components"
import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import Input from "@mui/material/Input"

type PropsType = {
    /**
     * Optional click handler
     */
    callBack: (valueTitle: string) => void
    /**
     * Determines whether the button and input will be disabled
     */
    disabled: boolean
}

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof InputCustom> = {
    title: "TODOLISTS/InputCustom",
    component: InputCustom,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ["autodocs"],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callBack: {
            description: "ButtonCustom clicked inside form",
            action: "ButtonCustom clicked inside form",
        },
    },
}

export default meta
type Story = StoryObj<typeof InputCustom>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// More on args: https://storybook.js.org/docs/react/writing-stories/args
export const InputLineWithoutError: Story = {}

export const InputLineWithError = ({ callBack, disabled = false }: PropsType) => {
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
