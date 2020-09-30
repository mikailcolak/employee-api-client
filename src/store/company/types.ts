import { LoadingState, PagedData } from "../common-types";
import { EmployeeState } from "../employee/types"

export interface Company {
  id: Number,
  name: String,
  employees: EmployeeState,
}

export interface CompanyState extends PagedData<Company> {
  contentState: LoadingState,
  error?: String
}

export enum CompanyActions {
  COMPANIES_FETCHING = "COMPANIES_FETCHING",
  COMPANIES_FETCHED = "COMPANIES_FETCHED",
  COMPANIES_FETCH_FAILED = "COMPANIES_FETCH_FAILED",
}

export interface FetchCompaniesAction {
  type: CompanyActions;
  payload: CompanyState;
}

export type CompanyActionTypes = FetchCompaniesAction;
