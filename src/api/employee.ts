import config from '../config';
import axios from 'axios';
import { Employee } from '../store/employee/types';


export const allByCompanyId = (companyId: number, page: number = 0, itemsPerPage: number = 10) =>
  axios.get(`${config.apiEndpoint}employees/by-company-id/${companyId}?size=${itemsPerPage}&page=${page}`);

export const count = () => axios.get(`${config.apiEndpoint}employees/count`);

export const create = (employee: Employee) => axios.post(`${config.apiEndpoint}employees`, employee);

export const update = (employee: Employee) => axios.put(`${config.apiEndpoint}employees/${employee.id}`, employee);

export const remove = (employee: Employee) => axios.delete(`${config.apiEndpoint}employees/${employee.id}`);

export const averageSalaryByCompanyId = (id: number) =>
  axios.get(`${config.apiEndpoint}employees/avg-salary-by-company-id/${id}`);

export const employeeCountByCompanyId = (id: number) =>
  axios.get(`${config.apiEndpoint}employees/count-by-company-id/${id}`);
