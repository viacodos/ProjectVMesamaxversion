import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, className = '', ...props }) => {
  return (
    <label className="flex items-center space-x-3 cursor-pointer group">
      <input
        type="checkbox"
        className={`w-5 h-5 rounded border-2 border-glass bg-glass checked:bg-primary checked:border-primary focus:ring-2 focus:ring-primary-light transition-all cursor-pointer light:border-gray-300 light:bg-white ${className}`}
        {...props}
      />
      {label && (
        <span className="text-sm text-primary-lighter group-hover:text-white transition-colors light:text-gray-700 light:group-hover:text-primary">
          {label}
        </span>
      )}
    </label>
  );
};
