import { EntryField } from "common/components"
import { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof EntryField> = {
    title: "FORMIK/EntryField",
    component: EntryField,
    tags: ["autodocs"],
    argTypes: {
        callBack: {
            action: "Title",
        },
    },
}
export default meta
type Story = StoryObj<typeof EntryField>

export const Default: Story = {}

export const DisabledField: Story = {
    args: {
        disabled: true,
    },
}
