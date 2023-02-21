import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

type TodolistsReducerActionType = RemoveTodolistACType
  | AddTodolistACType
  | changeTitleTodolistACType
  | changeFilterACType

export const todolistsReducer = (state: TodolistType[], action: TodolistsReducerActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.payload.todolistID1);
        case 'ADD-TODOLIST':
            const newTodo: TodolistType = {
                id: action.payload.todolistId,
                title: action.payload.newTodolist,
                filter: 'all'
            };
            return [...state, newTodo];
        case 'CHANGE-TITLE-TODOLIST':
            return state.map(el => el.id === action.payload.todolistID
              ? {...el, title: action.payload.newTodolistTitle}
              : el)
        case "CHANGE-FILTER":
            return state.map((el) => el.id === action.payload.todolistID
              ? {...el, filter: action.payload.newFilter}
              : el)
        default:
            return state;
    }
};


//ActionCreators
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID1: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID1
        }
    } as const;
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolist: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolist,
            todolistId: v1()
        }
    } as const;
}

type changeTitleTodolistACType = ReturnType<typeof changeTitleTodolistAC>
export const changeTitleTodolistAC = (todolistID: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TITLE-TODOLIST',
        payload: {
            todolistID,
            newTodolistTitle
        }
    } as const;
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistID,
            newFilter
        }
    } as const;
}
