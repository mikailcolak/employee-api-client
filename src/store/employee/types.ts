import { Loadable, PagedData } from "../common-types";
import { CrudState } from "../crud/types";

export interface Employee {
  id: number,
  name: string,
  surname: string,
  email: string,
  address: string,
  salary: number,
  companyId: number,
}

export interface EmployeeState extends Loadable, Employee {

}

export interface EmployeesState extends Loadable, PagedData<EmployeeState> {
  companyId: number;
  averageSalary: number;
  crud: CrudState<Employee>;
}

export enum EmployeeActions {
  EMPLOYEES_FETCHING = "EMPLOYEES_FETCHING",
  EMPLOYEES_FETCHED = "EMPLOYEES_FETCHED",
  EMPLOYEES_FETCH_FAILED = "EMPLOYEES_FETCH_FAILED",
}

export interface FetchEmployeesAction {
  type: EmployeeActions;
  payload: EmployeesState;
}

export type EmployeeActionTypes = FetchEmployeesAction;
