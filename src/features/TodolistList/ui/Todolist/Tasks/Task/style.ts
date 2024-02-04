import { CSSProperties } from "react"

export const style = {
    listItem: {
        justifyContent: "space-between",
        alignItems: "baseline",
        ":hover": {
            backgroundColor: "var(--focusColor)",
            cursor: "default",
            borderRadius: "5px",
        },
    } as CSSProperties,
}
