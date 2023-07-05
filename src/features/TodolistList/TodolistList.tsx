import React, {useCallback, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/ToDoList";
import {useAppSelector} from "../../hooks/useSelector/useSelector";
import {createTodolistTC, getTodolistsTC, TodolistDomainType} from "../../state/reducers/todolists-reducer";
import {useAppDispatch} from "../../hooks/useDiapstch/useDispacth";
import {InputLine} from "../../components/InputLine/InputLine";

export const TodolistList = () => {
    const todolist = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    return (
      <>
          <Grid container style={{marginTop: "30px", justifyContent: 'center',}}>
              <InputLine callBack={addTodolist}/>
          </Grid>
          <Grid container spacing={2} sx={{justifyContent: 'center', marginTop: "20px"}}>
              {todolist.map(t => {
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
              })}
          </Grid>
      </>
    )
};