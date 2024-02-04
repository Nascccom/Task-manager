import { FormikProps } from "formik"
import { CSSProperties } from "react"

export const style = {
    inputField: (formik: FormikProps<{ title: string }>) =>
        ({
            color: formik.errors.title && "var(--errorColor)",
        }) as CSSProperties,
    button: (formik: FormikProps<{ title: string }>, disabled: boolean | undefined) =>
        ({
            color: formik.errors.title
                ? "var(--errorColor)"
                : disabled
                ? "var(--disabledColor)"
                : "var(--primaryColor)",
            marginLeft: "10px",
        }) as CSSProperties,
}
