import React, { memo } from "react"
import Grid from "@mui/material/Grid"
import { Navigate } from "react-router-dom"
import { authSelectors, LoginForm } from "features/Auth"
import { useAppSelector } from "common/hooks"

type Props = {
    demo?: boolean
}
export const Login = memo(({ demo }: Props) => {
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)

    if (isLoggedIn) {
        return <Navigate to={"/"} />
    }

    return (
        <Grid container justifyContent={"center"}>
            <LoginForm demo={demo} />
        </Grid>
    )
})
