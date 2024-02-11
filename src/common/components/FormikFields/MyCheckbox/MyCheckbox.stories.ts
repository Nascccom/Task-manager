import type { Meta, StoryObj } from "@storybook/react"
import { ReduxStoreProviderDecorator } from "stories"
import { MyCheckbox } from "common/components"
import withFormik from "@bbbtech/storybook-formik"

const meta: Meta<typeof MyCheckbox> = {
    title: "FORMIK/MyFields/MyCheckbox",
    component: MyCheckbox,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator, withFormik],
}

export default meta
type Story = StoryObj<typeof MyCheckbox>

export const Default: Story = {
    args: {
        name: "rememberMe",
        label: "Remember Me",
    },
    parameters: {
        formik: {
            initialValues: {
                rememberMe: false,
            },
        },
    },
}
