import React, { memo, useCallback, useState } from "react"
import DeleteIcon from "@mui/icons-material/Delete"
import IconButton from "@mui/material/IconButton"
import ButtonGroup from "@mui/material/ButtonGroup"
import { FilterValuesType, Task, tasksActions, todolistsActions, todolistsSelectors } from "features/TodolistList"
import { ButtonCustom, EditableSpan, InputCustom } from "common/components"
import { useAppSelector, useActions } from "common/hooks"
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
    const { changeFilter } = useActions(todolistsActions)
    const { removeTodolist, updateTodolistTitle } = useActions(todolistsActions)
    const { addTask } = useActions(tasksActions)
    const [activeButton, setActiveButton] = useState<FilterValuesType>("All")

    const changeFilterButtonHandler = useCallback((todolistId: string, filterValue: FilterValuesType) => {
        changeFilter({ todolistId, filter: filterValue })
        setActiveButton(filterValue)
    }, [])

    const removeTodolistHandler = useCallback(() => {
        removeTodolist(todolistId)
    }, [todolistId])

    const addTaskForTodolistHandler = useCallback(
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

    return (
        <div>
            <h3>
                <EditableSpan title={title} callBack={updateTodolistHandler} />

                <IconButton aria-label='delete' onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <InputCustom callBack={addTaskForTodolistHandler} disabled={entityStatus === "loading"} />

            <ul>{mappedTasks}</ul>

            <ButtonGroup size='large' variant='text' aria-label='large outlined button group' sx={ButtonGroupStyle}>
                <ButtonCustom
                    buttonName={"All"}
                    color={activeButton === "All" ? "success" : "secondary"}
                    callBack={() => changeFilterButtonHandler(todolistId, "All")}
                />
                <ButtonCustom
                    buttonName={"Active"}
                    color={activeButton === "Active" ? "success" : "secondary"}
                    callBack={() => changeFilterButtonHandler(todolistId, "Active")}
                />
                <ButtonCustom
                    buttonName={"Completed"}
                    color={activeButton === "Completed" ? "success" : "secondary"}
                    callBack={() => changeFilterButtonHandler(todolistId, "Completed")}
                />
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
