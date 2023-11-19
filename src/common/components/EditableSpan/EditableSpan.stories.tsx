import type { Meta, StoryObj } from "@storybook/react"
import React, { ChangeEvent, useState } from "react"
import { EditableSpan, PropsType } from "common/components/EditableSpan/EditableSpan"
import TextField from "@mui/material/TextField"

const meta: Meta<typeof EditableSpan> = {
    title: "COMMON/EditableSpan",
    component: EditableSpan,
    tags: ["autodocs"],
    argTypes: {
        callBack: {
            description: "Change title's name",
            action: "EditableSpan",
        },
    },
    args: {
        title: "This is span. Click me",
    },
}

export default meta
type Story = StoryObj<typeof EditableSpan>

export const SpanText: Story = {}

export const SpanInput = (args: PropsType) => {
    const [newTitle, setNewTitle] = useState<string>(args.title)
    const [edit, setEdit] = useState(true)
    const transformHandler = () => {
        setEdit(!edit)
        args.callBack(newTitle)
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
        <span onDoubleClick={transformHandler}> {args.title}</span>
    )
}
