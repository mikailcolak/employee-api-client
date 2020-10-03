import { LoadingState } from "../common-types";
import {
  EmployeeActions,
  EmployeesState,
  EmployeeActionTypes,
} from "./types";

export const initialState: EmployeesState = {
  companyId: 0,
  items: [],
  page: 0,
  itemsPerPage: 10,
  contentState: LoadingState.NotLoaded,
  total: 0
};

export function employeesReducer(
  state: EmployeesState,
  action: EmployeeActionTypes
): EmployeesState {
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
        ...action.payload,
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
