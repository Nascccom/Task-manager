import React, { useCallback } from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useAppSelector, useActions } from "common/hooks"
import { Navigate } from "react-router-dom"
import { InputCustom } from "common/components"
import { Todolist, todolistsActions, todolistsSelectors } from "features/TodolistList"
import { authSelectors } from "features/Auth"

type PropsType = {
    demo: boolean
}

export const TodolistList = ({ demo }: PropsType) => {
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const todolists = useAppSelector(todolistsSelectors.todolists)
    const { addTodolist } = useActions(todolistsActions)

    const addTodolistHandler = useCallback((title: string) => {
        if (!demo) {
            addTodolist(title)
        }
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    return (
        <>
            <Grid container style={{ marginTop: "25px", justifyContent: "center" }}>
                <InputCustom callBack={addTodolistHandler} />
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
