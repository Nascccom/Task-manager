import React, {memo} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../hooks/useSelector/useSelector";
import {useAppDispatch} from "../../hooks/useDiapstch/useDispacth";
import {logoutTC} from "../Login/auth-reducer";
import {selectIsLoggedIn} from "../../hooks/useSelector/selectors";

export const ButtonAppBar = memo(() => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()

    const onclickLogoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
      <Box sx={{flexGrow: 1}}>
          <AppBar position="static">
              <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                  >
                      <MenuIcon/>
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                      News
                  </Typography>
                  <Button color="inherit" onClick={onclickLogoutHandler}>
                      Logout
                  </Button>
              </Toolbar>
          </AppBar>
      </Box>
    );
})

