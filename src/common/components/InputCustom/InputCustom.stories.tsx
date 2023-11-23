import type { Meta, StoryObj } from "@storybook/react"
import { InputCustom } from "common/components"

const meta: Meta<typeof InputCustom> = {
    title: "COMMON/InputCustom",
    component: InputCustom,
    tags: ["autodocs"],
    argTypes: {
        callback: { action: "Send" },
        setTitleCallback: { action: "Title" },
    },
}

export default meta
type Story = StoryObj<typeof InputCustom>

export const InputLineWithoutError: Story = {}

export const InputWithError: Story = {
    args: {
        error: "Occurred error",
    },
}

export const DisabledInput: Story = {
    args: {
        disabled: true,
    },
}
