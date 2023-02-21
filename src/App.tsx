import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './ToDoList';
import {v1} from 'uuid';
import {Input} from './components/Input/Input';
import {ButtonAppBar} from './components/ButtonAppBar/ButtonAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeFilterAC,
    changeTitleTodolistAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";

export type FilterValuesType = 'All' | 'all' | 'Active' | 'Completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolist, dispatchTodolist] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    });

    const addTodolist = (title: string) => {
        const newId = v1()
        const newTodo: TodolistType = {id: newId, title: title, filter: 'all'}
        dispatchTodolist(addTodolistAC(title))
        // setTodolist([...todolist, newTodo])
        setTasks({
            [newId]: [],
            ...tasks
        })
    }
    const updateTodolist = (todolistId: string, newTitleTodo: string) => {
        dispatchTodolist(changeTitleTodolistAC(todolistId, newTitleTodo))
        // setTodolist(todolist.map(el => el.id === todolistId
        //   ? {...el, title: newTitleTodo}
        //   : el))
    }
    const removeTodolist = (todolistID: string) => {
        dispatchTodolist(removeTodolistAC(todolistID))
        // setTodolist(deleteTodolist)
        delete tasks[todolistID]
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        dispatchTodolist(changeFilterAC(todolistID, value))

        // setTodolist(todolist.map(el => {
        //     let changeFilterInTask;
        //     el.id === todolistID
        //       ? changeFilterInTask = {...el, filter: value}
        //       : changeFilterInTask = el
        //     return changeFilterInTask
        // }))
    }

    const addTask = (todolistID: string, valueTitle: string) => {
        let newTask = {id: v1(), title: valueTitle, isDone: false}
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const updateTask = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({
            ...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId
              ? {...el, title: newTitle}
              : el)
        })
    }
    function removeTask(todolistId: string, taskId: string) {
        let filteredTasks = tasks[todolistId].filter(t => t.id !== taskId)
        setTasks({...tasks, [todolistId]: filteredTasks})
    }
    const toggleCheckBox = (todolistID: string, taskID: string, checked: boolean) => {
        let toggle = tasks[todolistID].map(el => taskID === el.id
          ? {...el, isDone: checked}
          : el)
        setTasks({...tasks, [todolistID]: toggle})
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

