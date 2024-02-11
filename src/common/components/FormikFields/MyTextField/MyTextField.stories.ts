import type { Meta, StoryObj } from "@storybook/react"
import { ReduxStoreProviderDecorator } from "stories"
import { MyTextField } from "common/components"
import withFormik from "@bbbtech/storybook-formik"

const meta: Meta<typeof MyTextField> = {
    title: "FORMIK/MyFields/MyTextField ",
    component: MyTextField,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator, withFormik],
}

export default meta
type Story = StoryObj<typeof MyTextField>

export const Default: Story = {
    args: {
        name: "email",
        label: "Email",
        type: "email",
    },
    parameters: {
        formik: {
            initialValues: {
                email: "",
            },
        },
    },
}
