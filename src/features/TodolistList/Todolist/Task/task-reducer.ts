import { tasksAPI, TaskType, UpdateTaskModelType } from "api/tasks-api"
import { AppRootStateType, AppThunk } from "app/store"
import { appActions } from "app/app-reducer"
import { handleServerNetworkError } from "utils/handleServerError"
import { AppThunkDispatch } from "hooks/useDiapstch/useDispacth"
import { handleSuccessResponse } from "utils/handleSuccessResponse"
import { todolistsActions } from "../../todolists-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const tasksSlice = createSlice({
    name: "tasks",
    // 'todolistId': [{
    //     description: '', id: v1(), title: 'NJJJJ', completed: false, status: 0, priority: 0,
    //     startDate: '', deadline: '', todoListId: 'd6a00fdd-2582-4ddb-8f28-2b3c1022784f', order: 0, addedDate: ''
    // }]
    initialState: {} as TasksStateType,
    reducers: {
        removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((t) => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTask: (state, action: PayloadAction<{ todolistId: string; task: TaskType }>) => {
            const tasks = state[action.payload.todolistId]
            tasks.unshift(action.payload.task)
        },
        updateTask: (state, action: PayloadAction<{ todolistId: string; taskId: string; task: TaskType }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((t) => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = action.payload.task
            }
        },
        setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(todolistsActions.addTodolist, (state, action) => {
                state[action.payload.todolist.id] = []
            })
            .addCase(todolistsActions.removeTodolist, (state, action) => {
                delete state[action.payload.todolistId]
            })
            .addCase(todolistsActions.setTodolist, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = []
                })
            })
            .addCase(todolistsActions.deleteAllTodolistsWithTasks, () => {
                return {}
            })
    },
})

export const tasksActions = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer

//ThunkCreators
export const getTasksTC =
    (todolistId: string): AppThunk =>
    (dispatch: AppThunkDispatch) => {
        dispatch(appActions.setLoadingStatus({ status: "loading" }))

        tasksAPI
            .getTasks(todolistId)
            .then((res) => {
                dispatch(tasksActions.setTasks({ todolistId, tasks: res.items }))
                dispatch(appActions.setLoadingStatus({ status: "succeeded" }))
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }

export const removeTaskTC =
    (todolistId: string, taskId: string): AppThunk =>
    (dispatch: AppThunkDispatch) => {
        dispatch(appActions.setLoadingStatus({ status: "loading" }))

        tasksAPI
            .deleteTask(todolistId, taskId)
            .then((res) => {
                handleSuccessResponse(dispatch, tasksActions.removeTask, res, { todolistId, taskId })
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }

export const addTaskTC =
    (todolistId: string, textForTask: string): AppThunk =>
    (dispatch: AppThunkDispatch) => {
        dispatch(appActions.setLoadingStatus({ status: "loading" }))

        tasksAPI
            .createTask(todolistId, textForTask)
            .then((res) => {
                handleSuccessResponse(dispatch, tasksActions.addTask, res, { todolistId, task: res.data.item })
            })
            .catch((err) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }

export const updateTaskTC =
    (todolistId: string, taskId: string, changingPart: Object): AppThunk =>
    (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find((t) => t.id === taskId)

        if (task) {
            const newModel: UpdateTaskModelType = {
                title: task.title,
                completed: task.completed,
                description: task.description,
                deadline: task.deadline,
                startDate: task.startDate,
                status: task.status,
                priority: task.priority,
                ...changingPart,
            }

            dispatch(appActions.setLoadingStatus({ status: "loading" }))

            tasksAPI
                .updateTask(todolistId, taskId, newModel)
                .then((res) => {
                    const updatedTask: TaskType = res.data.item
                    handleSuccessResponse(dispatch, tasksActions.updateTask, res, {
                        todolistId,
                        taskId,
                        task: updatedTask,
                    })
                })
                .catch((err) => {
                    handleServerNetworkError(dispatch, err.message)
                })
        }

        if (!task) {
            console.warn("this task did not found")
        }
    }

//types
export type TasksReducerActionType =
    | ReturnType<typeof tasksActions.removeTask>
    | ReturnType<typeof tasksActions.addTask>
    | ReturnType<typeof tasksActions.updateTask>
    | ReturnType<typeof tasksActions.setTasks>

export type TasksStateType = {
    [key: string]: TaskType[]
}
