import React, { useState } from "react"
import { Task } from "features/TodolistList/ui/Todolist/Task/Task"
import { ButtonCustom, EditableSpan, InputCustom } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { action } from "@storybook/addon-actions"
import ButtonGroup from "@mui/material/ButtonGroup"
import { ButtonGroupStyle, Todolist } from "features/TodolistList/ui/Todolist/ToDoList"
import { ReduxStoreProviderDecorator } from "stories/ReduxStoreProviderDecorator/ReduxStoreProviderDecorator"
import { FilterValuesType, todolistsActions } from "features/TodolistList/model/todolistsSlice"
import { selectTasks, useAppDispatch, useAppSelector } from "common/hooks"
import { RequestStatusType } from "app/app-reducer"
import { TaskPriorities, TaskStatuses } from "common/enums"
import { TaskType } from "features/TodolistList/api/tasksApi.types"
import { tasksActions, tasksThunks } from "features/TodolistList/model/taskSlice"

export default {
    title: "TODOLISTS/Todolist",
    component: Todolist,
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
    excludeStories: /.*initialGlobalState$/,
}

type ReduxTodolistType = {
    todolistId: string
    title: string
    entityStatus: RequestStatusType
}

const newTask = (todolistId: string, valueTitle: string): TaskType => {
    return {
        id: Math.random().toString(),
        completed: true,
        title: valueTitle,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: todolistId,
        order: 0,
        addedDate: "",
        description: "",
    }
}

const ReduxTodolist = ({ todolistId, title, entityStatus }: ReduxTodolistType) => {
    const tasks = useAppSelector(selectTasks(todolistId))
    const dispatch = useAppDispatch()
    const [activeButton, setActiveButton] = useState<FilterValuesType>("All")
    const [titleTodo, setTitleTodo] = useState("")

    const changeFilterButtonHandler = (todolistId: string, filterValue: FilterValuesType) => {
        dispatch(todolistsActions.changeFilter({ todolistId, filter: filterValue }))
        setActiveButton(filterValue)
    }

    const addTaskForTodolistHandler = (valueTitle: string) => {
        dispatch(
            tasksThunks.addTask.fulfilled({ todolistId, task: newTask(todolistId, valueTitle) }, "requestId", {
                todolistId,
                title: valueTitle,
            }),
        )
    }

    const filteredTasks = (): TaskType[] => {
        let tasksForTodolist
        switch (activeButton) {
            case "Active":
                return (tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New))
            case "Completed":
                return (tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed))
            default:
                return (tasksForTodolist = tasks)
        }
    }

    const mappedTasks = filteredTasks().map((t) => <Task key={t.id} task={t} todolistId={todolistId} />)

    return (
        <div>
            <h3>
                <EditableSpan title={title} callBack={action("Title was changed")} />

                <IconButton aria-label='delete' onClick={action("Todolist was removed")}>
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
}

export const Todolist1 = {
    decorators: [() => <ReduxTodolist todolistId={"todolistId1"} title={"Cold "} entityStatus={"idle"} />],
}

export const Todolist2 = {
    decorators: [() => <ReduxTodolist todolistId={"todolistId2"} title={"New "} entityStatus={"loading"} />],
}
