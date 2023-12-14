import { instance } from "common/instanceApi"
import { AxiosResponse } from "axios"
import { LoginDataType } from "features/Auth/ui/Login"
import { BaseResponseType } from "common/types"
import { AuthMeType } from "features/Auth"

export const authAPI = {
    async getAuthMeData() {
        const res = await instance.get<BaseResponseType<AuthMeType>>("auth/me")
        return res.data
    },
    async login(data: LoginDataType) {
        const res = await instance.post<
            BaseResponseType<{ userId: number }>,
            AxiosResponse<BaseResponseType<{ userId: number }>>,
            LoginDataType
        >("auth/login", data)
        return res.data
    },
    async logout() {
        const res = await instance.delete<BaseResponseType>("auth/login")
        return res.data
    },
}