import {instance, ResponseType} from "./instance";
import {AxiosResponse} from "axios";
import {LoginDataType} from "../features/Login/Login";

export const authAPI = {
    getAuthMeData() {
        return instance.get<ResponseType<AuthMeType>, AxiosResponse<ResponseType<AuthMeType>>>('auth/me')
          .then(res => res.data)
    },
    login(data: LoginDataType) {
        return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{
            userId: number
        }>>, LoginDataType>('auth/login', data)
          .then(res => res.data)
    },
    logout() {
        return instance.delete<ResponseType, AxiosResponse<ResponseType>>('auth/login')
          .then(res => res.data)
    }
}

type AuthMeType = {
    id: number
    email: string
    login: string
}



