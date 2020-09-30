import { LoadingState, PagedData } from "../common-types";

export interface Employee {
  id: Number,
  name: String,
  surname: String,
  email: String,
  address: String,
  salary: Number,
  companyId: Number,
}

export interface EmployeeState extends PagedData<Employee> {
  companyId: Number,
  contentState: LoadingState,
  error?: String,
}

export enum EmployeeActions {
  EMPLOYEES_FETCHING = "EMPLOYEES_FETCHING",
  EMPLOYEES_FETCHED = "EMPLOYEES_FETCHED",
  EMPLOYEES_FETCH_FAILED = "EMPLOYEES_FETCH_FAILED",
}

export interface FetchEmployeesAction {
  type: EmployeeActions;
  payload: EmployeeState;
}

export type EmployeeActionTypes = FetchEmployeesAction;
