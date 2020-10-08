import { TargetType, HandlerType } from "../../api";
import { Loadable } from "../common-types";

export interface CrudState<T> extends Loadable {
  targetName: TargetType,
  handlerName?: HandlerType,
  target?: T,
}

export enum Actions {
  CLEAR = "CRUD_CLEAR",
  SAVING = "CRUD_SAVING",
  SAVED = "CRUD_SAVED",
  SAVE_FAILED = "CRUD_SAVE_FAILED",
  TARGET_SET = "CRUD_TARGET_SET"
}

export const CrudActions = {
  CLEAR: (targetName: TargetType): Actions => `${targetName.toUpperCase()}_${Actions.CLEAR}` as Actions,
  SAVING: (targetName: TargetType): Actions => `${targetName.toUpperCase()}_${Actions.SAVING}` as Actions,
  SAVED: (targetName: TargetType): Actions => `${targetName.toUpperCase()}_${Actions.SAVED}` as Actions,
  SAVE_FAILED: (targetName: TargetType): Actions => `${targetName.toUpperCase()}_${Actions.SAVE_FAILED}` as Actions,
  TARGET_SET: (targetName: TargetType): Actions => `${targetName.toUpperCase()}_${Actions.TARGET_SET}` as Actions,
};

export interface CrudAction<T> {
  type: Actions;
  payload: CrudState<T>;
}

export type CrudActionTypes<T> = CrudAction<T>;
