import { AppRootState } from "app/store"

//from todolists-reducer
export const todolists = (state: AppRootState) => state.todolists

//from task-reducer
export const tasks = (todolistId: string) => (state: AppRootState) => state.tasks[todolistId]
