import configureMockStore, { MockStoreEnhanced } from "redux-mock-store"
import { AppRootState } from "app/store"
import thunk from "redux-thunk"
import { AppThunkDispatch } from "common/hooks"
import { AnyAction } from "@reduxjs/toolkit"
import MockAdapter from "axios-mock-adapter"
import { instance } from "common/instanceApi"

export const mockStore = configureMockStore<AppRootState, AppThunkDispatch>([thunk])

export interface MockStoreType extends MockStoreEnhanced<AppRootState, AppThunkDispatch> {
    getActions: () => AnyAction[]
}

export const mockAdapter = new MockAdapter(instance, { onNoMatch: "throwException" })
