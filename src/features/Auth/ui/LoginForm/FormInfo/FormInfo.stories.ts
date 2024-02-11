import { ReduxStoreProviderDecorator } from "stories"
import { Meta, StoryObj } from "@storybook/react"
import { FormInfo } from "features/Auth"

const meta: Meta<typeof FormInfo> = {
    title: "FORMIK/Login/FormInfo",
    component: FormInfo,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
}
export default meta
type Story = StoryObj<typeof FormInfo>

export const DefaultInfo: Story = {}
