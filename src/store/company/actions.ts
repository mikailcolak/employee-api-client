import {
  CompaniesState,
  CompanyActions,
  CompanyActionTypes,
  Company,
} from "./types";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { LoadingState } from "../common-types";
import { all, count } from "../../api/company";
import { initialStateProvider } from "../crud/reducers";

function companiesFetching(): CompanyActionTypes {
  return {
    type: CompanyActions.COMPANIES_FETCHING,
    payload: {
      items: [],
      contentState: LoadingState.Loading,
      itemsPerPage: 10,
      page: 0,
      total: 0,
      crud: initialStateProvider<Company>(),
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
      crud: initialStateProvider<Company>(),
    },
  };
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

    let payload = {
      contentState: LoadingState.Loaded,
      items: response.data.content.map((c: Company): Company => ({
        id: c.id,
        name: c.name
      })),
      page: page,
      itemsPerPage: itemsPerPage,
      total
    }

    dispatch(companiesFetched(payload as CompaniesState));
  } catch (err) {
    dispatch(companiesCouldNotBeFecthed(err.message));
  }
};
