import React, { memo } from "react"
import Grid from "@mui/material/Grid"
import { Navigate } from "react-router-dom"
import { authSelectors, LoginForm } from "features/Auth"
import { useAppSelector } from "common/hooks"

export const Login = memo(() => {
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)

    if (isLoggedIn) {
        return <Navigate to={"/"} />
    }

    return (
        <Grid container justifyContent={"center"}>
            <LoginForm />
        </Grid>
    )
})
