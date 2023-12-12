import { IconButtonCustom } from "common/components"
import SendIcon from "@mui/icons-material/Send"
import React from "react"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof IconButtonCustom> = {
    title: "COMMON/IconButtonCustom",
    component: IconButtonCustom,
    tags: ["autodocs"],
    argTypes: {
        callback: { action: "Click" },
    },
    args: { size: "medium" },
}
export default meta
type Story = StoryObj<typeof IconButtonCustom>

export const SendButton: Story = {
    args: {
        disabled: false,
        children: <SendIcon />,
        style: {
            color: "",
        },
    },
}
