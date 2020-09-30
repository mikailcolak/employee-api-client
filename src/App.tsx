import React from "react";
import logo from './logo.svg';
import './App.css';

import { connect, ConnectedProps } from "react-redux";
import { fetchCompanies } from "./store/company/actions";
import { AppState } from "./store";
import { Company } from "./store/company/types";
import { LoadingState } from "./store/common-types";
import { Employee } from "./store/employee/types";
import { fetchEmployees } from "./store/employee/actions";

const mapStateToProps = (state: AppState) => ({
    companies: state.content.companies
});

const mapDispatchToProps = {
  fetchCompanies: () => fetchCompanies(),
  fetchEmployees: (companyId: Number) => fetchEmployees(companyId)
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

function App({fetchCompanies, fetchEmployees, companies}:Props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload. HOT.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {
          companies.contentState === LoadingState.NotLoaded
          ? <button onClick={fetchCompanies}>Load Companies</button>
          : companies.contentState === LoadingState.Loading
            ? <div>Please wait while companies loading.</div>
            : companies.contentState === LoadingState.CouldNotBeLoaded
              ? <div>An unexpected error occured please check this out: {companies.error}</div>
              : companies.items.map((company: Company, index: Number) => (
                <div key={`company_${index}`}>
                  {company.id} - {company.name}
                  {
                    company.employees.contentState === LoadingState.NotLoaded
                    ? <button onClick={() => fetchEmployees(company.id)}>Load Employees</button>
                    : company.employees.contentState === LoadingState.Loading
                      ? <div>Please wait while employees loading.</div>
                      : company.employees.contentState === LoadingState.CouldNotBeLoaded
                        ? <div>An unexpected error occured please check this out: {company.employees.error}</div>
                        : company.employees.items.map((employee: Employee, index: Number) => (
                          <div key={`employee_${index}`}>
                            {employee.id} - {employee.name} - {employee.surname}
                          </div>
                        ))
                  }

                </div>
              ))
        }
      </header>
    </div>
  );
}

export default connector(App);
