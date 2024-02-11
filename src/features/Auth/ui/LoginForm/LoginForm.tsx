import { authAsyncActions, FormInfo, LoginParams } from "features/Auth"
import { Form, Formik, FormikHelpers, FormikProps } from "formik"
import { BaseResponse } from "common/types"
import { MyCheckbox, MyTextField } from "common/components"
import { Captcha, captchaSelectors } from "features/Captcha"
import { useActions, useAppSelector } from "common/hooks"
import React from "react"
import Button from "@mui/material/Button"
import s from "./LoginForm.module.css"
import { validationSchema } from "features/Auth"

export const LoginFormInitialValues: LoginParams = {
    email: "",
    password: "",
    rememberMe: false,
}
type Props = {
    demo?: boolean
}
export const LoginForm = ({ demo }: Props) => {
    const captchaUrl = useAppSelector(captchaSelectors.selectCaptchaUrl)
    const { login } = useActions(authAsyncActions)

    return (
        <Formik
            initialValues={LoginFormInitialValues}
            validate={validationSchema}
            onSubmit={(values, formikHelpers: FormikHelpers<LoginParams>) => {
                if (!demo) {
                    login(values)
                        .unwrap()
                        .catch((err: BaseResponse) => {
                            err.fieldsErrors?.forEach((fieldError) => {
                                formikHelpers.setFieldError(fieldError.field, fieldError.error)
                            })
                        })
                }
            }}>
            {(props: FormikProps<LoginParams>) => (
                <Form className={s.form}>
                    <FormInfo />

                    <MyTextField name='email' type='email' label='Email' />
                    <MyTextField name='password' type='password' label='Password' />
                    <MyCheckbox name='rememberMe' label='Remember me' />

                    {captchaUrl && <Captcha captchaUrl={captchaUrl} />}

                    <Button type={"submit"} variant={"contained"} color={"primary"} disabled={!props.isValid}>
                        Login
                    </Button>
                </Form>
            )}
        </Formik>
    )
}
