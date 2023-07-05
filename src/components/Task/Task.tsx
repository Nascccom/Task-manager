import React, {memo, useCallback} from 'react';
import styles from "../Todolist/Todolist.module.css";
import {SuperCheckBox} from "../SuperCheckBox/SuperCheckBox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {removeTaskTC, updateTaskTC} from "../../state/reducers/task-reducer";
import {TaskStatuses, TaskType} from "../../api/tasksAPI/tasks-api";
import {useAppDispatch} from "../../hooks/useDiapstch/useDispacth";

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo(({task, todolistId}: TaskPropsType) => {
    const dispatch = useAppDispatch()

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskTC(todolistId, task.id));
    }, [dispatch, todolistId, task.id])

    const updateTaskTitleHandler = useCallback((newTitle: string) => {
        const part = {title: newTitle}
        dispatch(updateTaskTC(todolistId, task.id, part))
    }, [dispatch, todolistId, task.id])

    const changeCheckboxStatus = useCallback((newStatus: TaskStatuses) => {
        const part = {status: newStatus}
        dispatch(updateTaskTC(todolistId, task.id, part))
    }, [dispatch, todolistId, task.id])

    return (
      <li className={task.status === TaskStatuses.Completed ? styles.isDone : ''}>
          <SuperCheckBox
            callBack={(checked: boolean) => changeCheckboxStatus(checked ? TaskStatuses.Completed : TaskStatuses.New)}
            checked={task.status === TaskStatuses.Completed}/>

          <EditableSpan title={task.title}
                        callBack={updateTaskTitleHandler}/>

          <IconButton aria-label="delete"
                      onClick={removeTaskHandler}>
              <DeleteIcon/>
          </IconButton>
      </li>
    )
});