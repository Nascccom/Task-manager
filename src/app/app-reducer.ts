import {ActionTypes} from "./store";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType
}
type initialStateType = typeof initialState

export const appReducer = (state: initialStateType = initialState, action: ActionTypes) => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        default:
            return state
    }

}

export const setLoadingStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export type AppReducerActionsType = ReturnType<typeof setLoadingStatus>

