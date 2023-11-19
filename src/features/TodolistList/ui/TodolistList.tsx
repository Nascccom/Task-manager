import React, { useCallback } from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { Navigate } from "react-router-dom"
import { InputCustom } from "common/components"
import { todolistsThunks, Todolist, todolistsSelectors } from "features/TodolistList"
import { authSelectors } from "features/Auth"

type PropsType = {
    demo: boolean
}

export const TodolistList = ({ demo }: PropsType) => {
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const todolists = useAppSelector(todolistsSelectors.todolists)
    const dispatch = useAppDispatch()

    const addTodolist = useCallback(
        (title: string) => {
            if (!demo) {
                dispatch(todolistsThunks.addTodolist(title))
            }
        },
        [dispatch],
    )

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    return (
        <>
            <Grid container style={{ marginTop: "25px", justifyContent: "center" }}>
                <InputCustom callBack={addTodolist} />
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: "space-evenly", marginTop: "20px" }}>
                {todolists.map((t) => {
                    return (
                        <Grid item key={t.id}>
                            <Paper style={{ padding: "30px", borderRadius: "8px" }}>
                                <Todolist
                                    todolistId={t.id}
                                    entityStatus={t.entityStatus}
                                    title={t.title}
                                    activeFilter={t.filter}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}
