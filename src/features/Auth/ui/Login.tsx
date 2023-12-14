import React, { memo } from "react"
import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useActions, useAppDispatch, useAppSelector } from "common/hooks"
import { FormikHelpers, useFormik } from "formik"
import { Navigate } from "react-router-dom"
import { authActions, authSelectors } from "features/Auth"
import { BaseResponseType } from "common/types"

type FormikErrorType = {
    email?: string
    password?: string
}
export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = memo(() => {
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

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
        },
        onSubmit: (values, formikHelpers: FormikHelpers<LoginDataType>) => {
            dispatch(authActions.login(values))
                .unwrap()
                .catch((err: BaseResponseType) => {
                    err.fieldsErrors.forEach((fieldError) => {
                        formikHelpers.setFieldError(fieldError.field, fieldError.error)
                    })
                })
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Navigate to={"/"} />
    }

    return (
        <Grid container justifyContent={"center"}>
            <Grid item>
                <FormControl>
                    <form onSubmit={formik.handleSubmit}>
                        <FormLabel>
                            <p>
                                To log in get registered
                                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                                    {" "}
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField type='email' label='Email' margin='normal' {...formik.getFieldProps("email")} />
                            {formik.touched.email && formik.errors.email ? (
                                <div style={{ color: "red" }}>{formik.errors.email}</div>
                            ) : null}

                            <TextField
                                type='password'
                                label='Password'
                                margin='normal'
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div style={{ color: "red" }}>{formik.errors.password}</div>
                            ) : null}

                            <FormControlLabel
                                label={"Remember me"}
                                control={
                                    <Checkbox
                                        checked={formik.values.rememberMe}
                                        {...formik.getFieldProps("rememberMe")}
                                    />
                                }
                            />

                            <Button type={"submit"} variant={"contained"} color={"primary"}>
                                Login
                            </Button>
                        </FormGroup>
                    </form>
                </FormControl>
            </Grid>
        </Grid>
    )
})