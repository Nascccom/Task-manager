import React, { memo, useCallback } from "react"
import { DeleteIconButtonCustom, EditableSpan } from "common/components"
import s from "./TodolistTitle.module.css"
import { useActions } from "common/hooks"
import { TodolistDomain, todolistsActions } from "features/TodolistList"

type Props = {
    todolist: TodolistDomain
}
export const TodolistTitle = memo(({ todolist }: Props) => {
    const { id: todolistId, title, entityStatus } = todolist
    const { removeTodolist, updateTodolistTitle } = useActions(todolistsActions)

    const removeTodolistCallback = useCallback(() => {
        removeTodolist(todolistId)
    }, [todolistId])

    const updateTodolistHandler = useCallback(
        (title: string) => {
            updateTodolistTitle({ todolistId, title })
        },
        [todolistId],
    )
    return (
        <h3 className={s.title}>
            <EditableSpan title={title} callBack={updateTodolistHandler} />
            <DeleteIconButtonCustom
                callback={removeTodolistCallback}
                disabled={entityStatus === "loading"}
                style={s.icon}
            />
        </h3>
    )
})
