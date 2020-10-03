import React, { useCallback, useState } from 'react';
import { LoadingState } from '../../store/common-types';
import { Company, CompaniesState } from '../../store/company/types';
import { Pagination } from '../pagination';
import { Block } from '../block';
import './company-list.css';

interface CompanyListProps {
  companies: CompaniesState,
  selectedCompany: Company | null | undefined,
  companyChanged: (company: Company | undefined | null) => void,
  loadCompanies: (page: number, itemsPerPage: number) => void,
  createCompany: (company: Company) => void,
}

export const CompanyList = ({
  companies,
  selectedCompany,
  companyChanged,
  loadCompanies,
  createCompany,
}: CompanyListProps) => {

  const [newCompanyName, setNewCompanyName] = useState("");
  const setCompanyName = useCallback(e => setNewCompanyName(e.target.value), []);

  if (companies.contentState === LoadingState.NotLoaded) {
    return <Block title="Companies"><button onClick={() => loadCompanies(companies.page || 0, companies.itemsPerPage || 0)}>Load Companies</button></Block>;
  }

  if (companies.contentState === LoadingState.Loading) {
    return <Block title="Companies...">Loading...</Block>
  }

  if (companies.contentState == LoadingState.CouldNotBeLoaded) {
    return (
      <Block title="Companies / Error">
        Error: {companies.error ?? "unknown"}
        <button onClick={() => loadCompanies(companies.page || 0, companies.itemsPerPage || 0)}>Retry</button>
      </Block>
    );
  }

  return (
    <Block title="Companies" className={"company-list"}>
      <ul>
        {
          companies.items.map((company, i) => (
            <li key={`c_${i}`} className={(selectedCompany && company.id === selectedCompany.id && "selected" || undefined)}>
              <a onClick={() => companyChanged(company)} tabIndex={i}>{company.name}</a>
            </li>
          ))
        }
      </ul>
      <input type="text" value={newCompanyName} onChange={setCompanyName} />
      {newCompanyName && <button onClick={() => createCompany({id: 0, name: newCompanyName})}>Create</button>}
      <span className="hr-spacer"></span>
      <Pagination
        total={companies.total || 0}
        itemsPerPage={companies.itemsPerPage || 10}
        page={companies.page || 0}
        onPageChange={p => loadCompanies(p, companies.itemsPerPage || 0)}
        showPageNumbers={true}
        showPageIndicator={true}
      />
    </Block>
  );

};
