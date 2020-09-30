import { LoadingState } from "../common-types";
import { employeesReducer } from "../employee/reducers";
import { EmployeeActions, EmployeeActionTypes, EmployeeState } from "../employee/types";
import {
  CompanyActions,
  CompanyState,
  CompanyActionTypes,
} from "./types";

export const initialState: CompanyState = {
  contentState: LoadingState.NotLoaded,
  items: [],
  page: 0,
  size: 10,
  total: 0
};

export function companyReducer(
  state: CompanyState,
  action: CompanyActionTypes | EmployeeActionTypes
): CompanyState {

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
        ...action.payload as CompanyState,
        contentState: LoadingState.Loaded
      };
    }

    case CompanyActions.COMPANIES_FETCH_FAILED: {
      let error: String = action.payload.error || "Unknown error.";

      return {
        ...(state || {}),
        contentState: LoadingState.CouldNotBeLoaded,
        error
      };
    }

    case EmployeeActions.EMPLOYEES_FETCHING:
    case EmployeeActions.EMPLOYEES_FETCHED:
    case EmployeeActions.EMPLOYEES_FETCH_FAILED: {
      let employeeState = action.payload;

      if (state?.items?.some(c => c.id === employeeState?.companyId)) {
        let company = state?.items?.find(c => c.id === employeeState?.companyId);
        if (company) {
          company.employees = employeesReducer(company.employees, action);
        }
      }
      return {...state || {}};
    }

    default:
      return {...state || {}};
  }
}
