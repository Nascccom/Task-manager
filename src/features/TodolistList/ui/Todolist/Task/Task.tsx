import React, { ChangeEvent, memo } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan, IconButtonCustom } from "common/components"
import { useActions } from "common/hooks"
import { TaskStatuses } from "common/enums"
import { tasksActions, TaskType } from "features/TodolistList"
import style from "./Task.module.css"
import { RequestStatus } from "app/appSlice"

type Props = {
    task: TaskType
    todolistId: string
    todoEntityStatus: RequestStatus
}

export const Task = memo(({ task, todolistId, todoEntityStatus }: Props) => {
    const { removeTask, updateTask } = useActions(tasksActions)

    const removeTaskHandler = () => {
        removeTask({ todolistId, taskId: task.id })
    }

    const updateTaskTitleHandler = (title: string) => {
        updateTask({ todolistId, taskId: task.id, changingPart: { title } })
    }

    const changeCheckboxStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.InProgress
        updateTask({ todolistId, taskId: task.id, changingPart: { status } })
    }

    return (
        <li className={task.status === TaskStatuses.Completed ? style.listItemIsDone : style.listItem}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                onChange={changeCheckboxStatus}
                color='success'
                disabled={todoEntityStatus === "loading" || task.status === TaskStatuses.Deleted}
            />

            <EditableSpan title={task.title} callBack={updateTaskTitleHandler} />

            <IconButtonCustom
                size={"small"}
                aria-label='delete'
                style={{ position: "absolute", top: "3px", right: "-25px" }}
                callback={removeTaskHandler}
                disabled={todoEntityStatus === "loading" || task.status === TaskStatuses.Deleted}>
                <DeleteIcon fontSize={"small"} />
            </IconButtonCustom>
        </li>
    )
})
