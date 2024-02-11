import { Meta, StoryObj } from "@storybook/react"
import { LoginForm } from "features/Auth"
import { ReduxStoreProviderDecorator } from "stories"
import React from "react"

const meta: Meta<typeof LoginForm> = {
    title: "FORMIK/Login/SignupForm",
    component: LoginForm,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const SignupForm: Story = {
    args: { demo: true },
    decorators: [
        (Story, args) => {
            return (
                <div style={{ width: "300px" }}>
                    <Story {...args} />
                </div>
            )
        },
    ],
}
