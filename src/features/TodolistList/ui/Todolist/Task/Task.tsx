import React, { memo, useCallback } from "react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import styles from "features/TodolistList/ui/Todolist/Todolist.module.css"
import { CheckboxCustom, EditableSpan } from "common/components"
import { useActions } from "common/hooks"
import { TaskStatuses } from "common/enums"
import { tasksActions, TaskType } from "features/TodolistList"

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
        (newStatus: TaskStatuses) => {
            const part = { status: newStatus }
            updateTask({ todolistId, taskId: task.id, changingPart: part })
        },
        [todolistId, task.id],
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
