import { TargetType } from "../../api";
import { LoadingState } from "../common-types";
import {
  CrudActions,
  CrudState,
  CrudActionTypes,
} from "./types";

export const initialStateProvider = <T>(): CrudState<T> => ({
  contentState: LoadingState.NotLoaded,
  targetName: ""
});

export const crudReducerProvider = <T>(targetName: TargetType) => (
  state: CrudState<T> = initialStateProvider<T>(),
  { type, payload }: CrudActionTypes<T>
): CrudState<T> => {
  switch (type) {
    case CrudActions.SAVING(targetName): {
      return {
        ...(state || {}),
        contentState: LoadingState.Loading
      };
    }

    case CrudActions.SAVED(targetName): {
      return {
        ...payload,
        contentState: LoadingState.Loaded
      };
    }

    case CrudActions.SAVE_FAILED(targetName): {
      let error = payload.error || "Unknown error.";

      return {
        ...(state || {}),
        contentState: LoadingState.CouldNotBeLoaded,
        error
      };
    }

    case CrudActions.TARGET_SET(targetName): {
      return {
        ...(state || {}),
        ...payload
      }
    }

    case CrudActions.CLEAR(targetName): {
      return {
        ...initialStateProvider<T>()
      }
    }

    default:
      return state || null;
  }
}
