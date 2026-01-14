import React from 'react';
import { X } from 'lucide-react';

interface FilterChipProps {
  label: string;
  selected?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
  icon?: React.ReactNode;
  variant?: 'default' | 'primary' | 'success';
}

export const FilterChip: React.FC<FilterChipProps> = ({ 
  label, 
  selected = false, 
  onToggle, 
  onRemove,
  icon,
  variant = 'default'
}) => {
  const variants = {
    default: selected 
      ? 'bg-primary text-white border-primary' 
      : 'glass text-primary-lighter border-glass light:bg-white light:text-gray-700 light:border-gray-300',
    primary: selected 
      ? 'bg-primary text-white border-primary' 
      : 'glass text-primary-lighter border-glass light:bg-white light:text-gray-700 light:border-gray-300',
    success: selected 
      ? 'bg-green-500 text-white border-green-500' 
      : 'glass text-primary-lighter border-glass light:bg-white light:text-gray-700 light:border-gray-300'
  };

  return (
    <button
      onClick={onToggle}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-medium transition-all hover:scale-105 active:scale-95 ${variants[variant]}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{label}</span>
      {selected && onRemove && (
        <X 
          size={16} 
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="cursor-pointer hover:opacity-70"
        />
      )}
    </button>
  );
};
