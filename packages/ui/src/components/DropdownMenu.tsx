import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  align?: 'left' | 'right';
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ 
  trigger, 
  items, 
  align = 'right' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:glass transition-all light:hover:bg-gray-100"
      >
        {trigger}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-full mt-2 w-56 glass-dark rounded-lg shadow-glass-lg overflow-hidden z-50 animate-fade-in light:bg-white light:shadow-2xl light:border light:border-gray-200 ${
          align === 'right' ? 'right-0' : 'left-0'
        }`}>
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                item.danger
                  ? 'text-red-400 hover:bg-red-500/10 light:text-red-600 light:hover:bg-red-50'
                  : 'text-primary-lighter hover:bg-glass-light light:text-gray-700 light:hover:bg-gray-100'
              }`}
            >
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
