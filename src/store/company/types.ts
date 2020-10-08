import { Loadable, PagedData } from "../common-types";
import { CrudState } from "../crud/types";

export interface Company {
  id: number,
  name: string,
  employeeCount?: number,
  averageSalary?: number,
}

export interface CompanyState extends Loadable, Company {

}

export interface CompaniesState extends Loadable, PagedData<CompanyState> {
  crud: CrudState<Company>
}

export enum CompanyActions {
  COMPANIES_FETCHING = "COMPANIES_FETCHING",
  COMPANIES_FETCHED = "COMPANIES_FETCHED",
  COMPANIES_FETCH_FAILED = "COMPANIES_FETCH_FAILED",
}

export interface FetchCompaniesAction {
  type: CompanyActions;
  payload: CompaniesState;
}

export type CompanyActionTypes = FetchCompaniesAction;
