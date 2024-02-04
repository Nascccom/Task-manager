import React from "react"
import FormLabel from "@mui/material/FormLabel"

export const FormInfo = () => {
    return (
        <FormLabel>
            <p>
                To log in get registered
                <a href={"https://social-network.samuraijs.com/"} target={"_blank"}>
                    {" "}
                    here
                </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
        </FormLabel>
    )
}
