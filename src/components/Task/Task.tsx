import React, {memo, useCallback} from 'react';
import styles from "../Todolist/Todolist.module.css";
import {SuperCheckBox} from "../SuperCheckBox/SuperCheckBox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {changeToggleTaskAC, removeTaskAC, updateTaskAC} from "../../state/reducers/task-reducer";
import {TaskType} from "../../api/tasksAPI/tasks-api";


export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo(({task, todolistId}: TaskPropsType) => {
    const dispatch = useDispatch()

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskAC(todolistId, task.id))
    }, [dispatch, todolistId, task.id])

    const updateTaskTitleHandler = useCallback((newTitle: string) => {
        dispatch(updateTaskAC(todolistId, task.id, newTitle))
    }, [dispatch, todolistId, task.id])

    const changeCheckboxStatus = useCallback((checked: boolean) => {
        dispatch(changeToggleTaskAC(todolistId, task.id, checked))
    }, [dispatch, todolistId, task.id])

    return (
      <li className={task.completed ? styles.isDone : ''}>
          <SuperCheckBox callBack={(checked) => changeCheckboxStatus(checked)}
                         checked={task.completed}/>

          <EditableSpan title={task.title}
                        callBack={updateTaskTitleHandler}/>

          <IconButton aria-label="delete"
                      onClick={removeTaskHandler}>
              <DeleteIcon/>
          </IconButton>
      </li>
    )
});