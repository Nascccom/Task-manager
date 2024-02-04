import React, { memo } from "react"
import FormControl from "@mui/material/FormControl"
import FormGroup from "@mui/material/FormGroup"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControlLabel from "@mui/material/FormControlLabel"
import { FormInfo } from "features/Auth"
import { Captcha } from "features/Captcha"
import { FieldConfig, FieldInputProps, FormikValues } from "formik"
import s from "./LoginForm.module.css"

type Props = {
    handleSubmit: (eventOrValues?: React.FormEvent<HTMLFormElement> | undefined) => void
    getFieldProps: (nameOrOptions: string | FieldConfig) => FieldInputProps<any>
    values: FormikValues
    touched: {
        [field: string]: boolean
    }
    errors: {
        [field: string]: string | undefined
    }
    isValid: boolean
    captchaUrl: string | null
}

export const LoginForm = memo(
    ({ handleSubmit, getFieldProps, values, touched, errors, isValid, captchaUrl }: Props) => {
        return (
            <FormControl>
                <form onSubmit={handleSubmit}>
                    <FormInfo />

                    <FormGroup>
                        <TextField type='email' label='Email' margin='normal' {...getFieldProps("email")} />
                        {touched.email && errors.email ? <div className={s.errorField}>{errors.email}</div> : null}

                        <TextField type='password' label='Password' margin='normal' {...getFieldProps("password")} />
                        {touched.password && errors.password ? (
                            <div className={s.errorField}>{errors.password}</div>
                        ) : null}

                        <FormControlLabel
                            label={"Remember me"}
                            control={<Checkbox checked={values.rememberMe} {...getFieldProps("rememberMe")} />}
                        />

                        {captchaUrl && <Captcha captchaUrl={captchaUrl} captchaFieldProps={getFieldProps("captcha")} />}

                        <Button type={"submit"} variant={"contained"} color={"primary"} disabled={!isValid}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        )
    },
)
