import React from 'react';
import { Search } from 'lucide-react';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch, className = '', ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-lighter light:text-gray-400" size={20} />
      <input
        type="search"
        className={`w-full pl-12 pr-4 py-3 rounded-lg glass border-2 border-glass focus:border-primary-light focus:outline-none transition-colors light:bg-white light:border-gray-300 ${className}`}
        onChange={handleChange}
        {...props}
      />
    </div>
  );
};
