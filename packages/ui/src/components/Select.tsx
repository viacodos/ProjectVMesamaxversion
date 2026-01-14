import React from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ 
  label, 
  options, 
  error, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-primary-lighter dark:text-primary-lighter light:text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        className={`w-full px-4 py-3 rounded-lg glass border-2 ${
          error ? 'border-red-500' : 'border-glass'
        } focus:border-primary-light focus:outline-none transition-colors cursor-pointer light:bg-white light:border-gray-300 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-primary-dark light:bg-white light:text-gray-900">
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};
