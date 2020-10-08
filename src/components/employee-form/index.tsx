import React from 'react';
import { Employee } from '../../store/employee/types';
import './employee-form.css';

interface EmployeeFormState {
  employee: Employee,
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void,
  changeHandlerProvider: (field: keyof Employee) => (event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => void,
}

export const EmployeeForm = ({ employee, changeHandlerProvider, onSubmit }: EmployeeFormState) => {

  const employeeNameId = "employeeName";
  const employeeSurnameId = "employeeSurname";
  const employeeEmailId = "employeeEmail";
  const employeeAddressId = "employeeAddress";
  const employeeSalaryId = "employeeSalary";

  return (
    <form className="employee-form" method={employee.id === 0 ? "POST" : "PUT"} onSubmit={onSubmit}>
      <div>
        <label htmlFor={employeeNameId}>Name</label>
        <input id={employeeNameId} type="text" value={employee.name} onChange={changeHandlerProvider("name")} />
      </div>
      <div>
        <label htmlFor={employeeSurnameId}>Surname</label>
        <input id={employeeSurnameId} type="text" value={employee.surname} onChange={changeHandlerProvider("surname")} />
      </div>
      <div>
        <label htmlFor={employeeEmailId}>e-Mail</label>
        <input id={employeeEmailId} type="email" value={employee.email} onChange={changeHandlerProvider("email")} />
      </div>
      <div>
        <label htmlFor={employeeAddressId}>Address</label>
        <textarea id={employeeAddressId} value={employee.address} onChange={changeHandlerProvider("address")} />
      </div>
      <div>
        <label htmlFor={employeeSalaryId}>Salary</label>
        <input id={employeeSalaryId} type="number" value={employee.salary} onChange={changeHandlerProvider("salary")} />
      </div>
      <button type='submit' style={{width: 0, height: 0, position: "absolute", left: -10000, top: -10000}} />
    </form>
  )
}
