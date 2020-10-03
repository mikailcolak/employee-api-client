import React, { useEffect, useState } from "react";
import './App.css';

import { connect, ConnectedProps } from "react-redux";
import { createCompanyAction, fetchCompaniesAction } from "./store/company/actions";
import { AppState } from "./store";
import { Company, CompaniesState } from "./store/company/types";
import { LoadingState } from "./store/common-types";
import { fetchEmployeesAction } from "./store/employee/actions";
import MainLayout from "./layouts/main";
import { CompanyList } from "./components/company-list";
import { EmployeeList } from "./components/employee-list";
import { EmployeesState } from "./store/employee/types";

const mapStateToProps = (state: AppState): {
  companies: CompaniesState,
  employees: EmployeesState
} => ({
  companies: state.content.companies,
  employees: state.content.employees,
});

const mapDispatchToProps = {
  fetchCompanies: (page: number, itemsPerPage: number) => fetchCompaniesAction(page, itemsPerPage),
  fetchEmployees: (companyId: number, page: number, itemsPerPage: number) => fetchEmployeesAction(companyId, page, itemsPerPage),
  createCompany: (company: Company) => createCompanyAction(company),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

function App({ createCompany, fetchCompanies, fetchEmployees, companies, employees }: Props) {

  var [selectedCompany, setSelectedCompany] = useState<Company | undefined | null>(undefined);

  const _setSelectedCompany = (company: Company | undefined | null) => {
    if (company && company.id != employees.companyId) {
      fetchEmployees(company.id, employees.page, employees.itemsPerPage);
    }
    setSelectedCompany(company);
  }

  useEffect(() => {
    // fetchCompanies(companies.page || 0, companies.itemsPerPage || 0);
  });

  return (
    <MainLayout>
      <div className="two-column">
        <div className="left-column">
          <CompanyList
            companies={companies}
            companyChanged={_setSelectedCompany}
            selectedCompany={selectedCompany}
            loadCompanies={fetchCompanies}
            createCompany={createCompany}
          />
        </div>
        <div className="right-column">
          {
            selectedCompany && employees.contentState == LoadingState.Loaded &&
            <EmployeeList
              company={selectedCompany}
              employees={employees}
              loadEmployees={(page: number, itemsPerPage: number) => fetchEmployees(selectedCompany?.id || 0, page, itemsPerPage)}
            />
          }
        </div>
      </div>
    </MainLayout>
  );
}

export default connector(App);
