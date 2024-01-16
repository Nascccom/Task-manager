import { instance } from "common/instanceApi"
import { AxiosResponse } from "axios"
import { BaseResponse } from "common/types"
import { AuthMe, LoginParams } from "features/Auth"

export const authAPI = {
    async getAuthMeData() {
        const res = await instance.get<BaseResponse<AuthMe>>("auth/me")
        return res.data
    },
    async login(data: LoginParams) {
        const res = await instance.post<
            BaseResponse<{ userId: number }>,
            AxiosResponse<BaseResponse<{ userId: number }>>,
            LoginParams
        >("auth/login", data)
        return res.data
    },
    async logout() {
        const res = await instance.delete<BaseResponse>("auth/login")
        return res.data
    },
}
