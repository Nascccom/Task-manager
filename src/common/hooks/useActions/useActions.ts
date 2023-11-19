import { useAppDispatch } from "common/hooks"
import { useMemo } from "react"
import { ActionCreatorsMapObject, bindActionCreators } from "@reduxjs/toolkit"

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
    const dispatch = useAppDispatch()

    return useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])
}
