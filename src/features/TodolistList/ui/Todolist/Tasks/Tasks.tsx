import React from "react"
import { TaskStatuses } from "common/enums"
import { FilterValues, Task, todolistsSelectors } from "features/TodolistList"
import s from "./Tasks.module.css"
import { RequestStatus } from "app/appSlice"
import { useAppSelector } from "common/hooks"

type Props = {
    activeFilter: FilterValues
    todolistId: string
    todoEntityStatus: RequestStatus
}

export const Tasks = ({ activeFilter, todolistId, todoEntityStatus }: Props) => {
    const tasks = useAppSelector(todolistsSelectors.tasks(todolistId))

    const filteredTasks = () => {
        switch (activeFilter) {
            case "Active":
                return tasks.filter((t) => t.status !== TaskStatuses.Completed)
            case "Completed":
                return tasks.filter((t) => t.status === TaskStatuses.Completed)
            default:
                return tasks
        }
    }

    const mappedTasks = filteredTasks().map((t) => (
        <Task key={t.id} task={t} todolistId={todolistId} todoEntityStatus={todoEntityStatus} />
    ))

    return <ul>{tasks.length ? mappedTasks : <span className={s.noTasks}>No tasks</span>}</ul>
}
