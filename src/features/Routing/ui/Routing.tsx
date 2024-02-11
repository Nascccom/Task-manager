import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { TodolistList } from "features/TodolistList"
import { Login } from "features/Auth"
import Container from "@mui/material/Container"

type Props = {
    demo?: boolean
}
export const Routing = ({ demo }: Props) => {
    return (
        <Container fixed maxWidth={false}>
            <Routes>
                <Route path={"/"} element={<TodolistList demo={demo} />} />
                <Route path={"/login"} element={<Login demo={demo} />} />
                <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>} />
                <Route path={"*"} element={<Navigate to={"/404"} />} />
            </Routes>
        </Container>
    )
}
