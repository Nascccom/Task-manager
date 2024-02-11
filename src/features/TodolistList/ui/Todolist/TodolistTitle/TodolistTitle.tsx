import React, { memo, useCallback } from "react"
import { DeleteIconButtonCustom, EditableSpan } from "common/components"
import s from "./TodolistTitle.module.css"
import { useActions } from "common/hooks"
import { todolistsAsyncActions } from "features/TodolistList"
import { RequestStatus } from "app/appSlice"

type Props = {
    todolistId: string
    title: string
    entityStatus: RequestStatus
}
export const TodolistTitle = memo(({ todolistId, title, entityStatus }: Props) => {
    const { removeTodolist, updateTodolistTitle } = useActions(todolistsAsyncActions)

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
