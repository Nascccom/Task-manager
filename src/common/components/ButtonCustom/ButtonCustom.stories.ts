import { ButtonCustom } from "common/components"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof ButtonCustom> = {
    title: "COMMON/ButtonCustom",
    component: ButtonCustom,
    tags: ["autodocs"],
    argTypes: {
        callBack: {
            action: "Click",
        },
    },
    args: {
        buttonName: "Button",
    },
}
export default meta
type Story = StoryObj<typeof ButtonCustom>

export const SecondaryColor: Story = {
    args: {
        color: "secondary",
    },
}

export const SuccessColor: Story = {
    args: {
        color: "success",
    },
}

export const ErrorColor: Story = {
    args: {
        color: "error",
    },
}
