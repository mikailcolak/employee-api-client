import { LoadingState } from "../common-types";
import { crudReducerProvider, initialStateProvider } from "../crud/reducers";
import {
  EmployeeActions,
  EmployeesState,
  EmployeeActionTypes,
  Employee
} from "./types";

const employeeCrudReducer = crudReducerProvider<Employee>('employee');

export const initialState: EmployeesState = {
  companyId: 0,
  items: [],
  page: 0,
  itemsPerPage: 10,
  contentState: LoadingState.NotLoaded,
  total: 0,
  averageSalary: 0,
  crud: initialStateProvider<Employee>()
};

export function employeesReducer(
  state: EmployeesState = initialState,
  { type, payload }: EmployeeActionTypes
): EmployeesState {
  switch (type) {
    case EmployeeActions.EMPLOYEES_FETCHING: {
      return {
        ...(state || {}),
        contentState: LoadingState.Loading
      };
    }

    case EmployeeActions.EMPLOYEES_FETCHED: {
      return {
        ...(state || {}),
        ...payload,
        contentState: LoadingState.Loaded
      };
    }

    case EmployeeActions.EMPLOYEES_FETCH_FAILED: {
      let error = payload.error || "Unknown error.";

      return {
        ...(state || {}),
        contentState: LoadingState.CouldNotBeLoaded,
        error
      };
    }

    default:
      if ((type as string).startsWith("EMPLOYEE_CRUD_")) {
        return {
          ...(state || {}),
          crud: employeeCrudReducer(state.crud, {type: (type as any), payload: (payload as any)})
        }
      }

      return state || null;
  }
}
