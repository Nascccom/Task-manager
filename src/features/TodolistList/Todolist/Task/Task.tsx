import React, { memo, useCallback } from "react"
import styles from "../Todolist.module.css"
import { CheckboxCustom, EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { removeTask, updateTask } from "./task-reducer"
import { TaskType } from "api/tasks-api"
import { useAppDispatch } from "common/hooks"
import { TaskStatuses } from "common/enums"

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo(({ task, todolistId }: TaskPropsType) => {
    const dispatch = useAppDispatch()

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTask({ todolistId, taskId: task.id }))
    }, [dispatch, todolistId, task.id])

    const updateTaskTitleHandler = useCallback(
        (newTitle: string) => {
            dispatch(updateTask({ todolistId, taskId: task.id, changingPart: { title: newTitle } }))
        },
        [dispatch, todolistId, task.id],
    )

    const changeCheckboxStatus = useCallback(
        (newStatus: TaskStatuses) => {
            const part = { status: newStatus }
            dispatch(updateTask({ todolistId, taskId: task.id, changingPart: part }))
        },
        [dispatch, todolistId, task.id],
    )

    return (
        <li className={task.status === TaskStatuses.Completed ? styles.isDone : ""}>
            <CheckboxCustom
                callBack={(checked: boolean) =>
                    changeCheckboxStatus(checked ? TaskStatuses.Completed : TaskStatuses.New)
                }
                checked={task.status === TaskStatuses.Completed}
            />

            <EditableSpan title={task.title} callBack={updateTaskTitleHandler} />

            <IconButton aria-label='delete' onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </li>
    )
})
