import React from "react"
import { useField } from "formik"
import s from "./../FormikFields.module.css"
import TextField from "@mui/material/TextField"

type Props = {
    label: string
    name: string
    type: string
}

export const MyTextField = ({ label, name, ...props }: Props) => {
    const [field, meta] = useField(name)
    return (
        <>
            <TextField label={label} margin='normal' {...field} {...props} />
            {meta.touched && meta.error ? <div className={s.errorField}>{meta.error}</div> : null}
        </>
    )
}
