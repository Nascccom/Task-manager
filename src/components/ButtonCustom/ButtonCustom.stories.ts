// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
import { ButtonCustom } from "components/ButtonCustom/ButtonCustom"

export default {
    title: "TODOLISTS/ButtonCustom",
    component: ButtonCustom,
    tags: ["autodocs"],
    argTypes: {
        callBack: {
            action: "Click",
        },
    },
    args: {
        buttonName: "Button",
    },
}

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SecondaryColor = {
    args: {
        color: "secondary",
    },
}

export const SuccessColor = {
    args: {
        color: "success",
    },
}

export const ErrorColor = {
    args: {
        color: "error",
    },
}

export const AddButton = {
    args: {
        size: "medium",
        color: "error",
        variant: "outlined",
        style: {
            display: "inline-flex",
            border: "none",
            alignItems: "center",
            borderRadius: "50%",
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: "600",
        },
        buttonName: "+",
    },
    argTypes: {
        callBack: {
            action: "Click",
        },
    },
}

export const AddErrorButton = {
    args: {
        size: "medium",
        color: "error",
        variant: "outlined",
        style: {
            display: "inline-flex",
            border: "none",
            alignItems: "center",
            borderRadius: "50%",
            backgroundColor: "#d2194a",
            color: "#fff",
            fontWeight: "600",
        },
        buttonName: "+",
    },
    argTypes: {
        callBack: {
            action: "Error",
        },
    },
}
