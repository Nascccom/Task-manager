import React from "react"
import TextField from "@mui/material/TextField"
import { FieldInputProps } from "formik"

type Props = {
    captchaUrl: string
    captchaFieldProps: FieldInputProps<string>
}
export const Captcha = ({ captchaUrl, captchaFieldProps }: Props) => {
    return (
        <>
            <img src={captchaUrl} alt='Captcha' />
            <TextField type='text' label='Captcha' margin='normal' {...captchaFieldProps} />
        </>
    )
}
