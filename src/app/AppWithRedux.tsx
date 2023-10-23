import React, {useEffect} from 'react';
import './App.css';
import {ButtonAppBar} from '../features/ButtonAppBar/ButtonAppBar';
import Container from '@mui/material/Container';
import {TodolistList} from "../features/TodolistList/TodolistList";
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from "../hooks/useSelector/useSelector";
import {ErrorSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {useAppDispatch} from "../hooks/useDiapstch/useDispacth";
import {getAuthMeDataTC} from "../features/Login/auth-reducer";
import {selectIsLoadingStatus} from "../hooks/useSelector/selectors";

export function AppWithRedux() {
    const isLoadingStatus = useAppSelector(selectIsLoadingStatus)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getAuthMeDataTC())
    }, [dispatch])

    return (
      <div className="App">
          <ButtonAppBar/>

          {isLoadingStatus === 'loading' && <LinearProgress color={'secondary'}/>}

          <Container fixed maxWidth={false}>
              <Routes>
                  <Route path={'/'} element={<TodolistList/>}/>
                  <Route path={'/login'} element={<Login/>}/>
                  <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                  <Route path={'*'} element={<Navigate to={'/404'}/>}/>
              </Routes>
          </Container>

          <ErrorSnackbars/>

      </div>
    );
}

