import React, { useCallback } from "react"
import Grid from "@mui/material/Grid"
import { useActions, useAppSelector } from "common/hooks"
import { Navigate } from "react-router-dom"
import { Todolist, todolistsActions, todolistsSelectors } from "features/TodolistList"
import { authSelectors } from "features/Auth"
import { InputValidate } from "common/components"
import { Scrollbar } from "react-scrollbars-custom"

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
        <Scrollbar style={{ width: "100%", height: "90vh", overflowY: "hidden" }}>
            <Grid container style={{ marginTop: "25px", justifyContent: "center" }}>
                <InputValidate callBack={addTodolistHandler} />
            </Grid>

            <Grid wrap={"nowrap"} container spacing={2} sx={{ marginTop: "20px" }}>
                {todolists.map((t) => {
                    return (
                        <Grid item key={t.id}>
                            <Todolist
                                todolistId={t.id}
                                entityStatus={t.entityStatus}
                                title={t.title}
                                activeFilter={t.filter}
                            />
                        </Grid>
                    )
                })}
            </Grid>
        </Scrollbar>
    )
}
