import {ActionTypes} from "./store";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}
type initialStateType = typeof initialState

export const appReducer = (state: initialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.errorMessage}
        default:
            return state
    }

}

export const setLoadingStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export const setErrorMessageAC = (errorMessage: string | null) => ({type: 'APP/SET-ERROR', errorMessage} as const)

export type AppReducerActionsType =
  | ReturnType<typeof setLoadingStatusAC>
  | ReturnType<typeof setErrorMessageAC>

