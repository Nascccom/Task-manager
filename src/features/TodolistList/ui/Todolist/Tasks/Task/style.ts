import { CSSProperties } from "react"

export const style = {
    listItem: {
        justifyContent: "space-between",
        alignItems: "baseline",
        ":hover": {
            backgroundColor: "#ececec",
            cursor: "default",
            borderRadius: "5px",
        },
    } as CSSProperties,
}
