import React, { memo } from "react"
import SendIcon from "@mui/icons-material/Send"
import IconButton from "@mui/material/IconButton"
import Input from "@mui/material/Input"
import { useEntryField } from "common/hooks"
import s from "./EntryField.module.css"
import { style } from "./style"

type Props = {
    /** Optional click handler */
    callBack: (title: string) => void
    /** Input is disabled or not */
    disabled?: boolean
}

export const EntryField = memo(({ callBack, disabled }: Props) => {
    const { formik } = useEntryField(callBack)

    const handleBlur = () => {
        formik.setFieldTouched("title", true)
        if (!formik.values.title.trim()) {
            formik.setFieldError("title", "Title cannot be empty")
        }
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Input
                type={"text"}
                placeholder={formik.errors.title ? formik.errors.title : "Type in here…"}
                {...formik.getFieldProps("title")}
                onBlur={handleBlur}
                error={formik.touched.title && !!formik.errors.title}
                sx={style.inputField(formik)}
            />

            <IconButton
                type={"submit"}
                aria-label='send'
                size='medium'
                disabled={disabled}
                sx={style.button(formik, disabled)}
                onBlur={handleBlur}>
                <SendIcon fontSize='inherit' />
            </IconButton>

            {formik.touched.title && formik.errors.title ? (
                <div className={s.errorText}>{formik.errors.title}</div>
            ) : null}
        </form>
    )
})
