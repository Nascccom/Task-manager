import {instance, ResponseType} from "../instance";
import {AxiosResponse} from "axios";

export const authAPI = {
    getAuthMeData() {
        return instance.get<ResponseType<AuthMeType>, AxiosResponse<ResponseType<AuthMeType>>>('auth/me')
          .then(res => res.data)
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post<ResponseType<{ userId: number }>>('auth/login', {email, password, rememberMe})
          .then(res => res.data)
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
          .then(res => res.data)
    }
}

type AuthMeType = {
    id: number
    email: string
    login: string
}



