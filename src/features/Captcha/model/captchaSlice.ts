import { createSlice, isAnyOf } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils"
import { captchaAPI, CaptchaType } from "features/Captcha"
import { authAsyncActions } from "features/Auth"

const slice = createSlice({
    name: "captcha",
    initialState: {
        captchaUrl: null as null | string,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCaptchaUrl.fulfilled, (state, action) => {
                state.captchaUrl = action.payload.url
            })
            .addMatcher(isAnyOf(authAsyncActions.login.fulfilled), (state) => {
                state.captchaUrl = null
            })
    },
})

const getCaptchaUrl = createAppAsyncThunk<CaptchaType, undefined>(`${slice.name}/getCaptchaUrl`, async (_) => {
    return await captchaAPI.getCaptchaUrl()
})

export const captchaReducer = slice.reducer
export const captchaThunks = { getCaptchaUrl }

//types
