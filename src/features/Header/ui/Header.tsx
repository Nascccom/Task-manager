import React, { memo } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { useActions, useAppSelector } from "common/hooks"
import { authAsyncActions, authSelectors } from "features/Auth"
import s from "./Header.module.css"

type Props = {
    demo?: boolean
}

export const Header = memo(({ demo }: Props) => {
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const { logout } = useActions(authAsyncActions)

    const logoutHandler = () => {
        if (!demo) {
            logout()
        }
    }

    return (
        <Box className={s.header} position='static'>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' component='div' className={s.header}>
                        News
                    </Typography>
                    {isLoggedIn && (
                        <Button color='inherit' onClick={logoutHandler}>
                            Logout
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
})
