import { CSSProperties } from "react"

const style = {
    scrollbar: {
        width: "100%",
        height: "90vh",
        overflowY: "hidden",
    } as CSSProperties,
    fieldContainer: {
        marginTop: "25px",
        justifyContent: "center",
    } as CSSProperties,
    todolistsContainer: {
        display: "flex",
        flexWrap: "nowrap",
        marginTop: "20px",
    } as CSSProperties,
}

export default style
