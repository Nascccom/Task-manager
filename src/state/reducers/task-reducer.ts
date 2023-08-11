import {tasksAPI, TaskType, UpdateTaskModelType} from "../../api/tasksAPI/tasks-api";
import {ActionTypes, AppRootStateType} from "../../app/store";
import {Dispatch} from "redux";
import {setErrorMessageAC, setLoadingStatusAC} from "../../app/app-reducer";
import {ResultCode} from "../../api/instance";

export type TasksReducerActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  // | ReturnType<typeof changeToggleTaskAC>
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
            let filteredTasks = state[action.todolistId].filter(t => t.id !== action.taskId)
            return {
                ...state,
                [action.todolistId]: filteredTasks
            }
        case "TASKS/ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], action.task]
            }
        case "TASKS/UPDATE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                  .map(t => t.id === action.task.id
                    ? {...t, ...action.task}
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
export const removeTaskAC = (todolistId: string, taskId: string) => ({
    type: 'TASKS/REMOVE-TASK', todolistId, taskId
} as const)

export const addTaskAC = (todolistId: string, task: TaskType) => ({
    type: 'TASKS/ADD-TASK', todolistId, task
} as const)

export const updateTaskAC = (todolistId: string, taskId: string, task: TaskType) => ({
    type: 'TASKS/UPDATE-TASK', todolistId, taskId, task
} as const)

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    type: 'TASKS/SET-TASKS', todolistId, tasks
} as const)


//ThunkCreators
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {

    dispatch(setLoadingStatusAC('loading'))

    tasksAPI.getTasks(todolistId)
      .then(res => {
          dispatch(setLoadingStatusAC('succeeded'))
          dispatch(setTasksAC(todolistId, res.items))
      })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {

    dispatch(setLoadingStatusAC('loading'))

    tasksAPI.deleteTask(todolistId, taskId)
      .then(res => {
          if (res.resultCode === ResultCode.SUCCESS) {
              dispatch(setLoadingStatusAC('succeeded'))
              dispatch(removeTaskAC(todolistId, taskId))
          }
      })
}

export const addTaskTC = (todolistId: string, textForTask: string) => (dispatch: Dispatch) => {

    dispatch(setLoadingStatusAC('loading'))

    tasksAPI.createTask(todolistId, textForTask)
      .then(res => {
          if (res.resultCode === ResultCode.SUCCESS) {
              dispatch(setLoadingStatusAC('succeeded'))
              dispatch(addTaskAC(todolistId, res.data.item))
          } else {
              if (res.messages.length) {
                  dispatch(setErrorMessageAC(res.messages[0]))
              } else {
                  dispatch(setErrorMessageAC('Some error occurred'))
              }
              dispatch(setLoadingStatusAC('failed'))
          }
      })
}

export const updateTaskTC = (todolistId: string, taskId: string, changingPart: Object) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
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

          tasksAPI.updateTask(todolistId, taskId, newModel)
            .then(res => {

                if (res.resultCode === 0) {
                    const updatedTask: TaskType = res.data.item
                    dispatch(updateTaskAC(todolistId, taskId, updatedTask))
                } else {
                    if (res.messages.length) {
                        dispatch(setErrorMessageAC(res.messages[0]))
                    } else {
                        dispatch(setErrorMessageAC('Some error occurred'))
                    }
                    dispatch(setLoadingStatusAC('failed'))
                }
            })
      }

      if (!task) {
          console.warn('this task did not found')
      }
  }




