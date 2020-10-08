import { LoadingState } from "../common-types";
import { crudReducerProvider, initialStateProvider } from "../crud/reducers";
import {
  CompanyActions,
  CompaniesState,
  CompanyActionTypes,
  Company,
} from "./types";

const companyCrudReducer = crudReducerProvider<Company>('company');

export const initialState: CompaniesState = {
  contentState: LoadingState.NotLoaded,
  items: [],
  page: 0,
  itemsPerPage: 10,
  total: 0,
  crud: initialStateProvider<Company>(),
};

export function companyReducer(
  state: CompaniesState = initialState,
  {type, payload}: CompanyActionTypes
): CompaniesState {

  switch (type) {
    case CompanyActions.COMPANIES_FETCHING: {
      return {
        ...(state || {}),
        contentState: LoadingState.Loading
      };
    }

    case CompanyActions.COMPANIES_FETCHED: {
      return {
        ...(state || {}),
        ...payload as CompaniesState,
        contentState: LoadingState.Loaded
      };
    }

    case CompanyActions.COMPANIES_FETCH_FAILED: {
      let error: string = payload.error || "Unknown error.";

      return {
        ...(state || {}),
        contentState: LoadingState.CouldNotBeLoaded,
        error
      };
    }

    default:
      if ((type as string).startsWith("COMPANY_CRUD_")) {
        let crud = companyCrudReducer(state.crud, {type: (type as any), payload: (payload as any)});
        const company = crud.target;
        let items = state.items;

        if ((type as string).endsWith("_CRUD_SAVED")) {
          const currentCompany = company ? state.items.find(c => c.id === company.id) : null;
          let index = currentCompany ? state.items.findIndex(c => c.id === currentCompany.id) : -1;

          if (index !== -1 && currentCompany) {
            items = [
              ...items.slice(0, index),
              ...(payload.crud?.handlerName !== "remove" ? [{
                ...currentCompany,
                ...company,
              }] : []),
              ...items.slice(index+1)
            ];
          }

          if (payload.crud?.handlerName === "remove") {
            crud.target = undefined;
          }
        }

        return {
          ...(state || {}),
          items,
          crud,
        }
      }

      return {...state || {}};
  }
}
