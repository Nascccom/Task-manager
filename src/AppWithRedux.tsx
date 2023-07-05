import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './components/Todolist/ToDoList';
import {InputLine} from './components/InputLine/InputLine';
import {ButtonAppBar} from './components/ButtonAppBar/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {createTodolistTC, getTodolistsTC, TodolistDomainType} from "./state/reducers/todolists-reducer";
import {useAppDispatch} from "./hooks/useDiapstch/useDispacth";
import {useAppSelector} from "./hooks/useSelector/useSelector";

export function AppWithRedux() {
    const todolist = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        // dispatch(addTodolistAC(title))
        dispatch(createTodolistTC(title))
    }, [dispatch])

    return (
      <div className="App">
          <ButtonAppBar/>

          <Container fixed>
              <Grid container style={{marginTop: "30px", justifyContent: 'center',}}>
                  <InputLine callBack={addTodolist}/>
              </Grid>
              <Grid container spacing={4} sx={{justifyContent: 'center', marginTop: "20px"}}>
                  {
                      todolist.map(t => {
                          return (
                            <Grid item key={t.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                      todolistId={t.id}
                                      title={t.title}
                                      activeFilter={t.filter}
                                    />
                                </Paper>
                            </Grid>
                          )
                      })
                  }
              </Grid>
          </Container>

      </div>
    );
}

