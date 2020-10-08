import React from 'react';
import { HandlerType } from '../../api';
import { Company } from '../../store/company/types';
import { EmployeesState } from '../../store/employee/types';
import { Block } from '../block';
import { ButtonDelete } from '../button-delete';
import { ButtonEdit } from '../button-edit';
import './company-details.css';

interface CompanyDetailsState {
  setCrudTarget: (targetName: HandlerType, company: Company) => void,
  company: Company,
  employees: EmployeesState,
}

export const CompanyDetails = ({ company, employees, setCrudTarget }: CompanyDetailsState) => {

  return (
    <Block title={(
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {company?.name} / Employees

        <div>
          <ButtonEdit
            onClick={() => setCrudTarget("update", company)}
            title={`Edit ${company.name}`}
          />
          <span className="vr-spacer" />
          <ButtonDelete
            onClick={() => setCrudTarget("remove", company)}
            title={`Remove ${company.name}`}
          />
        </div>
      </div>
    )}>
      <div>
        Average Salary: {employees.averageSalary}
      </div>
      <div>
        Total Employees: {employees.total}
      </div>
    </Block>
  )
}
