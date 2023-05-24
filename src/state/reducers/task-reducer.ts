import {tasksAPI, TaskType, UpdateTaskModelType} from "../../api/tasksAPI/tasks-api";
import {ActionTypes, AppRootStateType} from "../store/store";
import {Dispatch} from "redux";

export type TasksReducerActionType = RemoveTaskACType | AddTaskACType
  | UpdateTaskACType | ChangeToggleTaskACType | SetTasksACType


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
        case "REMOVE-TASK":
            let filteredTasks = state[action.todolistId].filter(t => t.id !== action.taskId)
            return {
                ...state,
                [action.todolistId]: filteredTasks
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], action.task]
            }
        case "CHANGE-TITLE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                  .map(el => el.id === action.taskId
                    ? {...el, title: action.newTitle}
                    : el)
            }
        case "CHANGE-TOGGLE-TASK":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                  .map(el => el.id === action.taskID
                    ? {...el, completed: action.checked}
                    : el)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.newTodolist.id]: []
            }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todolistID1]
            return copyState
        }
        case "SET-TODOLIST": {
            let copyState = {...state}
            action.todolists.forEach(todo => copyState[todo.id] = [])
            return copyState
        }
        case "SET-TASKS":
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        default:
            return state;
    }
};

//ActionCreators
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => ({
    type: 'REMOVE-TASK', todolistId, taskId
} as const)

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, task: TaskType) => ({
    type: 'ADD-TASK', todolistId, task
} as const)

type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistId: string, taskId: string, newTitle: string) => ({
    type: 'CHANGE-TITLE-TASK', todolistId, taskId, newTitle
} as const)

type ChangeToggleTaskACType = ReturnType<typeof changeToggleTaskAC>
export const changeToggleTaskAC = (todolistID: string, taskID: string, checked: boolean) => ({
    type: 'CHANGE-TOGGLE-TASK', todolistID, taskID, checked
} as const)

type SetTasksACType = ReturnType<typeof setTasksAC>
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    type: 'SET-TASKS', todolistId, tasks
} as const)


//ThunkCreators
export const getTasksTC = (todolistId: string) =>
  (dispatch: Dispatch) => {
      tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
  }

export const removeTaskTC = (todolistId: string, taskId: string) =>
  (dispatch: Dispatch) => {
      tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
            }
        })
  }

export const addTaskTC = (todolistId: string, textForTask: string) =>
  (dispatch: Dispatch) => {
      tasksAPI.createTask(todolistId, textForTask)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(todolistId, res.data.data.item))
            }
        })
  }

export const updateTaskTitleTC = (todolistId: string, taskId: string, newTitle: string) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, taskId, newTitle))
                }
            })
      }
  }

export const changeTaskStatusTC = (todolistId: string, taskId: string, checked: boolean) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
                if (res.data.resultCode === 0) {
                    dispatch(changeToggleTaskAC(todolistId, taskId, checked))
                }
            })
      }
  }



