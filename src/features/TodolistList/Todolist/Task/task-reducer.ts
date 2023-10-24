import {tasksAPI, TaskType, UpdateTaskModelType} from "../../../../api/tasks-api";
import {ActionTypes, AppRootStateType} from "../../../../app/store";
import {setLoadingStatusAC} from "../../../../app/app-reducer";
import {handleServerNetworkError} from "../../../../utils/handleServerError";
import {AppThunkDispatch} from "../../../../hooks/useDiapstch/useDispacth";
import {handleSuccessResponse} from "../../../../utils/handleSuccessResponse";

export type TasksReducerActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>


export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {
    // 'd6a00fdd-2582-4ddb-8f28-2b3c1022784f': [{
    //     description: '', id: v1(), title: 'NJJJJ', completed: false, status: 0, priority: 0,
    //     startDate: '', deadline: '', todoListId: 'd6a00fdd-2582-4ddb-8f28-2b3c1022784f', order: 0, addedDate: ''
    // }]
}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case "TASKS/REMOVE-TASK":
            let filteredTasks = state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            return {
                ...state,
                [action.payload.todolistId]: filteredTasks
            }
        case "TASKS/ADD-TASK":
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId], action.payload.task]
            }
        case "TASKS/UPDATE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                  .map(t => t.id === action.payload.task.id
                    ? {...t, ...action.payload.task}
                    : t)
            }
        case "TASKS/SET-TASKS":
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        case "TODOLISTS/ADD-TODOLIST": {
            return {
                ...state,
                [action.newTodolist.id]: []
            }
        }
        case "TODOLISTS/REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todolistID]
            return copyState
        }
        case "TODOLISTS/SET-TODOLIST": {
            let copyState = {...state}
            action.todolists.forEach((todo) => copyState[todo.id] = [])
            return copyState
        }
        default:
            return state;
    }
};

//ActionCreators
export const removeTaskAC = (data: { todolistId: string, taskId: string }) => ({
    type: 'TASKS/REMOVE-TASK',
    payload: {
        todolistId: data.todolistId,
        taskId: data.taskId
    }
} as const)

export const addTaskAC = (data: { todolistId: string, task: TaskType }) => ({
    type: 'TASKS/ADD-TASK',
    payload: {
        todolistId: data.todolistId,
        task: data.task
    }
} as const)

export const updateTaskAC = (data: { todolistId: string, taskId: string, task: TaskType }) => ({
    type: 'TASKS/UPDATE-TASK', payload: {
        todolistId: data.todolistId,
        taskId: data.taskId,
        task: data.task
    }
} as const)

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    type: 'TASKS/SET-TASKS', todolistId, tasks
} as const)


//ThunkCreators
export const getTasksTC = (todolistId: string) =>
  (dispatch: AppThunkDispatch) => {

      dispatch(setLoadingStatusAC('loading'))

      tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.items))
            dispatch(setLoadingStatusAC('succeeded'))
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err.message)
        })
  }

export const removeTaskTC = (todolistId: string, taskId: string) =>
  (dispatch: AppThunkDispatch) => {

      dispatch(setLoadingStatusAC('loading'))

      tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            handleSuccessResponse(dispatch, removeTaskAC, res, {todolistId, taskId})
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err.message)
        })
  }

export const addTaskTC = (todolistId: string, textForTask: string) =>
  (dispatch: AppThunkDispatch) => {

      dispatch(setLoadingStatusAC('loading'))

      tasksAPI.createTask(todolistId, textForTask)
        .then(res => {
            handleSuccessResponse(dispatch, addTaskAC, res, {todolistId, task: res.data.item})
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err.message)
        })
  }

export const updateTaskTC = (todolistId: string, taskId: string, changingPart: Object) =>
  (dispatch: AppThunkDispatch, getState: () => AppRootStateType) => {
      const state = getState()
      const task = state.tasks[todolistId].find(t => t.id === taskId)

      if (task) {
          const newModel: UpdateTaskModelType = {
              title: task.title,
              completed: task.completed,
              description: task.description,
              deadline: task.deadline,
              startDate: task.startDate,
              status: task.status,
              priority: task.priority,
              ...changingPart
          }

          dispatch(setLoadingStatusAC('loading'))

          tasksAPI.updateTask(todolistId, taskId, newModel)
            .then(res => {
                const updatedTask: TaskType = res.data.item
                handleSuccessResponse(dispatch, updateTaskAC, res, {todolistId, taskId, task: updatedTask})
            })
            .catch(err => {
                handleServerNetworkError(dispatch, err.message)
            })
      }

      if (!task) {
          console.warn('this task did not found')
      }
  }




