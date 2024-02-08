import type { Meta, StoryObj } from "@storybook/react"
import { ErrorSnackbars } from "common/components"
import { ReduxStoreProviderDecorator } from "stories"

const meta: Meta<typeof ErrorSnackbars> = {
    title: "COMMON/ErrorSnackbars",
    component: ErrorSnackbars,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {
        error: { defaultValue: "Some Error", type: "string" },
    },
    args: {
        setErrorMessage: (e) => {},
    },
}

export default meta
type Story = StoryObj<typeof ErrorSnackbars>

export const Default: Story = {}
