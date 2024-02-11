import React from "react"
import TextField from "@mui/material/TextField"
import { useField } from "formik"
import s from "common/components/FormikFields/FormikFields.module.css"

type Props = {
    captchaUrl: string
}
export const Captcha = ({ captchaUrl, ...props }: Props) => {
    const [field, meta] = useField("captcha")

    return (
        <>
            <img src={captchaUrl} alt='Captcha' />
            <TextField type='text' label='Captcha' margin='normal' {...field} {...props} />
            {meta.touched && meta.error ? <div className={s.errorField}>{meta.error}</div> : null}
        </>
    )
}
