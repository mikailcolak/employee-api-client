import { LoadingState } from "../common-types";
import { employeesReducer } from "../employee/reducers";
import { EmployeeActions, EmployeeActionTypes, EmployeesState } from "../employee/types";
import {
  CompanyActions,
  CompaniesState,
  CompanyActionTypes,
} from "./types";

export const initialState: CompaniesState = {
  contentState: LoadingState.NotLoaded,
  items: [],
  page: 0,
  itemsPerPage: 10,
  total: 0
};

export function companyReducer(
  state: CompaniesState,
  action: CompanyActionTypes | EmployeeActionTypes
): CompaniesState {

  switch (action.type) {
    case CompanyActions.COMPANIES_FETCHING: {
      return {
        ...(state || {}),
        contentState: LoadingState.Loading
      };
    }

    case CompanyActions.COMPANIES_FETCHED: {
      return {
        ...(state || {}),
        ...action.payload as CompaniesState,
        contentState: LoadingState.Loaded
      };
    }

    case CompanyActions.COMPANIES_FETCH_FAILED: {
      let error: string = action.payload.error || "Unknown error.";

      return {
        ...(state || {}),
        contentState: LoadingState.CouldNotBeLoaded,
        error
      };
    }

    default:
      return {...state || {}};
  }
}
