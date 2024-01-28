import type { Meta, StoryObj } from "@storybook/react"
import { Header } from "features/Header"
import { ReduxStoreProviderDecorator } from "stories"

const meta: Meta<typeof Header> = {
    title: "FEATURES/Header",
    component: Header,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
}
export default meta
type Story = StoryObj<typeof Header>

export const HeaderDefault: Story = {
    args: {
        demo: true,
    },
}
