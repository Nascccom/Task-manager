import { Meta, StoryObj } from "@storybook/react"
import { ReduxStoreProviderDecorator } from "stories"
import { Captcha } from "features/Captcha"
import withFormik from "@bbbtech/storybook-formik"
import React from "react"

const meta: Meta<typeof Captcha> = {
    title: "FORMIK/Login/Captcha",
    component: Captcha,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator, withFormik],
    parameters: {
        formik: {
            initialValues: {
                captcha: "",
            },
        },
    },
}

export default meta
type Story = StoryObj<typeof Captcha>

export const CaptchaForm: Story = {
    args: {
        captchaUrl:
            "https://social-network.samuraijs.com/HelpApp/HelpApp/Captcha?w=200&h=100&c=OPD0Wpq7zp4rspYQcaQ3oQ%3D%3D",
    },

    decorators: [
        (Story, args) => {
            return (
                <div style={{ width: "300px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Story {...args} />
                </div>
            )
        },
    ],
}
