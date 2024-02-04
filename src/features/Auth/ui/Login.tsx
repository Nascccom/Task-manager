import React, { memo } from "react"
import Grid from "@mui/material/Grid"
import { Navigate } from "react-router-dom"
import { LoginForm, useLogin } from "features/Auth"

export const Login = memo(() => {
    const { formik, isLoggedIn, captchaUrl } = useLogin()

    if (isLoggedIn) {
        return <Navigate to={"/"} />
    }

    return (
        <Grid container justifyContent={"center"}>
            <Grid item>
                <LoginForm
                    handleSubmit={formik.handleSubmit}
                    getFieldProps={formik.getFieldProps}
                    values={formik.values}
                    touched={formik.touched}
                    errors={formik.errors}
                    isValid={formik.isValid}
                    captchaUrl={captchaUrl}
                />
            </Grid>
        </Grid>
    )
})
