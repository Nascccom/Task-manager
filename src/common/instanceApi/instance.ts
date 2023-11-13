import axios from "axios"

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "dfc294e4-cdd2-4578-b4cc-6a8c08399163",
    },
})
