import React, {useCallback, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/ToDoList";
import {useAppSelector} from "../../hooks/useSelector/useSelector";
import {createTodolistTC, getTodolistsTC, TodolistDomainType} from "../../state/reducers/todolists-reducer";
import {useAppDispatch} from "../../hooks/useDiapstch/useDispacth";
import {InputLine} from "../../components/InputLine/InputLine";

export const TodolistList = () => {
    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    return (
      <>
          <Grid container style={{marginTop: "25px", justifyContent: 'center',}}>
              <InputLine callBack={addTodolist}/>
          </Grid>
          <Grid container spacing={2} sx={{justifyContent: 'start', marginTop: "20px"}}>
              {todolists.map(t => {
                  return (
                    <Grid item key={t.id}>
                        <Paper style={{padding: '30px', borderRadius: '8px'}}>
                            <Todolist
                              todolistId={t.id}
                              entityStatus={t.entityStatus}
                              title={t.title}
                              activeFilter={t.filter}
                            />
                        </Paper>
                    </Grid>
                  )
              })}
          </Grid>
      </>
    )
};