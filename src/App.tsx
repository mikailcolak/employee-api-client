import React from "react";
import './App.css';

import { connect, ConnectedProps } from "react-redux";
import { fetchCompaniesAction } from "./store/company/actions";
import { AppState } from "./store";
import { Company, CompaniesState } from "./store/company/types";
import { fetchEmployeesAction } from "./store/employee/actions";
import MainLayout from "./layouts/main";
import { CompanyList } from "./components/company-list";
import { EmployeeList } from "./components/employee-list";
import { CompanyDetails } from "./components/company-details";
import { EmployeesState } from "./store/employee/types";
import { setCrudState } from "./store/crud/actions";
import { HandlerType } from "./api";

const mapStateToProps = (state: AppState): {
  companies: CompaniesState,
  employees: EmployeesState,
} => ({
  companies: state.content.companies,
  employees: state.content.employees,
});

const mapDispatchToProps = {
  fetchCompanies: (page: number, itemsPerPage: number) => fetchCompaniesAction(page, itemsPerPage),
  fetchEmployees: (companyId: number, page: number, itemsPerPage: number) => fetchEmployeesAction(companyId, page, itemsPerPage),
  setCrudTarget: (handler: HandlerType, target: Company) => setCrudState<Company>(handler, "company", target),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

class App extends React.Component<Props> {

  componentDidMount() {
    this.props.fetchCompanies(this.props.companies.page || 0, this.props.companies.itemsPerPage || 0);
  }

  render() {
    const {
      employees,
      companies,
      setCrudTarget,
    } = this.props;

    return (
      <MainLayout>
        <div className="two-column">
          <div className="left-column">
            <CompanyList />
          </div>
          <div className="right-column">
            {
              companies.crud?.target &&
              <>
                <CompanyDetails
                  setCrudTarget={setCrudTarget}
                  company={companies.crud?.target}
                  employees={employees}
                />
                <span className="hr-spacer" />
                <EmployeeList />
              </>
            }
          </div>
        </div>
      </MainLayout>
    );
  }
}


export default connector(App);
