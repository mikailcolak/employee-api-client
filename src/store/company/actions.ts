import {
  CompanyState,
  CompanyActions,
  CompanyActionTypes,
  Company
} from "./types";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { LoadingState } from "../common-types";
import axios from "axios";
import config from "../../config";
import { initialState as employeeInitialState } from "../employee/reducers";

function companiesFetched(payload: CompanyState): CompanyActionTypes {
  return {
    type: CompanyActions.COMPANIES_FETCHED,
    payload,
  };
}

function companiesFetching(): CompanyActionTypes {
  return {
    type: CompanyActions.COMPANIES_FETCHING,
    payload: {
      items: [],
      contentState: LoadingState.Loading,
    }
  };
}

function companiesCouldNotBeFecthed(error: String): CompanyActionTypes {
  return {
    type: CompanyActions.COMPANIES_FETCH_FAILED,
    payload: {
      items: [],
      error,
      contentState: LoadingState.CouldNotBeLoaded
    },
  };
}

export const fetchCompanies = (page: Number = 0, itemPerPage: Number = 10): ThunkAction<
  void,
  CompanyActionTypes,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch(companiesFetching());
  try {
    let response = await getCompanies(page, itemPerPage);

    if (response.status !== 200) {
      dispatch(companiesCouldNotBeFecthed(response.statusText));
      return;
    }
    let payload: CompanyState = {
      contentState: LoadingState.Loaded,
      items: response.data.content.map((c: Company) : Company => ({
        id: c.id,
        name: c.name,
        employees: employeeInitialState
      })),
      page: page,
      size: itemPerPage,
      total: response.data.length // TODO: [FIXME] get the total amount of items from API
    }

    dispatch(companiesFetched(payload));
  } catch (err) {
    dispatch(companiesCouldNotBeFecthed(err.message));
  }
};

function getCompanies(page: Number = 0, itemPerPage: Number = 10) {
  return axios.get(`${config.apiEndpoint}companies/?size=${itemPerPage}&page=${page}`);
}

// eslint-disable-next-line
function mockApiCall(page: Number = 0, itemPerPage: Number = 10) {
  return new Promise<CompanyState>((r) => {
    setTimeout(
      () =>
        r({
          contentState: LoadingState.Loaded,
          page,
          size: itemPerPage,
          total: 1,
          items: [{
            id: 1,
            name: "EBF",
            employees: {
              companyId: 1,
              contentState: LoadingState.NotLoaded,
              items: [],
              page: 0,
              size: 10,
              total: 0
            },
          }]
        }),
      1000
    );
  });
}
