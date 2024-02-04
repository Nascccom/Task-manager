import { AppRootState } from "app/store"

export const selectCaptchaUrl = (state: AppRootState) => state.captcha.captchaUrl
