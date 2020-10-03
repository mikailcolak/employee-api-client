import React from 'react';
import { LoadingState } from '../../store/common-types';
import { Pagination } from '../pagination';
import { Block } from '../block';
import { EmployeesState } from '../../store/employee/types';
import { Company } from '../../store/company/types';

import './employee-list.css';

interface EmployeeListProps {
  employees: EmployeesState,
  company: Company,
  loadEmployees: (page: number, itemsPerPage: number) => void,
}

export const EmployeeList = ({
  employees,
  company,
  loadEmployees
}: EmployeeListProps) => {

  if (employees.contentState === LoadingState.Loading) {
    return <Block title={`${company.name} / Employees ...`}>Loading...</Block>
  }

  if (employees.contentState === LoadingState.CouldNotBeLoaded) {
    return (
      <Block title={`${company.name} / Employees !`}>
        Error: {employees.error ?? "unknown"}
        <button onClick={() => loadEmployees(employees.page || 0, employees.itemsPerPage || 0)}>Retry</button>
      </Block>
    );
  }

  return (
    <Block title={`${company.name} / Employees`} className={["employeeList"]}>
      <table>
        <thead>
          <tr>
            <th style={{width: '5%'}}>#</th>
            <th>Name</th>
            <th>e-Mail</th>
            <th>Address</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {
          employees.items.length === 0
            ? (
              <tr>
                <td colSpan={6}>No employee found for {company.name}.</td>
              </tr>
            )
            : employees.items.map(employee => (
              <tr key={`employee_${employee.id}`}>
                <td style={{textAlign: 'right'}}>{employee.id}</td>
                <td>{employee.surname}, {employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.address}</td>
                <td style={{textAlign: 'right'}}>{employee.salary}</td>
                <td><button>Edit</button><button>Delete</button></td>
              </tr>
            ))
        }
        </tbody>
      </table>
      <span className="hr-spacer"></span>
      <Pagination
        total={employees.total || 0}
        itemsPerPage={employees.itemsPerPage || 10}
        page={employees.page || 0}
        onPageChange={p => loadEmployees(p, employees.itemsPerPage || 0)}
        showPageNumbers={true}
        showPageIndicator={true}
      />
    </Block>
  );

};
