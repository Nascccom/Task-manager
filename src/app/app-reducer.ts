import {ActionTypes} from "./store";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
}
export type initialAppStateType = typeof initialState

export const appReducer = (state: initialAppStateType = initialState, action: ActionTypes) => {
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

