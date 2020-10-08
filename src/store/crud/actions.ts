import {
  CrudState,
  CrudActions,
  CrudActionTypes,
} from "./types";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { LoadingState } from "../common-types";
import { apiRequestHandlerProvider, HandlerType, TargetType } from "../../api";

function saving<T>(payload: CrudState<T>): CrudActionTypes<T> {
  return {
    type: CrudActions.SAVING(payload.targetName),
    payload: {
      ...payload,
      contentState: LoadingState.Loading,
    }
  }
}

function saved<T>(payload: CrudState<T>): CrudActionTypes<T> {
  return {
    type: CrudActions.SAVED(payload.targetName),
    payload: {
      ...payload,
      contentState: LoadingState.Loaded,
    }
  }
}

function couldNotBeSaved<T>(payload: CrudState<T>, error: string): CrudActionTypes<T> {
  return {
    type: CrudActions.SAVE_FAILED(payload.targetName),
    payload: {
      ...payload,
      contentState: LoadingState.CouldNotBeLoaded,
      error,
    }
  }
}

export const setCrudState = <T>(handlerName: HandlerType, targetName: TargetType, target?: T): any => (dispatch: any) => dispatch({
  type: CrudActions.TARGET_SET(targetName),
  payload: {
    contentState: LoadingState.NotLoaded,
    handlerName,
    targetName,
    target
  }
});


export const clearCrudState = (targetName: TargetType): any => (dispatch: any) => dispatch({
  type: CrudActions.CLEAR(targetName),
  payload: {
    contentState: LoadingState.NotLoaded,
  }
});


export const saveAction = <T>(state: CrudState<T>, clearStateAfterSave: boolean = false): ThunkAction<
  void,
  CrudActionTypes<T>,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch(saving(state));
  try {
    if (!state.target || !state.targetName || !state.handlerName) return;

    let op = apiRequestHandlerProvider(state.targetName, state.handlerName);

    if (!state.target) {
      dispatch(couldNotBeSaved(state, "state object should be provided"));
      return;
    }

    let saveResponse = await op(state.target as any);

    if (!(saveResponse.status === 201 || saveResponse.status === 200)) {
      dispatch(couldNotBeSaved(state, saveResponse.statusText));
      return;
    }

    if (clearStateAfterSave) {
      dispatch(saved<T>({
        ...state,
        targetName: state.targetName,
        handlerName: "all"
      }));
    } else {
      dispatch(saved<T>({
        ...state,
        target: saveResponse.data
      }));
    }

  } catch (err) {
    dispatch(couldNotBeSaved(state, err.message));
  }
};
