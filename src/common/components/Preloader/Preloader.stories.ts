import type { Meta, StoryObj } from "@storybook/react"
import { ReduxStoreProviderDecorator } from "stories/ReduxStoreProviderDecorator/ReduxStoreProviderDecorator"
import { Preloader } from "common/components"

const meta: Meta<typeof Preloader> = {
    title: "Common/Preloader",
    component: Preloader,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof Preloader>

export const Default: Story = {
    args: {
        size: 150,
        thickness: 3,
    },
}
