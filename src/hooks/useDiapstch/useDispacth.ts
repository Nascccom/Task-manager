import {useDispatch} from "react-redux";
import { AppRootStateType} from "../../app/store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

type AppRootDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

type DispatchFunc = () => AppRootDispatch
export const useAppDispatch: DispatchFunc = useDispatch