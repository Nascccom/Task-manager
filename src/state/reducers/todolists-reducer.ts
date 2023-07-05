import {todolistAPI, TodolistType} from "../../api/todolist-api/todolists-api";
import {ActionTypes} from "../../app/store";
import {Dispatch} from "redux";
import {setLoadingStatus} from "../../app/app-reducer";

export type TodolistsReducerActionType =
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTitleTodolistAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof setTodolistAC>

const initialState: TodolistDomainType[] = [
    // {id: todolistId1, title: 'What to buy', order: 0, filter: 'All', addedDate: ''}
]

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case "TODOLISTS/SET-TODOLIST":
            return action.todolists.map((todo: TodolistType) => ({...todo, filter: 'all'}))
        case 'TODOLISTS/REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.todolistID1);
        case 'TODOLISTS/ADD-TODOLIST':
            const newTodo: TodolistDomainType = {
                ...action.newTodolist,
                filter: 'All'
            };
            return [newTodo, ...state];
        case 'TODOLISTS/CHANGE-TITLE-TODOLIST':
            return state.map(el => el.id === action.todolistID
              ? {...el, title: action.newTodolistTitle}
              : el)
        case "TODOLISTS/CHANGE-FILTER":
            return state.map((el) => el.id === action.todolistID
              ? {...el, filter: action.newFilter}
              : el)
        default:
            return state;
    }
};


//ActionCreators
export const setTodolistAC = (todolists: TodolistType[]) => ({
    type: 'TODOLISTS/SET-TODOLIST', todolists
} as const)

export const removeTodolistAC = (todolistID1: string) => ({
    type: 'TODOLISTS/REMOVE-TODOLIST', todolistID1
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


//thunkCreators
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setLoadingStatus('loading'))
    todolistAPI.getTodolists()
      .then(res => {
          dispatch(setLoadingStatus('succeeded'))
          dispatch(setTodolistAC(res.data))
      })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatus('loading'))
    todolistAPI.deleteTodolist(todolistId)
      .then(res => {
          if (res.data.resultCode === 0) {
              dispatch(setLoadingStatus('succeeded'))
              dispatch(removeTodolistAC(todolistId))
          }
      })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatus('loading'))
    todolistAPI.createTodolist(title)
      .then(res => {
          if (res.data.resultCode === 0) {
              dispatch(setLoadingStatus('succeeded'))
              dispatch(addTodolistAC(res.data.data.item))
          }
      })
}

export const updateTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch) => {
    dispatch(setLoadingStatus('loading'))
    todolistAPI.updateTodolistTittle(todolistId, newTitle)
      .then(res => {
          if (res.data.resultCode === 0) {
              dispatch(setLoadingStatus('succeeded'))
              dispatch(changeTitleTodolistAC(todolistId, newTitle))
          }
      })
}


//types
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }
export type FilterValuesType = 'All' | 'all' | 'Active' | 'Completed';