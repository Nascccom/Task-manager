import React, { FC, memo, useCallback, useState } from "react"
import { InputCustom } from "common/components"

type PropsType = {
    /** Optional click handler */
    callBack: (valueTitle: string) => void
    /** Input is disabled or not */
    disabled?: boolean
}

export const InputValidate: FC<PropsType> = memo(({ callBack, disabled }) => {
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<null | string>(null)

    const setTitleHandler = useCallback(
        (title: string) => {
            setError(null)
            setTitle(title)
        },
        [title],
    )

    const addClickHandler = useCallback(() => {
        if (title.trim()) {
            callBack(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }
    }, [title])

    return (
        <InputCustom
            disabled={disabled}
            error={error}
            title={title}
            setTitleCallback={setTitleHandler}
            callback={addClickHandler}
        />
    )
})
