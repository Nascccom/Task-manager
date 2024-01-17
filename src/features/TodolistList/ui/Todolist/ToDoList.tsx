import React, { memo, useCallback } from "react"
import s from "./Todolist.module.css"
import Paper from "@mui/material/Paper"
import { FilterTasksButtons, Tasks, tasksActions, TodolistDomain, TodolistTitle } from "features/TodolistList"
import { EntryField } from "common/components"
import { useActions } from "common/hooks"

type Props = {
    todolist: TodolistDomain
}

export const Todolist = memo(({ todolist }: Props) => {
    const { id: todolistId, entityStatus, filter: activeFilter } = todolist
    const { addTask } = useActions(tasksActions)

    const addTaskCallback = useCallback(
        (title: string) => {
            addTask({ todolistId, title })
        },
        [todolistId],
    )

    return (
        <Paper className={s.todolist}>
            <TodolistTitle todolist={todolist} />
            <EntryField callBack={addTaskCallback} disabled={entityStatus === "loading"} />
            <Tasks activeFilter={activeFilter} todoEntityStatus={entityStatus} todolistId={todolistId} />

            <div className={s.buttonsGroup}>
                <FilterTasksButtons activeFilter={activeFilter} todolistId={todolistId} />
            </div>
        </Paper>
    )
})
