import React, { memo, useCallback, useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import ButtonGroup from "@mui/material/ButtonGroup"
import { FilterValuesType, Task, tasksActions, todolistsActions, todolistsSelectors } from "features/TodolistList"
import { ButtonCustom, EditableSpan, InputCustom } from "common/components"
import { useActions, useAppSelector } from "common/hooks"
import { RequestStatusType } from "app/app-reducer"
import { TaskStatuses } from "common/enums"

type PropsType = {
    todolistId: string
    title: string
    activeFilter: FilterValuesType
    entityStatus: RequestStatusType
}

export const Todolist = memo(({ todolistId, title, activeFilter, entityStatus }: PropsType) => {
    const tasks = useAppSelector(todolistsSelectors.tasks(todolistId))
    const { removeTodolist, updateTodolistTitle, changeFilter } = useActions(todolistsActions)
    const { addTask } = useActions(tasksActions)
    const [activeButton, setActiveButton] = useState<FilterValuesType>("All")

    const changeFilterButtonHandler = useCallback((todolistId: string, filterValue: FilterValuesType) => {
        changeFilter({ todolistId, filter: filterValue })
        setActiveButton(filterValue)
    }, [])

    const removeTodolistHandler = useCallback(() => {
        removeTodolist(todolistId)
    }, [todolistId])

    const addTaskHandler = useCallback(
        (valueTitle: string) => {
            addTask({ todolistId, title: valueTitle })
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
                return tasks.filter((t) => t.status === TaskStatuses.New)
            case "Completed":
                return tasks.filter((t) => t.status === TaskStatuses.Completed)
            default:
                return tasks
        }
    }

    const mappedTasks = filteredTasks().map((t) => <Task key={t.id} task={t} todolistId={todolistId} />)
    const renderFilterButton = (
        onClick: (todolistId: string, filter: FilterValuesType) => void,
        buttonFilter: FilterValuesType,
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
        <div>
            <h3>
                <EditableSpan title={title} callBack={updateTodolistHandler} />

                <IconButton aria-label='delete' onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <InputCustom callBack={addTaskHandler} disabled={entityStatus === "loading"} />

            <ul>{mappedTasks}</ul>

            <ButtonGroup size='large' variant='text' aria-label='large outlined button group' sx={ButtonGroupStyle}>
                {renderFilterButton(changeFilterButtonHandler, "All")}
                {renderFilterButton(changeFilterButtonHandler, "Active")}
                {renderFilterButton(changeFilterButtonHandler, "Completed")}
            </ButtonGroup>
        </div>
    )
})

export const ButtonGroupStyle = {
    display: "flex",
    justifyContent: "flex-start",
    ".MuiButtonGroup-grouped:not(:last-of-type)": {
        border: "none",
    },
}
