import React, { ChangeEvent, memo } from "react"
import Checkbox from "@mui/material/Checkbox"
import { DeleteIconButtonCustom, EditableSpan } from "common/components"
import { useActions } from "common/hooks"
import { TaskStatuses } from "common/enums"
import { tasksActions, TaskType } from "features/TodolistList"
import style from "features/TodolistList/ui/Todolist/Tasks/Task/Task.module.css"
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

            <DeleteIconButtonCustom
                size={"small"}
                callback={removeTaskHandler}
                disabled={todoEntityStatus === "loading" || task.status === TaskStatuses.Deleted}
            />
        </li>
    )
})
