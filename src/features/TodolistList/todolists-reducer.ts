import {todolistAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setLoadingStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/handleServerError";
import {handleSuccessResponse} from "../../utils/handleSuccessResponse";
import {getTasksTC} from "./Todolist/Task/task-reducer";
import {AppThunkDispatch} from "../../hooks/useDiapstch/useDispacth";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TodolistDomainType[] = []

const todolistsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        setTodolistAC: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
            return action.payload.todolists.map(t => ({...t, filter: 'All', entityStatus: 'idle'}))
        },
        removeTodolistAC: (state, action: PayloadAction<{  todolistId: string }>) => {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({...action.payload.todolist, filter: 'All', entityStatus: 'idle'})
        },
        changeTitleTodolistAC: (state, action: PayloadAction<{ todolistId: string, newTitle: string }>) => {
            const index = state.findIndex(t => t.id === action.payload.todolistId)
            if (index > -1) {
                state[index].title = action.payload.newTitle
            }
        },
        changeFilterAC: (state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(t => t.id === action.payload.todolistId)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        changeEntityStatusAC: (state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) => {
            const index = state.findIndex(t => t.id === action.payload.todolistId)
            if (index > -1) {
                state[index].entityStatus = action.payload.status
            }
        },
        deleteAllTodolistsWithTasksAC: () => {
            return []
        },
    }
})

export const {
    removeTodolistAC,
    addTodolistAC,
    setTodolistAC,
    deleteAllTodolistsWithTasksAC,
    changeTitleTodolistAC,
    changeEntityStatusAC,
    changeFilterAC
} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer

//thunkCreators
export const getTodolistsTC = () => (dispatch: AppThunkDispatch) => {

    dispatch(setLoadingStatusAC({status: 'loading'}))

    todolistAPI.getTodolists()
      .then(res => {
          dispatch(setTodolistAC({todolists: res}))
          dispatch(setLoadingStatusAC({status: 'succeeded'}))
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

    dispatch(setLoadingStatusAC({status: 'loading'}))
    dispatch(changeEntityStatusAC({todolistId, status: 'loading'}))

    todolistAPI.deleteTodolist(todolistId)
      .then(res => {
          handleSuccessResponse(dispatch, removeTodolistAC, res, {todolistId})
      })
      .catch(err => {
          handleServerNetworkError(dispatch, err.message)
          dispatch(changeEntityStatusAC({todolistId, status: 'failed'}))
      })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {

    dispatch(setLoadingStatusAC({status: 'loading'}))

    todolistAPI.createTodolist(title)
      .then(res => {
          handleSuccessResponse(dispatch, addTodolistAC, res, {todolist: res.data.item})
      })
      .catch(err => {
          handleServerNetworkError(dispatch, err.message)
      })
}

export const updateTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: AppThunkDispatch) => {
    dispatch(setLoadingStatusAC({status: 'loading'}))

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

export type TodolistsReducerActionType =
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTitleTodolistAC>
  | ReturnType<typeof changeFilterAC>
  | ReturnType<typeof setTodolistAC>
  | ReturnType<typeof changeEntityStatusAC>
  | ReturnType<typeof deleteAllTodolistsWithTasksAC>