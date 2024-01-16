import { AppRootState } from "app/store"

export const selectIsLoadingStatus = (state: AppRootState) => state.app.status
export const selectIsInitialized = (state: AppRootState) => state.app.isInitialized
