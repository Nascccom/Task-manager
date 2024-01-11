import React, { FC, memo, useCallback } from "react"
import { FormikHelpers, useFormik } from "formik"
import SendIcon from "@mui/icons-material/Send"
import IconButton from "@mui/material/IconButton"
import Input from "@mui/material/Input"

type PropsType = {
    /** Optional click handler */
    callBack: (valueTitle: string) => void
    /** Input is disabled or not */
    disabled?: boolean
}

export const InputValidate: FC<PropsType> = memo(({ callBack, disabled }) => {
    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validate: (values) => {
            const errors: { title?: string } = {}

            if (values.title.trim().length > 100) {
                errors.title = "The field Title must be a string or array type with a maximum length of '100'. (Title)"
            }
            return errors
        },
        onSubmit: (values, formikHelpers: FormikHelpers<{ title: string }>) => {
            if (!values.title.trim()) {
                formikHelpers.setFieldError("title", "Title cannot be empty")
            } else {
                callBack(values.title)
                formik.resetForm()
            }
        },
    })

    const handleBlur = useCallback(() => {
        formik.setFieldTouched("title", true)
        if (!formik.values.title.trim()) {
            formik.setFieldError("title", "Title cannot be empty")
        }
    }, [])

    return (
        <form onSubmit={formik.handleSubmit}>
            <Input
                type={"text"}
                placeholder={formik.errors.title ? formik.errors.title : "Type in here…"}
                {...formik.getFieldProps("title")}
                onBlur={handleBlur}
                error={formik.touched.title && !!formik.errors.title}
                sx={{
                    borderBottomColor:
                        formik.touched.title && formik.errors.title ? "#cb0b0b" : disabled ? "#888888" : "#1976d2",
                    color: formik.errors.title && "#cb0b0b",
                }}
            />

            <IconButton
                type={"submit"}
                aria-label='send'
                size='medium'
                disabled={disabled}
                style={{
                    color: disabled ? "#888888" : formik.errors.title ? "#cb0b0b" : "#1976d2",
                    marginLeft: "10px",
                }}
                onBlur={handleBlur}>
                <SendIcon fontSize='inherit' />
            </IconButton>

            {formik.touched.title && formik.errors.title ? (
                <div style={{ color: "red", fontSize: "11px" }}>{formik.errors.title}</div>
            ) : null}
        </form>
    )
})
