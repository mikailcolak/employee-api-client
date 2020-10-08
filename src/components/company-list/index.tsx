import React from 'react';
import { LoadingState } from '../../store/common-types';
import { Company, CompaniesState } from '../../store/company/types';
import { Pagination } from '../pagination';
import { Block } from '../block';
import './company-list.css';
import { connect, ConnectedProps } from 'react-redux';
import { EmployeesState } from '../../store/employee/types';
import { CrudState } from '../../store/crud/types';
import { AppState } from '../../store';
import { fetchCompaniesAction } from '../../store/company/actions';
import { clearCrudState, saveAction, setCrudState } from '../../store/crud/actions';
import { HandlerType } from '../../api';
import { fetchEmployeesAction } from '../../store/employee/actions';
import { ButtonClose } from '../button-close';
import { Modal } from '../modal';
import { CompanyForm } from '../company-form';
import { ButtonAdd } from '../button-add';
import { useContentStateChangeHandler } from '../../utils/use-content-state-change-handler';

const mapStateToProps = (state: AppState): {
  employees: EmployeesState,
  companies: CompaniesState,
} => ({
  employees: state.content.employees,
  companies: state.content.companies,
});

const mapDispatchToProps = {
  fetchCompanies: (page: number, itemsPerPage: number) =>
    fetchCompaniesAction(page, itemsPerPage),
  fetchEmployees: (company: Company, page: number, itemsPerPage: number) =>
    fetchEmployeesAction(company.id, page, itemsPerPage),
  save:
    (state: CrudState<Company>) => saveAction(state),
  saveAndClear:
    (state: CrudState<Company>) => saveAction(state, true),
  setCrudTarget: (operation: HandlerType, target?: Company) =>
    setCrudState<Company>(operation, "company", target),
  clearCrudTarget: () => clearCrudState("company")
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export const CompanyListComponent = ({
  companies,
  employees,
  fetchCompanies,
  fetchEmployees,
  setCrudTarget,
  save,
  saveAndClear,
}: Props) => {

  const company = companies.crud?.target;
  const originalCompany = companies.items.find(c => c.id === company?.id);
  const companyCrudState = companies.crud;

  function handlerProvider(field: keyof Company) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!company) return;
      if (field === "id") return;
      if (field === "averageSalary") return;
      if (field === "employeeCount") return;

      company[field] = e.target.value;
      setCrudTarget("update", { ...company });
    }
  }

  useContentStateChangeHandler(companyCrudState?.contentState ?? LoadingState.NotLoaded, (p, n) => {
    if (p === LoadingState.Loading && n === LoadingState.Loaded) {
      fetchCompanies(companies.page, companies.itemsPerPage);
    }
  });

  if (companies.contentState === LoadingState.NotLoaded) {
    return <Block title={<>Companies</>}><button onClick={() => fetchCompanies(companies.page, companies.itemsPerPage)}>Load Companies</button></Block>;
  }

  if (companies.contentState === LoadingState.Loading) {
    return <Block title={<>Companies ...</>}>Loading...</Block>
  }

  if (companies.contentState === LoadingState.CouldNotBeLoaded) {
    return (
      <Block title={<>Companies / Error</>}>
        Error: {companies.error ?? "unknown"}
        <button onClick={() => fetchCompanies(companies.page, companies.itemsPerPage)}>Retry</button>
      </Block>
    );
  }

  return (
    <>
      <Block title={(
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            Companies
            <ButtonAdd onClick={() => setCrudTarget("create", {id: 0, name: ""})} title="Add new company" />
          </div>
        )}
        className={"company-list"}
      >
        <ul>
          {
            companies.items.map((c, i) => (
              <li key={`c_${i}`} className={(company?.id && company.id === c.id ? "selected" : undefined)}>
                <a href={`${c.id}`} onClick={e => {
                  setCrudTarget("all", { ...c });
                  fetchEmployees(c, employees.page, employees.itemsPerPage);
                  e.preventDefault();
                }} tabIndex={i}>{c.name}</a>
              </li>
            ))
          }
        </ul>
        <span className="hr-spacer"></span>
        <Pagination
          total={companies.total}
          itemsPerPage={companies.itemsPerPage}
          page={companies.page}
          onPageChange={p => fetchCompanies(p, companies.itemsPerPage)}
          showPageNumbers={false}
          showPageIndicator={true}
        />
      </Block>
      {
        company && companyCrudState && ["create", "update", "remove"].some(c => companyCrudState.handlerName === c) &&
        <Modal
          title={(
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {company?.name}
              <ButtonClose onClick={() => setCrudTarget("all", originalCompany)} />
            </div>
          )}
          buttons={<div style={{ textAlign: "right" }}>
            <span className="hr-spacer" />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                key="close"
                id="close"
                onClick={() => setCrudTarget("all", originalCompany)}
              >Close</button>
              <div>
                {
                  companyCrudState.handlerName === "remove"
                    ? <>
                      <button
                        key="saveCompany"
                        id="saveCompany"
                        onClick={() => {
                          saveAndClear(companyCrudState);
                        }}
                      >Delete Company</button>
                    </>
                    : <>
                      <button
                        key="saveCompany"
                        id="saveCompany"
                        onClick={() => {
                          save(companyCrudState);
                        }}
                      >Save</button>
                      <span className="vr-spacer" />
                      <button
                        key="saveCompanyAndClose"
                        id="saveCompanyAndClose"
                        onClick={() => {
                          saveAndClear(companyCrudState);
                        }}
                      >Save &amp; Close</button>
                    </>
                }

              </div>
            </div>
          </div>}
        >
          <CompanyForm company={company} changeHandlerProvider={handlerProvider} />
        </Modal>
      }
    </>
  );

};

export const CompanyList = connector(CompanyListComponent);
