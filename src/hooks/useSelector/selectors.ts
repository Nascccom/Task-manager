import {AppRootStateType} from "../../app/store";

//from app-reducer
export const selectIsLoadingStatus = (state: AppRootStateType) => state.app.status

//from auth-reducer
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn

//from todolists-reducer
export const selectTodolists = (state: AppRootStateType) => state.todolists

//from task-reducer
export const selectTasks = (todolistId: string) => (state: AppRootStateType) => state.tasks[todolistId];