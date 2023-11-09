import React, { memo } from "react"
import Grid from "@mui/material/Grid"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { useAppSelector } from "hooks/useSelector/useSelector"
import { useAppDispatch } from "hooks/useDiapstch/useDispacth"
import { useFormik } from "formik"
import { loginTC } from "./auth-reducer"
import { Navigate } from "react-router-dom"
import { selectIsLoggedIn } from "hooks/useSelector/selectors"

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
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
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
                errors.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address"
            }

            if (!values.password) {
                errors.password = "Required"
            } else if (values.password.length < 4) {
                errors.password = "Password must be more 3 symbols"
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(loginTC(values.email, values.password, values.rememberMe))
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
