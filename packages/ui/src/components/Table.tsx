import React from 'react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: any[];
  className?: string;
}

export const Table: React.FC<TableProps> = ({ columns, data, className = '' }) => {
  return (
    <div className={`glass rounded-lg overflow-hidden light:bg-white light:shadow-lg ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary-dark light:bg-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-primary-lighter light:text-gray-700"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-glass light:divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-glass-light transition-colors light:hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 text-sm light:text-gray-900">
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
