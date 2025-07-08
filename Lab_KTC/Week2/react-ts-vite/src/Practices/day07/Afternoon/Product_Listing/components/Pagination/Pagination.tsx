import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.pageButton}
      >
        Trước
      </button>
      <ul className={styles.pageList}>
        {pageNumbers.map((number) => (
          <li key={number} className={styles.pageItem}>
            <button
              onClick={() => onPageChange(number)}
              className={`${styles.pageButton} ${currentPage === number ? styles.activePage : ''}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
      >
        Sau
      </button>
    </nav>
  );
};

export default Pagination;