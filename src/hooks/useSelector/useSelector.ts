import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store/store";

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector