import React, { ChangeEvent, memo, useCallback } from "react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import styles from "features/TodolistList/ui/Todolist/Todolist.module.css"
import { EditableSpan } from "common/components"
import { useActions } from "common/hooks"
import { TaskStatuses } from "common/enums"
import { tasksActions, TaskType } from "features/TodolistList"
import Checkbox from "@mui/material/Checkbox"

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo(({ task, todolistId }: TaskPropsType) => {
    const { removeTask, updateTask } = useActions(tasksActions)

    const removeTaskHandler = useCallback(() => {
        removeTask({ todolistId, taskId: task.id })
    }, [todolistId, task.id])

    const updateTaskTitleHandler = useCallback(
        (newTitle: string) => {
            updateTask({ todolistId, taskId: task.id, changingPart: { title: newTitle } })
        },
        [todolistId, task.id],
    )

    const changeCheckboxStatus = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            updateTask({ todolistId, taskId: task.id, changingPart: { status: e.currentTarget.checked } })
        },
        [todolistId, task.id],
    )

    return (
        <li className={task.status === TaskStatuses.Completed ? styles.isDone : ""}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={changeCheckboxStatus}
                color='success'
            />

            <EditableSpan title={task.title} callBack={updateTaskTitleHandler} />

            <IconButton aria-label='delete' onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </li>
    )
})
