import {ActionCreator, Dispatch} from "redux";
import {setLoadingStatusAC} from "../app/app-reducer";
import {ActionTypes} from "../app/store";
import {ResponseType, ResultCode} from "../api/instance";
import {handleServerAppError} from "./handleServerError";


export const handleSuccessResponse =
  <T, S>(dispatch: Dispatch,
         actionCreator: ActionCreator<ActionTypes>,
         serverResponse: ResponseType<S>,
         data: T
  ) => {

      if (serverResponse.resultCode === ResultCode.SUCCESS) {
          dispatch(actionCreator(data))
          dispatch(setLoadingStatusAC("succeeded"))
      } else {
          handleServerAppError(dispatch, serverResponse)
      }

  }
