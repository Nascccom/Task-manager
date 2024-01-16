import React from "react"
import CircularProgress from "@mui/material/CircularProgress"
import s from "./Preloader.module.css"

type Props = {
    size?: number
    thickness?: number
}

export const Preloader = ({ size = 150, thickness = 3 }: Props) => {
    return (
        <div className={s.preloader}>
            <CircularProgress color='secondary' size={size} thickness={thickness} />
        </div>
    )
}
