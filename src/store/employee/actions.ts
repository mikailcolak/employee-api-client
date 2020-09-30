import {
  EmployeeState,
  EmployeeActions,
  EmployeeActionTypes,
  Employee
} from "./types";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { LoadingState } from "../common-types";
import axios from "axios";
import config from "../../config";

function employeesFetched(payload: EmployeeState): EmployeeActionTypes {
  return {
    type: EmployeeActions.EMPLOYEES_FETCHED,
    payload,
  };
}

function employeesFetching(companyId: Number): EmployeeActionTypes {
  return {
    type: EmployeeActions.EMPLOYEES_FETCHING,
    payload: {
      items: [],
      companyId,
      contentState: LoadingState.Loading
    },
  };
}

function employeesCouldNotBeFecthed(companyId: Number, error: String): EmployeeActionTypes {
  return {
    type: EmployeeActions.EMPLOYEES_FETCH_FAILED,
    payload: {
      items: [],
      companyId,
      contentState: LoadingState.CouldNotBeLoaded,
      error
    },
  };
}

export const fetchEmployees = (companyId: Number, page: Number = 0, itemPerPage: Number = 10): ThunkAction<
  void,
  EmployeeActionTypes,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch(employeesFetching(companyId));
  try {
    let response = await getEmployeesByCompanyId(companyId, page, itemPerPage);

    if (response.status !== 200) {
      dispatch(employeesCouldNotBeFecthed(companyId, response.statusText));
      return;
    }
    let payload: EmployeeState = {
      companyId,
      contentState: LoadingState.Loaded,
      items: response.data.content.map((e: Employee) : Employee => ({
        id: e.id,
        name: e.name,
        surname: e.surname,
        email: e.email,
        address: e.address,
        salary: e.salary,
        companyId: e.companyId
      })),
      page: page,
      size: itemPerPage,
      total: response.data.length // TODO: [FIXME] get the total amount of items from API
    }

    dispatch(employeesFetched(payload));
  } catch (err) {
    dispatch(employeesCouldNotBeFecthed(companyId, err));
  }
};


function getEmployeesByCompanyId(companyId: Number, page: Number = 0, itemPerPage: Number = 10) {
  return axios.get(`${config.apiEndpoint}employees/by-company-id/${companyId}?size=${itemPerPage}&page=${page}`);
}

// eslint-disable-next-line
function mockApiCall(companyId: Number) {
  return new Promise<EmployeeState>((r) => {
    setTimeout(
      () =>
        r({
          contentState: LoadingState.Loaded,
          page: 0,
          size: 10,
          total: 1,
          companyId: companyId,
          items: [{
            id: 1,
            name: "TEST1",
            surname: "TEST1_SURNAME",
            address: "TEST1_ADDRESS",
            email: "test1@employeeapi.com",
            salary: 4523.42,
            companyId: 1
          }]
        }),
      1000
    );
  });
}
