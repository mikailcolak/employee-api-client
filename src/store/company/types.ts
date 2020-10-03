import { Loadable, PagedData } from "../common-types";

export interface Company {
  id: number,
  name: string,
}

export interface CompanyState extends Loadable, Company {

}

export interface CompaniesState extends Loadable, PagedData<CompanyState> {

}

export enum CompanyActions {
  COMPANIES_FETCHING = "COMPANIES_FETCHING",
  COMPANIES_FETCHED = "COMPANIES_FETCHED",
  COMPANIES_FETCH_FAILED = "COMPANIES_FETCH_FAILED",
  COMPANY_CREATING = "COMPANY_CREATING",
  COMPANY_CREATED = "COMPANY_CREATED",
  COMPANY_CREATE_FAILED = "COMPANY_CREATE_FAILED",
}

export interface FetchCompaniesAction {
  type: CompanyActions;
  payload: CompaniesState;
}

export interface CreateCompanyAction {
  type: CompanyActions;
  payload: CompanyState;
}


export type CompanyActionTypes = FetchCompaniesAction | CreateCompanyAction;
