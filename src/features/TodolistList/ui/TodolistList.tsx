import React, { useCallback } from "react"
import Grid from "@mui/material/Grid"
import { useActions, useAppSelector } from "common/hooks"
import { Navigate } from "react-router-dom"
import { Todolist, todolistsAsyncActions, todolistsSelectors } from "features/TodolistList"
import { authSelectors } from "features/Auth"
import { EntryField } from "common/components"
import { Scrollbar } from "react-scrollbars-custom"
import { style } from "./style"

type Props = {
    demo: boolean
}

export const TodolistList = ({ demo }: Props) => {
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const todolists = useAppSelector(todolistsSelectors.todolists)
    const { addTodolist } = useActions(todolistsAsyncActions)

    const addTodolistHandler = useCallback((title: string) => {
        if (!demo) {
            addTodolist(title)
        }
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    return (
        <Scrollbar style={style.scrollbar}>
            <Grid container sx={style.fieldContainer}>
                <EntryField callBack={addTodolistHandler} />
            </Grid>

            <Grid container spacing={2} sx={style.todolistsContainer}>
                {todolists.map((t) => {
                    return (
                        <Grid item key={t.id}>
                            <Todolist todolist={t} />
                        </Grid>
                    )
                })}
            </Grid>
        </Scrollbar>
    )
}
