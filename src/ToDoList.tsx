import React, {useState} from 'react';
import {ButtonUniversal} from './components/Button/Button';
import styles from './Todolist.module.css'
import {Input} from './components/Input/Input';
import {EditableSpan} from './components/EditableSpan';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {SuperCheckBox} from "./components/SuperCheckBox/SuperCheckBox";
import {FilterValuesType} from "./state/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    removeTodolist: (todolistID: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistID: string, valueTitle: string) => void
    toggleCheckBox: (todolistID: string, taskID: string, checked: boolean) => void
    activeFilter: FilterValuesType
    updateTask: (todolistId: string, taskId: string, newTitle: string) => void
    updateTodolist: (todolistId: string, newTitleTodo: string) => void
}

export function Todolist(props: PropsType) {
    const [activeButton, setActiveButton] = useState<FilterValuesType>('all')

    const onClickChangeFilterButtonHandler = (todolistID: string, filterValue: FilterValuesType) => {
        props.changeFilter(todolistID, filterValue)
        setActiveButton(filterValue)
    }
    const onClickDeleteAllTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const addTaskForTodolistHandler = (valueTitle: string) => {
        props.addTask(props.todolistId, valueTitle)
    }
    const updateTodolistHandler = (newTitleTodo: string) => {
        props.updateTodolist(props.todolistId, newTitleTodo)
    }

    const onChangeCheckboxHandler = (taskId: string, checked: boolean) => {
        props.toggleCheckBox(props.todolistId, taskId, checked)
    }

    const mappedTasks = props.tasks.map(t => {
        const removeTaskHandler = () => {
            props.removeTask(props.todolistId, t.id)
        }
        const updateTaskHandler = (newTitle: string) => {
            props.updateTask(props.todolistId, t.id, newTitle)
        }
        return (
          <li key={t.id}
              className={t.isDone ? styles.isDone : ''}>
              <SuperCheckBox callBack={(checked) => onChangeCheckboxHandler(t.id, checked)}
                             checked={t.isDone}/>

              <EditableSpan title={t.title}
                            callBack={updateTaskHandler}/>

              <IconButton aria-label="delete"
                          onClick={removeTaskHandler}>
                  <DeleteIcon/>
              </IconButton>
          </li>
        )
    })


    return (
      <div>
          <h3>
              <EditableSpan title={props.title}
                            callBack={updateTodolistHandler}
              />

              <IconButton aria-label="delete"
                          onClick={onClickDeleteAllTodolistHandler}>
                  <DeleteIcon/>
              </IconButton>
          </h3>
          <Input callBack={addTaskForTodolistHandler}/>
          <ul>
              {mappedTasks}
          </ul>
          <div>
              <ButtonUniversal buttonName={'All'}
                               activeFilter={props.activeFilter}
                               variant={props.activeFilter === 'All' ? 'outlined' : 'text'}
                               color="secondary"
                               callBack={() => onClickChangeFilterButtonHandler(props.todolistId, 'All')}/>
              <ButtonUniversal buttonName={'Active'}
                               variant={props.activeFilter === 'Active' ? 'outlined' : 'text'}
                               color="success"
                               activeFilter={props.activeFilter}
                               callBack={() => onClickChangeFilterButtonHandler(props.todolistId, 'Active')}/>
              <ButtonUniversal buttonName={'Completed'}
                               variant={props.activeFilter === 'Completed' ? 'outlined' : 'text'}
                               color="error"
                               activeFilter={props.activeFilter}
                               callBack={() => onClickChangeFilterButtonHandler(props.todolistId, 'Completed')}/>
          </div>
      </div>
    )
}
