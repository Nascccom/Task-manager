import React, { ChangeEvent, FC, memo, useCallback } from "react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "common/components"
import { useActions } from "common/hooks"
import { TaskStatuses } from "common/enums"
import { tasksActions, TaskType } from "features/TodolistList"

import style from "./Task.module.css"

type PropsType = {
    task: TaskType
    todolistId: string
}

export const Task: FC<PropsType> = memo(({ task, todolistId }) => {
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
            const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.InProgress
            updateTask({ todolistId, taskId: task.id, changingPart: { status } })
        },
        [todolistId, task.id],
    )

    return (
        <li className={task.status === TaskStatuses.Completed ? style.listItemIsDone : style.listItem}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={changeCheckboxStatus}
                color='success'
            />

            <EditableSpan title={task.title} callBack={updateTaskTitleHandler} />

            <IconButton
                size={"small"}
                aria-label='delete'
                onClick={removeTaskHandler}
                style={{ position: "absolute", top: "3px", right: "-25px" }}>
                <DeleteIcon fontSize={"small"} />
            </IconButton>
        </li>
    )
})
