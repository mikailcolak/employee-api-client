import React from 'react';
import './pagination.css';

interface PaginationProps {
  total: number,
  itemsPerPage: number,
  page: number,
  onPageChange: (page: number) => void,
  showPageNumbers: boolean,
  showPageIndicator: boolean
}

export const Pagination = ({
  total,
  itemsPerPage,
  page,
  onPageChange,
  showPageNumbers,
  showPageIndicator
}: PaginationProps) => {
  if (itemsPerPage <= 0) return <></>;
  if (total <= 0) return <></>;


  const totalPage = Math.ceil(total / itemsPerPage);

  return (
    <div className="pagination">
      {page > 0 && <a onClick={() => onPageChange(page - 1)}>‹</a>}
      {showPageNumbers && Array.from(Array(totalPage)).map((_, i) => <a href="" onClick={e => {onPageChange(i); e.preventDefault();}} className={page == i ? "active" : undefined} key={`p_${i}`}>{i + 1}</a>)}
      {(page + 1) < totalPage && <a onClick={() => onPageChange(page + 1)}>›</a>}
      {showPageIndicator && <span>{page+1}/{totalPage}</span>}
    </div>
  )
};
