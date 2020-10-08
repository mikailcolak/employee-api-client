import React from 'react';
import { Company } from '../../store/company/types';
import './company-form.css';

interface CompanyFormState {
  company: Company,
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void,
  changeHandlerProvider: (field: keyof Company) => (event: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => void,
}

export const CompanyForm = ({ company, changeHandlerProvider, onSubmit }: CompanyFormState) => {

  const companyNameId = "companyName";

  return (
    <form className="company-form" method={company.id === 0 ? "POST" : "PUT"} onSubmit={onSubmit}>
      <div>
        <label htmlFor={companyNameId}>Name</label>
        <input id={companyNameId} type="text" value={company.name} onChange={changeHandlerProvider("name")} />
      </div>
      <button type='submit' style={{width: 0, height: 0, position: "absolute", left: -10000, top: -10000}} />
    </form>
  )
}
