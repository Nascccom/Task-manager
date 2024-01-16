import React from "react"
import { FilterValues, todolistsActions } from "features/TodolistList"
import { ButtonCustom } from "common/components"
import s from "features/TodolistList/ui/Todolist/Todolist.module.css"
import { useActions } from "common/hooks"

type Props = {
    activeFilter: FilterValues
    todolistId: string
}
export const FilterTasksButtons = ({ activeFilter, todolistId }: Props) => {
    const { changeFilter } = useActions(todolistsActions)

    const filterButtonHandler = (filter: FilterValues) => {
        changeFilter({ todolistId, filter })
    }

    const renderFilterButton = (onClick: (filter: FilterValues) => void, buttonFilter: FilterValues) => {
        return (
            <ButtonCustom
                buttonName={buttonFilter}
                color={activeFilter === buttonFilter ? "success" : "secondary"}
                callBack={() => onClick(buttonFilter)}
                style={s.button}
            />
        )
    }

    return (
        <>
            {renderFilterButton(filterButtonHandler, "All")}
            {renderFilterButton(filterButtonHandler, "Active")}
            {renderFilterButton(filterButtonHandler, "Completed")}
        </>
    )
}
