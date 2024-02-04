import * as captchaSelectors from "./model/selectors"
import * as captchaSlice from "./model/captchaSlice"
import { captchaAPI } from "./api/captcha-api"
import { Captcha } from "./ui/Captcha"

const captchaReducer = captchaSlice.captchaReducer
const captchaAsyncActions = {
    ...captchaSlice.captchaThunks,
}

export { captchaSelectors, captchaReducer, captchaAsyncActions, captchaAPI, Captcha }
export * from "./api/captchaApi.types"
