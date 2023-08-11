import {todolistAPI, TodolistType} from "../../api/todolist-api/todolists-api";
import {ActionTypes} from "../../app/store";
import {Dispatch} from "redux";
import {RequestStatusType, setErrorMessageAC, setLoadingStatusAC} from "../../app/app-reducer";
import {ResultCode} from "../../api/instance";

export type TodolistsReducerActionType =
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTitleTodolistAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof setTodolistAC>
  | ReturnType<typeof changeEntityStatusAC>

const initialState: TodolistDomainType[] = [
    // {id: todolistId1, title: 'What to buy', order: 0, filter: 'All', addedDate: '', entityStatus: 'idle'}
]

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case "TODOLISTS/SET-TODOLIST":
            return action.todolists.map((td: TodolistType) => ({...td, filter: 'All', entityStatus: 'idle'}))
        case 'TODOLISTS/REMOVE-TODOLIST':
            return state.filter(td => td.id !== action.todolistID);
        case 'TODOLISTS/ADD-TODOLIST':
            const newTodo: TodolistDomainType = {...action.newTodolist, filter: 'All', entityStatus: 'idle'};
            return [newTodo, ...state];
        case 'TODOLISTS/CHANGE-TITLE-TODOLIST':
            return state.map(td => td.id === action.todolistID
              ? {...td, title: action.newTodolistTitle}
              : td)
        case "TODOLISTS/CHANGE-FILTER":
            return state.map((td) => td.id === action.todolistID
              ? {...td, filter: action.newFilter}
              : td)
        case "TODOLISTS/CHANGE-ENTITY-STATUS":
            return state.map((td) => td.id === action.todolistID
              ? {...td, entityStatus: action.status}
              : td)
        default:
            return state;
    }
};


//ActionCreators
export const setTodolistAC = (todolists: TodolistType[]) => ({
    type: 'TODOLISTS/SET-TODOLIST', todolists
} as const)

export const removeTodolistAC = (todolistID: string) => ({
    type: 'TODOLISTS/REMOVE-TODOLIST', todolistID
} as const)

export const addTodolistAC = (newTodolist: TodolistType) => ({
    type: 'TODOLISTS/ADD-TODOLIST', newTodolist
} as const)

export const changeTitleTodolistAC = (todolistID: string, newTodolistTitle: string) => ({
    type: 'TODOLISTS/CHANGE-TITLE-TODOLIST', todolistID, newTodolistTitle
} as const)

export const changeFilterAC = (todolistID: string, newFilter: FilterValuesType) => ({
    type: 'TODOLISTS/CHANGE-FILTER', todolistID, newFilter
} as const)

export const changeEntityStatusAC = (todolistID: string, status: RequestStatusType) => ({
    type: 'TODOLISTS/CHANGE-ENTITY-STATUS', todolistID, status
} as const)


//thunkCreators
export const getTodolistsTC = () => (dispatch: Dispatch) => {

    dispatch(setLoadingStatusAC('loading'))

    todolistAPI.getTodolists()
      .then(res => {
          dispatch(setTodolistAC(res))
      })
      .finally(() => {
          dispatch(setLoadingStatusAC('idle'))
      })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {

    dispatch(setLoadingStatusAC('loading'))
    dispatch(changeEntityStatusAC(todolistId, 'loading'))

    todolistAPI.deleteTodolist(todolistId)
      .then(res => {
          if (res.resultCode === ResultCode.SUCCESS) {
              dispatch(setLoadingStatusAC('succeeded'))
              dispatch(removeTodolistAC(todolistId))
          }
      })
      .catch(err => {
          dispatch(setErrorMessageAC(err.message))
          dispatch(changeEntityStatusAC(todolistId, 'failed'))
          dispatch(setLoadingStatusAC('failed'))
      })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {

    dispatch(setLoadingStatusAC('loading'))

    todolistAPI.createTodolist(title)
      .then(res => {
          if (res.resultCode === ResultCode.SUCCESS) {
              dispatch(setLoadingStatusAC('succeeded'))
              dispatch(addTodolistAC(res.data.item))
          } else {
              if (res.messages.length) {
                  dispatch(setErrorMessageAC(res.messages[0]))
              } else {
                  dispatch(setErrorMessageAC('Some error occurred'))
              }
              dispatch(setLoadingStatusAC('failed'))
          }
      })
      .finally(() => {
          dispatch(setLoadingStatusAC('idle'))
      })

}

export const updateTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))

    todolistAPI.updateTodolistTittle(todolistId, newTitle)
      .then(res => {
          if (res.resultCode === ResultCode.SUCCESS) {
              dispatch(setLoadingStatusAC('succeeded'))
              dispatch(changeTitleTodolistAC(todolistId, newTitle))
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


//types
export type TodolistDomainType = TodolistType & { filter: FilterValuesType, entityStatus: RequestStatusType }
export type FilterValuesType = 'All' | 'Active' | 'Completed';