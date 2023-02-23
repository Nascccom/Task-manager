import React from 'react';
import './App.css';
import {Todolist} from './ToDoList';
import {Input} from './components/Input/Input';
import {ButtonAppBar} from './components/ButtonAppBar/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeFilterAC,
    changeTitleTodolistAC,
    FilterValuesType,
    removeTodolistAC,
    TodolistType
} from "./state/todolists-reducer";
import {addTaskAC, changeToggleTaskAC, removeTaskAC, TasksStateType, updateTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store/store";

export function AppWithRedux() {
    const todolist = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const updateTodolist = (todolistId: string, newTitleTodo: string) => {
        dispatch(changeTitleTodolistAC(todolistId, newTitleTodo))
    }

    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID))
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        dispatch(changeFilterAC(todolistID, value))
    }

    const addTask = (todolistID: string, valueTitle: string) => {
        dispatch(addTaskAC(todolistID, valueTitle))
    }

    const updateTask = (todolistId: string, taskId: string, newTitle: string) => {
        dispatch(updateTaskAC(todolistId, taskId, newTitle))
    }

    function removeTask(todolistId: string, taskId: string) {
        dispatch(removeTaskAC(todolistId, taskId))
    }

    const toggleCheckBox = (todolistID: string, taskID: string, checked: boolean) => {
        dispatch(changeToggleTaskAC(todolistID, taskID, checked))
    }


    return (
      <div className="App">
          <ButtonAppBar/>

          <Container fixed>
              <Grid container style={{padding: '20px'}}>
                  <Input callBack={addTodolist}/>
              </Grid>
              <Grid container spacing={4}>
                  {
                      todolist.map(t => {
                          const filteredTasks = () => {
                              let tasksForTodolist;
                              switch (t.filter) {
                                  case 'Active':
                                      return tasksForTodolist = tasks[t.id].filter(t => !t.isDone);
                                  case 'Completed':
                                      return tasksForTodolist = tasks[t.id].filter(t => t.isDone);
                                  default:
                                      return tasksForTodolist = tasks[t.id];
                              }
                          }

                          return (
                            <Grid item>

                                <Paper style={{padding: '10px'}}>
                                    <Todolist key={t.id}
                                              todolistId={t.id}
                                              title={t.title}
                                              tasks={filteredTasks()}
                                              removeTask={removeTask}
                                              removeTodolist={removeTodolist}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              toggleCheckBox={toggleCheckBox}
                                              activeFilter={t.filter}
                                              updateTask={updateTask}
                                              updateTodolist={updateTodolist}
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

