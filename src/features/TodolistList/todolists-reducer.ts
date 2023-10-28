import {todolistAPI, TodolistType} from "../../api/todolists-api";
import {ActionTypes} from "../../app/store";
import {Dispatch} from "redux";
import {RequestStatusType, setLoadingStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/handleServerError";
import {handleSuccessResponse} from "../../utils/handleSuccessResponse";
import {getTasksTC} from "./Todolist/Task/task-reducer";
import {AppThunkDispatch} from "../../hooks/useDiapstch/useDispacth";

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
            return state.map(td => td.id === action.payload.todolistId
              ? {...td, title: action.payload.newTitle}
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

export const changeTitleTodolistAC = (data: { todolistId: string, newTitle: string }) => ({
    type: 'TODOLISTS/CHANGE-TITLE-TODOLIST',
    payload: {
        todolistId: data.todolistId,
        newTitle: data.newTitle
    }
} as const)

export const changeFilterAC = (todolistID: string, newFilter: FilterValuesType) => ({
    type: 'TODOLISTS/CHANGE-FILTER', todolistID, newFilter
} as const)

export const changeEntityStatusAC = (todolistID: string, status: RequestStatusType) => ({
    type: 'TODOLISTS/CHANGE-ENTITY-STATUS', todolistID, status
} as const)


//thunkCreators
export const getTodolistsTC = () => (dispatch: AppThunkDispatch) => {

    dispatch(setLoadingStatusAC('loading'))

    todolistAPI.getTodolists()
      .then(res => {
          dispatch(setTodolistAC(res))
          dispatch(setLoadingStatusAC('succeeded'))
          return res
      })
      .then(todolists => {
          todolists.forEach(todo => {
              dispatch(getTasksTC(todo.id))
          })
      })
      .catch(err => {
          handleServerNetworkError(dispatch, err.message)
      })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {

    dispatch(setLoadingStatusAC('loading'))
    dispatch(changeEntityStatusAC(todolistId, 'loading'))

    todolistAPI.deleteTodolist(todolistId)
      .then(res => {
          handleSuccessResponse(dispatch, removeTodolistAC, res, todolistId)
      })
      .catch(err => {
          handleServerNetworkError(dispatch, err.message)
          dispatch(changeEntityStatusAC(todolistId, 'failed'))
      })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {

    dispatch(setLoadingStatusAC('loading'))

    todolistAPI.createTodolist(title)
      .then(res => {
          handleSuccessResponse(dispatch, addTodolistAC, res, res.data.item)
      })
      .catch(err => {
          handleServerNetworkError(dispatch, err.message)
      })
}

export const updateTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatusAC('loading'))

    todolistAPI.updateTodolistTittle(todolistId, newTitle)
      .then(res => {
          handleSuccessResponse(dispatch, changeTitleTodolistAC, res, {todolistId, newTitle})
      })
      .catch(err => {
          handleServerNetworkError(dispatch, err.message)
      })
}


//types
export type TodolistDomainType = TodolistType & { filter: FilterValuesType, entityStatus: RequestStatusType }
export type FilterValuesType = 'All' | 'Active' | 'Completed';