import React from "react"
import TextField from "@mui/material/TextField"
import { useField } from "formik"
import s from "features/Auth/ui/LoginForm/LoginForm.module.css"

type Props = {
    label: string
    captchaUrl: string
}
export const Captcha = ({ captchaUrl, label, ...props }: Props) => {
    const [field, meta] = useField(label)

    return (
        <>
            <img src={captchaUrl} alt='Captcha' />
            <TextField type='text' label={label} margin='normal' {...field} {...props} />
            {meta.touched && meta.error ? <div className={s.errorField}>{meta.error}</div> : null}
        </>
    )
}
