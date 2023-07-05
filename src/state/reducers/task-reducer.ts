import {tasksAPI, TaskType, UpdateTaskModelType} from "../../api/tasksAPI/tasks-api";
import {ActionTypes, AppRootStateType} from "../../app/store";
import {Dispatch} from "redux";
import {setErrorMessageAC, setLoadingStatusAC} from "../../app/app-reducer";
import {ResultCode} from "../../api/instance";

export type TasksReducerActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof changeToggleTaskAC>
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
        case "TASKS/CHANGE-TITLE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                  .map(el => el.id === action.taskId
                    ? {...el, title: action.newTitle}
                    : el)
            }
        case "TASKS/CHANGE-TOGGLE-TASK":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                  .map(el => el.id === action.taskID
                    ? {...el, completed: action.checked}
                    : el)
            }
        case "TASKS/SET-TASKS":
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        case "TODOLISTS/ADD-TODOLIST":
            return {
                ...state,
                [action.newTodolist.id]: []
            }
        case "TODOLISTS/REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todolistID1]
            return copyState
        }
        case "TODOLISTS/SET-TODOLIST": {
            let copyState = {...state}
            action.todolists.forEach(todo => copyState[todo.id] = [])
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

export const updateTaskAC = (todolistId: string, taskId: string, newTitle: string) => ({
    type: 'TASKS/CHANGE-TITLE-TASK', todolistId, taskId, newTitle
} as const)

export const changeToggleTaskAC = (todolistID: string, taskID: string, checked: boolean) => ({
    type: 'TASKS/CHANGE-TOGGLE-TASK', todolistID, taskID, checked
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
          dispatch(setTasksAC(todolistId, res.data.items))
      })
}

export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {

    dispatch(setLoadingStatusAC('loading'))

    tasksAPI.deleteTask(todolistId, taskId)
      .then(res => {
          if (res.data.resultCode === ResultCode.SUCCESS) {
              dispatch(setLoadingStatusAC('succeeded'))
              dispatch(removeTaskAC(todolistId, taskId))
          }
      })
}

export const addTaskTC = (todolistId: string, textForTask: string) => (dispatch: Dispatch) => {

    dispatch(setLoadingStatusAC('loading'))

    tasksAPI.createTask(todolistId, textForTask)
      .then(res => {
          if (res.data.resultCode === ResultCode.SUCCESS) {
              dispatch(setLoadingStatusAC('succeeded'))
              dispatch(addTaskAC(todolistId, res.data.data.item))
          } else {
              if (res.data.messages.length) {
                  dispatch(setErrorMessageAC(res.data.messages[0]))
              } else {
                  dispatch(setErrorMessageAC('Some error occurred'))
              }
              dispatch(setLoadingStatusAC('failed'))
          }
      })
}

export const updateTaskTitleTC = (todolistId: string, taskId: string, newTitle: string) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
      dispatch(setLoadingStatusAC('loading'))

      const task = getState().tasks[todolistId].find((t) => t.id === taskId)

      if (task) {
          const newModel: UpdateTaskModelType = {
              title: newTitle,
              description: task.description,
              completed: task.completed,
              status: task.status,
              priority: task.priority,
              startDate: task.startDate,
              deadline: task.deadline
          }
          tasksAPI.updateTask(todolistId, taskId, newModel)
            .then(res => {
                if (res.data.resultCode === ResultCode.SUCCESS) {
                    dispatch(setLoadingStatusAC('succeeded'))
                    dispatch(updateTaskAC(todolistId, taskId, newTitle))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setErrorMessageAC(res.data.messages[0]))
                    } else {
                        dispatch(setErrorMessageAC('Some error occurred'))
                    }
                    dispatch(setLoadingStatusAC('failed'))
                }
            })
      }
  }

export const changeTaskStatusTC = (todolistId: string, taskId: string, checked: boolean) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {

      dispatch(setLoadingStatusAC('loading'))

      const task = getState().tasks[todolistId].find((t) => t.id === taskId)

      if (task) {
          const newModel: UpdateTaskModelType = {
              title: task.title,
              description: task.description,
              completed: checked,
              status: task.status,
              priority: task.priority,
              startDate: task.startDate,
              deadline: task.deadline
          }
          tasksAPI.updateTask(todolistId, taskId, newModel)
            .then(res => {
                if (res.data.resultCode === ResultCode.SUCCESS) {
                    dispatch(setLoadingStatusAC('succeeded'))
                    dispatch(changeToggleTaskAC(todolistId, taskId, checked))
                }
            })
      }
  }



