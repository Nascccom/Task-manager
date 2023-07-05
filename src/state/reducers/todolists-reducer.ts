import {todolistAPI, TodolistType} from "../../api/todolist-api/todolists-api";
import {ActionTypes} from "../store/store";
import {Dispatch} from "redux";

export type TodolistsReducerActionType =
  RemoveTodolistACType | AddTodolistACType | ChangeTitleTodolistACType |
  ChangeFilterACType | SetTodolistACType

const initialState: TodolistDomainType[] = [
    // {id: todolistId1, title: 'What to buy', order: 0, filter: 'All', addedDate: ''}
]

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionTypes): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLIST":
            return action.todolists.map((todo: TodolistType) => ({...todo, filter: 'all'}))
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.todolistID1);
        case 'ADD-TODOLIST':
            const newTodo: TodolistDomainType = {
                ...action.newTodolist,
                filter: 'All'
            };

            return [newTodo, ...state];
        case 'CHANGE-TITLE-TODOLIST':
            return state.map(el => el.id === action.todolistID
              ? {...el, title: action.newTodolistTitle}
              : el)
        case "CHANGE-FILTER":
            return state.map((el) => el.id === action.todolistID
              ? {...el, filter: action.newFilter}
              : el)
        default:
            return state;
    }
};


//ActionCreators
type SetTodolistACType = ReturnType<typeof setTodolistAC>
export const setTodolistAC = (todolists: TodolistType[]) => ({
    type: 'SET-TODOLIST', todolists
} as const)

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID1: string) => ({
    type: 'REMOVE-TODOLIST', todolistID1
} as const)

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolist: TodolistType) => ({
    type: 'ADD-TODOLIST', newTodolist
} as const)

type ChangeTitleTodolistACType = ReturnType<typeof changeTitleTodolistAC>
export const changeTitleTodolistAC = (todolistID: string, newTodolistTitle: string) => ({
    type: 'CHANGE-TITLE-TODOLIST', todolistID, newTodolistTitle
} as const)

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, newFilter: FilterValuesType) => ({
    type: 'CHANGE-FILTER', todolistID, newFilter
} as const)


//thunkCreators
export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
      .then(res => {
          dispatch(setTodolistAC(res.data))
      })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId)
      .then(res => {
          if (res.data.resultCode === 0) {
              dispatch(removeTodolistAC(todolistId))
          }
      })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
      .then(res => {
          if (res.data.resultCode === 0) {
              dispatch(addTodolistAC(res.data.data.item))
          }
      })
}

export const updateTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolistTittle(todolistId, newTitle)
      .then(res => {
          if (res.data.resultCode === 0) {
              dispatch(changeTitleTodolistAC(todolistId, newTitle))
          }
      })
}


//types
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }
export type FilterValuesType = 'All' | 'all' | 'Active' | 'Completed';