import React, { FC, memo, useCallback, useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import ButtonGroup from "@mui/material/ButtonGroup"
import Paper from "@mui/material/Paper"
import { FilterValuesType, Task, tasksActions, todolistsActions, todolistsSelectors } from "features/TodolistList"
import { ButtonCustom, EditableSpan, InputValidate } from "common/components"
import { useActions, useAppSelector } from "common/hooks"
import { RequestStatusType } from "app/appSlice"
import { TaskStatuses } from "common/enums"
import { IconButtonCustom } from "common/components"

type PropsType = {
    todolistId: string
    title: string
    activeFilter: FilterValuesType
    entityStatus: RequestStatusType
}

export const Todolist: FC<PropsType> = memo(({ todolistId, title, activeFilter, entityStatus }) => {
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
                return tasks.filter((t) => t.status !== TaskStatuses.Completed)
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
        <Paper style={{ padding: "30px", borderRadius: "8px", maxWidth: "300px", position: "relative" }}>
            <IconButtonCustom
                callback={removeTodolistHandler}
                disabled={entityStatus === "loading"}
                ariaLabel={"delete"}
                style={{ position: "absolute", top: 0, right: 0 }}>
                <DeleteIcon color={"inherit"} />
            </IconButtonCustom>

            <h3>
                <EditableSpan title={title} callBack={updateTodolistHandler} />
            </h3>

            <InputValidate callBack={addTaskHandler} disabled={entityStatus === "loading"} />

            <ul>{mappedTasks}</ul>

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
