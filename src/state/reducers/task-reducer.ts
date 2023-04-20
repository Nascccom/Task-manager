import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";
import {TaskType} from "../../components/Todolist/ToDoList";

export type TasksReducerActionType = RemoveTaskACType
  | AddTaskACType
  | UpdateTaskACType
  | ChangeToggleTaskACType
  | AddTodolistACType
  | RemoveTodolistACType


const initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: TasksReducerActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            let filteredTasks = state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            return {
                ...state,
                [action.payload.todolistId]: filteredTasks
            }
        case "ADD-TASK":
            const newTask = {id: v1(), title: action.payload.valueTitle, isDone: false}
            return {
                ...state,
                [action.payload.todolistID]:
                  [...state[action.payload.todolistID], newTask]
            }
        case "CHANGE-TITLE-TASK":
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                  .map(el => el.id === action.payload.taskId
                    ? {...el, title: action.payload.newTitle}
                    : el)
            }
        case "CHANGE-TOGGLE-TASK":
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                  .map(el => el.id === action.payload.taskID
                    ? {...el, isDone: action.payload.checked}
                    : el)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.payload.todolistID1]
            return copyState
        default:
            return state;
    }
};

//ActionCreators
type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            taskId
        }
    } as const;
};

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, valueTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID,
            valueTitle
        }
    } as const;
};

type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TITLE-TASK',
        payload: {
            todolistId,
            taskId,
            newTitle
        }
    } as const;
};

type ChangeToggleTaskACType = ReturnType<typeof changeToggleTaskAC>
export const changeToggleTaskAC = (todolistID: string, taskID: string, checked: boolean) => {
    return {
        type: 'CHANGE-TOGGLE-TASK',
        payload: {
            todolistID,
            taskID,
            checked
        }
    } as const;
};


//types

export type TasksStateType = {
    [key: string]: TaskType[]
}
