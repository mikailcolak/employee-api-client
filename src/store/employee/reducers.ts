import { LoadingState } from "../common-types";
import {
  EmployeeActions,
  EmployeeState,
  EmployeeActionTypes,
} from "./types";

export const initialState: EmployeeState = {
  companyId: 0,
  items: [],
  page: 0,
  size: 10,
  contentState: LoadingState.NotLoaded,
  total: 0
};

export function employeesReducer(
  state: EmployeeState,
  action: EmployeeActionTypes
): EmployeeState {
  switch (action.type) {
    case EmployeeActions.EMPLOYEES_FETCHING: {
      return {
        ...(state || {}),
        contentState: LoadingState.Loading
      };
    }

    case EmployeeActions.EMPLOYEES_FETCHED: {
      return {
        ...(state || {}),
        ...action.payload as EmployeeState,
        contentState: LoadingState.Loaded
      };
    }

    case EmployeeActions.EMPLOYEES_FETCH_FAILED: {
      let error = action.payload.toString() || "Unknown error.";

      return {
        ...(state || {}),
        contentState: LoadingState.CouldNotBeLoaded,
        error
      };
    }

    default:
      return state || null;
  }
}
