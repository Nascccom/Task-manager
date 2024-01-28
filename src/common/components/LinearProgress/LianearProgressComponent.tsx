import React from "react"
import LinearProgress from "@mui/material/LinearProgress"
import { useAppSelector } from "common/hooks"
import { selectIsLoadingStatus } from "app/selectors"

export const LinearProgressComponent = () => {
    const loadingStatus = useAppSelector(selectIsLoadingStatus)

    return loadingStatus === "loading" ? <LinearProgress color={"secondary"} /> : <div></div>
}
