import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className = '' }) => {
  const variants = {
    primary: 'bg-primary text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-primary-darkest light:text-gray-900',
    danger: 'bg-red-500 text-white',
    info: 'bg-primary-lighter text-primary-darkest light:text-gray-900'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
