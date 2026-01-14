import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisible?: number;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showFirstLast = true,
  maxVisible = 5
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisible / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    if (currentPage <= halfVisible) {
      endPage = Math.min(maxVisible, totalPages);
    }
    if (currentPage + halfVisible >= totalPages) {
      startPage = Math.max(1, totalPages - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg glass hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all light:bg-white light:hover:bg-gray-100 light:border light:border-gray-300"
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>

      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {typeof page === 'number' ? (
            <button
              onClick={() => onPageChange(page)}
              className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition-all ${
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'glass hover:bg-primary-dark light:bg-white light:hover:bg-gray-100 light:border light:border-gray-300 light:text-gray-700'
              }`}
            >
              {page}
            </button>
          ) : (
            <span className="px-2 text-primary-lighter light:text-gray-400">...</span>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg glass hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all light:bg-white light:hover:bg-gray-100 light:border light:border-gray-300"
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
