import React, { memo, useCallback, useState } from "react"
import ButtonGroup from "@mui/material/ButtonGroup"
import Paper from "@mui/material/Paper"
import { FilterValues, Task, tasksActions, todolistsActions, todolistsSelectors } from "features/TodolistList"
import { ButtonCustom, DeleteIconButtonCustom, EditableSpan, EntryField } from "common/components"
import { useActions, useAppSelector } from "common/hooks"
import { RequestStatus } from "app/appSlice"
import { TaskStatuses } from "common/enums"

type Props = {
    todolistId: string
    title: string
    activeFilter: FilterValues
    entityStatus: RequestStatus
}

export const Todolist = memo(({ todolistId, title, activeFilter, entityStatus }: Props) => {
    const tasks = useAppSelector(todolistsSelectors.tasks(todolistId))
    const { removeTodolist, updateTodolistTitle, changeFilter } = useActions(todolistsActions)
    const { addTask } = useActions(tasksActions)
    const [activeButton, setActiveButton] = useState<FilterValues>("All")

    const changeFilterButtonHandler = useCallback((todolistId: string, filterValue: FilterValues) => {
        changeFilter({ todolistId, filter: filterValue })
        setActiveButton(filterValue)
    }, [])

    const removeTodolistCallback = useCallback(() => {
        removeTodolist(todolistId)
    }, [todolistId])

    const addTaskCallback = useCallback(
        (title: string) => {
            addTask({ todolistId, title })
        },
        [todolistId],
    )

    const updateTodolistHandler = useCallback(
        (newTitle: string) => {
            updateTodolistTitle({ todolistId, title: newTitle })
        },
        [todolistId],
    )

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
        <Task key={t.id} task={t} todolistId={todolistId} todoEntityStatus={entityStatus} />
    ))
    const renderFilterButton = (
        onClick: (todolistId: string, filter: FilterValues) => void,
        buttonFilter: FilterValues,
    ) => {
        return (
            <ButtonCustom
                buttonName={buttonFilter}
                color={activeFilter === buttonFilter ? "success" : "secondary"}
                callBack={() => onClick(todolistId, buttonFilter)}
            />
        )
    }

    return (
        <Paper style={{ padding: "30px", borderRadius: "8px", width: "300px", position: "relative" }}>
            <DeleteIconButtonCustom callback={removeTodolistCallback} disabled={entityStatus === "loading"} />

            <div style={{ overflowWrap: "break-word" }}>
                <h3>
                    <EditableSpan title={title} callBack={updateTodolistHandler} />
                </h3>
            </div>
            <EntryField callBack={addTaskCallback} disabled={entityStatus === "loading"} />

            <ul>{tasks.length ? mappedTasks : <span style={{ color: "#bdb8b8", padding: "10px" }}>No tasks</span>}</ul>

            <ButtonGroup size='large' variant='text' aria-label='large outlined button group' sx={ButtonGroupStyle}>
                {renderFilterButton(changeFilterButtonHandler, "All")}
                {renderFilterButton(changeFilterButtonHandler, "Active")}
                {renderFilterButton(changeFilterButtonHandler, "Completed")}
            </ButtonGroup>
        </Paper>
    )
})

export const ButtonGroupStyle = {
    display: "flex",
    justifyContent: "flex-start",
    ".MuiButtonGroup-grouped:not(:last-of-type)": {
        border: "none",
    },
}
