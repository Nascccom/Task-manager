import type { Meta, StoryObj } from "@storybook/react"
import { ButtonAppBar } from "features/ButtonAppBar/ButtonAppBar"
import { ReduxStoreProviderDecorator } from "stories/ReduxStoreProviderDecorator/ReduxStoreProviderDecorator"

const meta: Meta<typeof ButtonAppBar> = {
    title: "TODOLISTS/ButtonAppBar",
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
