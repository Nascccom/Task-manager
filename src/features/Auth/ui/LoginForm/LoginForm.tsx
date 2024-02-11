import { authAsyncActions, FormInfo, LoginParams } from "features/Auth"
import { Form, Formik, FormikHelpers, FormikProps } from "formik"
import { BaseResponse } from "common/types"
import { MyCheckbox, MyTextField } from "common/components"
import { Captcha, captchaSelectors } from "features/Captcha"
import { useActions, useAppSelector } from "common/hooks"
import React from "react"
import Button from "@mui/material/Button"

type FormikError = Partial<Omit<LoginParams, "captcha">>
export const LoginFormInitialValues: LoginParams = {
    email: "",
    password: "",
    rememberMe: false,
}

const validationSchema = (values: LoginParams) => {
    const errors: FormikError = {}

    if (!values.email) {
        errors.email = "Email is required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
    }

    if (!values.password) {
        errors.password = "Password is required"
    } else if (values.password.length < 4) {
        errors.password = "Password must be more 3 symbols"
    }
    return errors
}

export const LoginForm = () => {
    const captchaUrl = useAppSelector(captchaSelectors.selectCaptchaUrl)
    const { login } = useActions(authAsyncActions)

    return (
        <Formik
            initialValues={LoginFormInitialValues}
            validate={validationSchema}
            onSubmit={(values, formikHelpers: FormikHelpers<LoginParams>) => {
                login(values)
                    .unwrap()
                    .catch((err: BaseResponse) => {
                        err.fieldsErrors?.forEach((fieldError) => {
                            formikHelpers.setFieldError(fieldError.field, fieldError.error)
                        })
                    })
            }}>
            {(props: FormikProps<LoginParams>) => (
                <Form>
                    <FormInfo />

                    <MyTextField name='email' type='email' label='Email' />
                    <MyTextField name='password' type='password' label='Password' />
                    <MyCheckbox name='Remember me' />

                    {captchaUrl && <Captcha captchaUrl={captchaUrl} label='Captcha' />}

                    <Button type={"submit"} variant={"contained"} color={"primary"} disabled={!props.isValid}>
                        Login
                    </Button>
                </Form>
            )}
        </Formik>
    )
}
