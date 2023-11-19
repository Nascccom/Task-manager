import { AppRootStateType } from "app/store"

//from todolists-reducer
export const todolists = (state: AppRootStateType) => state.todolists

//from task-reducer
export const tasks = (todolistId: string) => (state: AppRootStateType) => state.tasks[todolistId]
