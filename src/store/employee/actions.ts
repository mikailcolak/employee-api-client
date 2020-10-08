import {
  EmployeesState,
  EmployeeActions,
  EmployeeActionTypes,
  Employee
} from "./types";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import { LoadingState } from "../common-types";
import {
  allByCompanyId,
  employeeCountByCompanyId,
  averageSalaryByCompanyId,
} from "../../api/employee";
import { initialStateProvider } from "../crud/reducers";

function employeesFetched(payload: EmployeesState): EmployeeActionTypes {
  return {
    type: EmployeeActions.EMPLOYEES_FETCHED,
    payload,
  };
}

function employeesFetching(companyId: number): EmployeeActionTypes {
  return {
    type: EmployeeActions.EMPLOYEES_FETCHING,
    payload: {
      items: [],
      companyId,
      contentState: LoadingState.Loading,
      itemsPerPage: 10,
      page: 0,
      total: 0,
      averageSalary: 0,
      crud: initialStateProvider<Employee>(),
    },
  };
}

function employeesCouldNotBeFecthed(companyId: number, error: string): EmployeeActionTypes {
  return {
    type: EmployeeActions.EMPLOYEES_FETCH_FAILED,
    payload: {
      items: [],
      companyId,
      contentState: LoadingState.CouldNotBeLoaded,
      error,
      itemsPerPage: 10,
      page: 0,
      total: 0,
      averageSalary: 0,
      crud: initialStateProvider<Employee>(),
    },
  };
}

export const fetchEmployeesAction = (companyId: number, page: number = 0, itemsPerPage: number = 10): ThunkAction<
  void,
  EmployeeActionTypes,
  unknown,
  Action<string>
> => async (dispatch) => {
  dispatch(employeesFetching(companyId));
  try {
    let { data: { value: total } } = await employeeCountByCompanyId(companyId);
    let { data: { value: averageSalary }} = await averageSalaryByCompanyId(companyId);
    let response = await allByCompanyId(companyId, page, itemsPerPage);

    if (response.status !== 200) {
      dispatch(employeesCouldNotBeFecthed(companyId, response.statusText));
      return;
    }
    let payload = {
      companyId,
      averageSalary,
      contentState: LoadingState.Loaded,
      items: response.data.content.map((e: Employee): Employee => ({
        id: e.id,
        name: e.name,
        surname: e.surname,
        email: e.email,
        address: e.address,
        salary: e.salary,
        companyId: e.companyId
      })),
      page: page,
      itemsPerPage: itemsPerPage,
      total
    }

    dispatch(employeesFetched(payload as EmployeesState));
  } catch (err) {
    dispatch(employeesCouldNotBeFecthed(companyId, err));
  }
};
