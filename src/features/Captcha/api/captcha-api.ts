import { instance } from "common/instanceApi"
import { CaptchaType } from "features/Captcha"
import { AxiosResponse } from "axios"

export const captchaAPI = {
    async getCaptchaUrl() {
        const res = await instance.get<CaptchaType, AxiosResponse<CaptchaType>>("/security/get-captcha-url")
        return res.data
    },
}
