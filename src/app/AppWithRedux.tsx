import React from 'react';
import './App.css';
import {ButtonAppBar} from '../features/ButtonAppBar/ButtonAppBar';
import Container from '@mui/material/Container';
import {TodolistList} from "../features/TodolistList/TodolistList";
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from "../hooks/useSelector/useSelector";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";

export function AppWithRedux() {
    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    return (
      <div className="App">
          <ButtonAppBar/>

          {status === 'loading' && <LinearProgress color={'secondary'}/>}

          <Container fixed>
              <TodolistList/>
          </Container>

         <ErrorSnackbars />
      </div>
    );
}

