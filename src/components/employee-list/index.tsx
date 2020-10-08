import React from 'react';
import { LoadingState } from '../../store/common-types';
import { Pagination } from '../pagination';
import { Block } from '../block';
import { Employee, EmployeesState } from '../../store/employee/types';
import { CompaniesState } from '../../store/company/types';
import { Modal } from '../modal';
import { EmployeeForm } from '../employee-form';
import { ButtonClose } from '../button-close';
import { ButtonDelete } from '../button-delete';
import { ButtonEdit } from '../button-edit';
import { fetchEmployeesAction } from '../../store/employee/actions';
import { saveAction, setCrudState } from '../../store/crud/actions';
import { AppState } from '../../store';
import { CrudState } from '../../store/crud/types';
import { HandlerType } from '../../api';
import { connect, ConnectedProps } from 'react-redux';
import { useContentStateChangeHandler } from '../../utils/use-content-state-change-handler';

import './employee-list.css';
import { ButtonAdd } from '../button-add';

const mapStateToProps = (state: AppState): {
  employees: EmployeesState,
  companies: CompaniesState,
} => ({
  employees: state.content.employees,
  companies: state.content.companies,
});

const mapDispatchToProps = {
  fetchEmployees: (companyId: number, page: number, itemsPerPage: number) =>
    fetchEmployeesAction(companyId, page, itemsPerPage),
  save: (state: CrudState<Employee>) => saveAction(state),
  saveAndClear: (state: CrudState<Employee>) => saveAction(state, true),
  setCrudTarget: (operation: HandlerType, target?: Employee) =>
    setCrudState<Employee>(operation, "employee", target)
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const EmployeeListComponent = ({
  companies,
  employees,
  fetchEmployees,
  save,
  saveAndClear,
  setCrudTarget
}: Props) => {

  const company = companies.crud?.target;
  const employee = employees.crud?.target;
  const employeeCrudState = employees.crud;

  const itemsPerPage = employees.itemsPerPage;

  function handlerProvider(field: keyof Employee) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!employee) return;
      if (field === "companyId" || field === "id") return;

      if (field === "salary") {
        employee[field] = parseFloat(e.target.value);
      } else {
        employee[field] = e.target.value;
      }
      setCrudTarget("update", { ...employee });
    }
  }

  useContentStateChangeHandler(employeeCrudState.contentState, (p, n) => {
    if (p === LoadingState.Loading && n === LoadingState.Loaded) {
      fetchEmployees(company?.id ?? 0, employees.page, itemsPerPage);
    }
  });

  return (
    <>
      <Block title={(
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {company?.name} / Employees

          <ButtonAdd
            onClick={() => setCrudTarget("create", {
              id: 0,
              address: "",
              companyId: company?.id ?? 0,
              email: "",
              name: "",
              salary: 0,
              surname: ""
            }
          )}
          title="Add new employee"
        />
        </div>
      )} className={["employeeList"]}>
        <table>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th>Name</th>
              <th>e-Mail</th>
              <th>Address</th>
              <th>Salary</th>
              <th style={{ width: '5.1em' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              employees.contentState === LoadingState.Loading
                ? <tr><td colSpan={6}>Loading...</td></tr>
                : employees.contentState === LoadingState.CouldNotBeLoaded
                  ? <tr><td colSpan={6}>Could not be loaded</td></tr>
                  : employees.items.length === 0
                    ? <tr><td colSpan={6}>No employee found for {company?.name}.</td></tr>
                    : employees.items.map(employee => (
                      <tr key={`employee_${employee.id}`}>
                        <td title={`${employee.id}`} style={{ textAlign: 'right' }}>{employee.id}</td>
                        <td title={`${employee.surname}, ${employee.name}`}>{employee.surname}, {employee.name}</td>
                        <td title={employee.email}>{employee.email}</td>
                        <td title={employee.address}>{employee.address}</td>
                        <td title={`${employee.salary}`} style={{ textAlign: 'right' }}>{employee.salary}</td>
                        <td>
                          <div style={{ display: "flex", justifyContent: "space-around" }}>
                            <ButtonEdit
                              title={`Edit ${employee.name}`}
                              onClick={() => setCrudTarget("update", { ...employee })}
                            />
                            <ButtonDelete
                              title={`Delete ${employee.name}`}
                              onClick={() => {
                                setCrudTarget("remove", { ...employee });
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
            }
          </tbody>
        </table>
        <span className="hr-spacer"></span>
        <Pagination
          total={employees.total || 0}
          itemsPerPage={itemsPerPage || 10}
          page={employees.page || 0}
          onPageChange={p => fetchEmployees(company?.id ?? 0, p, itemsPerPage)}
          showPageNumbers={true}
          showPageIndicator={true}
        />
      </Block>
      {
        employee && ["create", "update", "remove"].some(c => employeeCrudState.handlerName === c) &&
        <Modal
          title={(
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {employee?.surname}, {employee?.name}
              <ButtonClose onClick={() => setCrudTarget("all", employee)} />
            </div>
          )}
          buttons={<div style={{ textAlign: "right" }}>
            <span className="hr-spacer" />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                key="close"
                id="close"
                onClick={() => setCrudTarget("all", employee)}
              >Close</button>
              <div>
                {
                  employeeCrudState.handlerName === "remove"
                    ? <>
                      <button
                        key="saveEmpployee"
                        id="saveEmployee"
                        onClick={() => {
                          saveAndClear(employeeCrudState);
                        }}
                      >Delete Employee</button>
                    </>
                    : <>
                      <button
                        key="saveEmpployee"
                        id="saveEmployee"
                        onClick={() => {
                          save(employeeCrudState);
                        }}
                      >Save</button>
                      <span className="vr-spacer" />
                      <button
                        key="saveEmpployeeAndClose"
                        id="saveEmpployeeAndClose"
                        onClick={() => {
                          saveAndClear(employeeCrudState);
                        }}
                      >Save &amp; Close</button>
                    </>
                }

              </div>
            </div>
          </div>}
        >
          <EmployeeForm employee={employee} changeHandlerProvider={handlerProvider} />
        </Modal>
      }
    </>
  );

};

export const EmployeeList = connector(EmployeeListComponent);
