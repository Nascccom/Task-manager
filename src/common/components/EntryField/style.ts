import { FormikProps } from "formik"
import { CSSProperties } from "react"

export const style = {
    inputField: (formik: FormikProps<{ title: string }>) =>
        ({
            color: formik.errors.title && "#cb0b0b",
        }) as CSSProperties,
    button: (formik: FormikProps<{ title: string }>, disabled: boolean | undefined) =>
        ({
            color: formik.errors.title ? "#cb0b0b" : disabled ? "#888888" : "#1976d2",
            marginLeft: "10px",
        }) as CSSProperties,
}
