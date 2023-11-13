import { instance } from "common/instanceApi"
import { AxiosResponse } from "axios"
import { LoginDataType } from "features/Login/Login"
import { ResponseType } from "common/types"

export const authAPI = {
    async getAuthMeData() {
        const res = await instance.get<ResponseType<AuthMeType>>("auth/me")
        return res.data
    },
    async login(data: LoginDataType) {
        const res = await instance.post<
            ResponseType<{ userId: number }>,
            AxiosResponse<ResponseType<{ userId: number }>>,
            LoginDataType
        >("auth/login", data)
        return res.data
    },
    async logout() {
        const res = await instance.delete<ResponseType>("auth/login")
        return res.data
    },
}

type AuthMeType = {
    id: number
    email: string
    login: string
}
