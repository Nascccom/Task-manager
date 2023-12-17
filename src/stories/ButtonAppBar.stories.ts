import type { Meta, StoryObj } from "@storybook/react"
import { ButtonAppBar } from "features/ButtonAppBar"
import { ReduxStoreProviderDecorator } from "stories"

const meta: Meta<typeof ButtonAppBar> = {
    title: "FEATURES/ButtonAppBar",
    component: ButtonAppBar,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
}
export default meta
type Story = StoryObj<typeof ButtonAppBar>

export const ButtonAppBarDefault: Story = {
    args: {
        demo: true,
    },
}
