import { AppRootStateType } from "app/store"

export const selectIsLoadingStatus = (state: AppRootStateType) => state.app.status
export const selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized
