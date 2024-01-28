import React, { ChangeEvent, memo } from "react"
import Checkbox from "@mui/material/Checkbox"
import { DeleteIconButtonCustom, EditableSpan } from "common/components"
import { useActions } from "common/hooks"
import { TaskStatuses } from "common/enums"
import { tasksAsyncActions, TaskType } from "features/TodolistList"
import s from "./Task.module.css"
import { ListItem } from "@mui/material"
import { style } from "./style"
import { RequestStatus } from "app/appSlice"

type Props = {
    task: TaskType
    todolistId: string
    todoEntityStatus: RequestStatus
}

export const Task = memo(({ task, todolistId, todoEntityStatus }: Props) => {
    const { removeTask, updateTask } = useActions(tasksAsyncActions)

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
        <ListItem disablePadding sx={style.listItem}>
            <div className={s.task}>
                <Checkbox
                    checked={task.status === TaskStatuses.Completed}
                    onChange={changeCheckboxStatus}
                    color={"primary"}
                    disabled={todoEntityStatus === "loading" || task.status === TaskStatuses.Deleted}
                />

                <div className={s.text}>
                    <EditableSpan title={task.title} callBack={updateTaskTitleHandler} />
                </div>
            </div>

            <DeleteIconButtonCustom
                size={"small"}
                callback={removeTaskHandler}
                disabled={todoEntityStatus === "loading" || task.status === TaskStatuses.Deleted}
                style={s.button}
            />
        </ListItem>
    )
})
