import config from '../config';
import axios from 'axios';
import { Company } from '../store/company/types';


export const all = (page: number = 0, itemsPerPage: number = 10) =>
  axios.get(`${config.apiEndpoint}companies/?size=${itemsPerPage}&page=${page}`);

export const count = () => axios.get(`${config.apiEndpoint}companies/count`);

export const create = (company: Company) => axios.post(`${config.apiEndpoint}companies`, company);

export const update = (company: Company) => axios.put(`${config.apiEndpoint}companies/${company.id}`, company);

export const remove = (company: Company) => axios.delete(`${config.apiEndpoint}companies/${company.id}`);
