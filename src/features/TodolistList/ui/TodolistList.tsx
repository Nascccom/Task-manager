import React, { useCallback } from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { Todolist } from "features/TodolistList/ui/Todolist/ToDoList"
import { useAppSelector, useAppDispatch, selectIsLoggedIn, selectTodolists } from "common/hooks"
import { createTodolistTC } from "features/TodolistList/model/todolistsSlice"
import { Navigate } from "react-router-dom"
import { InputCustom } from "common/components"

type PropsType = {
    demo: boolean
}

export const TodolistList = ({ demo }: PropsType) => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const todolists = useAppSelector(selectTodolists)
    const dispatch = useAppDispatch()

    const addTodolist = useCallback(
        (title: string) => {
            if (!demo) {
                dispatch(createTodolistTC(title))
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
            <Grid container spacing={2} sx={{ justifyContent: "center", marginTop: "20px" }}>
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
