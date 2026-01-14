import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-200 backdrop-blur-glass touch-manipulation min-h-[44px] active:scale-95';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-light shadow-glass dark:bg-primary dark:text-white light:bg-primary light:text-white',
    secondary: 'glass text-primary-lighter hover:bg-primary-dark dark:text-primary-lighter light:text-primary',
    ghost: 'text-primary-lighter hover:glass dark:text-primary-lighter light:text-primary'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
