import * as React from "react"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

type Props = {
    error: string | null
    setErrorMessage: (p: { error: null }) => void
}
export const ErrorSnackbars = ({ error, setErrorMessage }: Props) => {
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return
        }
        setErrorMessage({ error: null })
    }

    return (
        <Snackbar open={!!error} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'>
                {error}
            </Alert>
        </Snackbar>
    )
}
