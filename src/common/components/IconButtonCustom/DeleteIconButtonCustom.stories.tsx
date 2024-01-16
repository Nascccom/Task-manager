import { DeleteIconButtonCustom } from "common/components"
import { Meta, StoryObj } from "@storybook/react"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import React from "react"
import { OverridableStringUnion } from "@mui/types"
import { IconButtonPropsSizeOverrides } from "@mui/material/IconButton/IconButton"

const meta: Meta<typeof DeleteIconButtonCustom> = {
    title: "COMMON/DeleteIconButtonCustom",
    component: DeleteIconButtonCustom,
    tags: ["autodocs"],
    argTypes: {
        callback: { action: "Click" },
    },
    args: { size: "medium" },
}
export default meta
type Story = StoryObj<typeof DeleteIconButtonCustom>

const stylesButton = {
    position: "relative",
}
type Props = {
    callback: () => void
    disabled: boolean
    size?: OverridableStringUnion<"small" | "medium" | "large", IconButtonPropsSizeOverrides>
}

export const DeleteButton = ({ size, callback, disabled = false }: Props) => {
    return (
        <IconButton aria-label={"delete"} size={size} onClick={callback} disabled={disabled} sx={stylesButton}>
            <DeleteIcon fontSize={size} />
        </IconButton>
    )
}

export const DisabledButton: Story = {
    render: () => <DeleteButton callback={() => {}} disabled={true} />,
}
