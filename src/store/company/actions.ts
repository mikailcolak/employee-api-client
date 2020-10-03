import {
  CompaniesState,
  CompanyActions,
  CompanyActionTypes,
  Company,
} from "./types";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { LoadingState } from "../common-types";
import axios from "axios";
import config from "../../config";

const all = (page: number = 0, itemsPerPage: number = 10) =>
  axios.get(`${config.apiEndpoint}companies/?size=${itemsPerPage}&page=${page}`);

const count = () =>
  axios.get(`${config.apiEndpoint}companies/count`);

const create = (company: Company) =>
  axios.post(`${config.apiEndpoint}companies`, company);

const update = (company: Company) =>
  axios.put(`${config.apiEndpoint}companies/${company.id}`, company);

const remove = (company: Company) =>
  axios.delete(`${config.apiEndpoint}companies/${company.id}`);

function companiesFetching(): CompanyActionTypes {
  return {
    type: CompanyActions.COMPANIES_FETCHING,
    payload: {
      items: [],
      contentState: LoadingState.Loading,
      itemsPerPage: 10,
      page: 0,
      total: 0,
    }
  };
}

function companiesFetched(payload: CompaniesState): CompanyActionTypes {
  return {
    type: CompanyActions.COMPANIES_FETCHED,
    payload,
  };
}

function companiesCouldNotBeFecthed(error: string): CompanyActionTypes {
  return {
    type: CompanyActions.COMPANIES_FETCH_FAILED,
    payload: {
      items: [],
      error,
      contentState: LoadingState.CouldNotBeLoaded,
      itemsPerPage: 10,
      page: 0,
      total: 0,
    },
  };
}

function companyCreating(): CompanyActionTypes {
  return {
    type: CompanyActions.COMPANY_CREATING,
    payload: {
      id: 0,
      name: "Loading",
      contentState: LoadingState.Loading,
    }
  }
}

function companyCreated(payload: Company): CompanyActionTypes {
  return {
    type: CompanyActions.COMPANY_CREATING,
    payload: {
      ...payload,
      contentState: LoadingState.Loaded,
    }
  }
}

function companyCouldNotBeCreated(error: string): CompanyActionTypes {
  return {
    type: CompanyActions.COMPANY_CREATING,
    payload: {
      id: 0,
      name: "Could not be loaded",
      contentState: LoadingState.CouldNotBeLoaded,
      error,
    }
  }
}

export const fetchCompaniesAction = (page: number = 0, itemsPerPage: number = 10): ThunkAction<
  void,
  CompanyActionTypes,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch(companiesFetching());
  try {

    let { data: { value: total } } = await count();
    let response = await all(page, itemsPerPage);

    if (response.status !== 200) {
      dispatch(companiesCouldNotBeFecthed(response.statusText));
      return;
    }

    let payload: CompaniesState = {
      contentState: LoadingState.Loaded,
      items: response.data.content.map((c: Company): Company => ({
        id: c.id,
        name: c.name
      })),
      page: page,
      itemsPerPage: itemsPerPage,
      total
    }

    dispatch(companiesFetched(payload));
  } catch (err) {
    dispatch(companiesCouldNotBeFecthed(err.message));
  }
};

export const createCompanyAction = (company: Company, page: number = 0, itemsPerPage: number = 10): ThunkAction<
  void,
  CompanyActionTypes,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch(companyCreating());
  try {

    let createResponse = await create(company);

    if (createResponse.status !== 200) {
      dispatch(companyCouldNotBeCreated(createResponse.statusText));
      return;
    }

    let { data: { value: total } } = await count();
    let response = await all(page, itemsPerPage);

    let payload: CompaniesState = {
      contentState: LoadingState.Loaded,
      items: response.data.content.map((c: Company): Company => ({
        id: c.id,
        name: c.name
      })),
      page: page,
      itemsPerPage: itemsPerPage,
      total
    }

    dispatch(companyCreated(createResponse.data.content));
    dispatch(companiesFetched(payload));
  } catch (err) {
    dispatch(companiesCouldNotBeFecthed(err.message));
  }
};

// eslint-disable-next-line
function mockApiCall(page: number = 0, itemsPerPage: number = 10) {
  return new Promise<CompaniesState>(r => {
    setTimeout(
      () =>
        r({
          contentState: LoadingState.Loaded,
          page,
          itemsPerPage: itemsPerPage,
          total: 1,
          items: [{
            id: 1,
            name: "EBF",
            contentState: LoadingState.Loaded,
          }]
        }),
      1000
    );
  });
}
